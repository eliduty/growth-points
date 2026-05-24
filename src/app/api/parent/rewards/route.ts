import { NextRequest, NextResponse } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { createRewardSchema } from "@/lib/validators";
import { formatBeijingTime } from "@/lib/date";

/**
 * GET /api/parent/rewards - 获取奖励记录列表
 */
export async function GET(request: NextRequest) {
  try {
    const { familyId } = await requireParent(request);

    // 获取可选的 userId 参数（查询特定孩子的奖励）
    const userIdParam = request.nextUrl.searchParams.get("userId");

    // 查询奖励记录
    const rewards = await prisma.reward.findMany({
      where: {
        familyId,
        ...(userIdParam ? { userId: userIdParam } : {}),
      },
      select: {
        id: true,
        points: true,
        reason: true,
        createdBy: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // 获取创建者信息（家长名称）
    const creatorIds = Array.from(new Set(rewards.map((r) => r.createdBy)));
    const creators = await prisma.user.findMany({
      where: { id: { in: creatorIds } },
      select: { id: true, username: true },
    });
    const creatorMap = new Map(creators.map((c) => [c.id, c.username]));

    const result = rewards.map((r) => ({
      id: r.id,
      userId: r.user.id,
      username: r.user.username,
      points: r.points,
      reason: r.reason,
      createdBy: r.createdBy,
      creatorName: creatorMap.get(r.createdBy) || "未知",
      createdAt: formatBeijingTime(r.createdAt),
    }));

    return NextResponse.json({
      code: 0,
      data: result,
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}

/**
 * POST /api/parent/rewards - 创建奖励
 */
export async function POST(request: NextRequest) {
  try {
    const { userId: parentId, familyId } = await requireParent(request);
    const body = await request.json();

    // 验证输入
    const validated = createRewardSchema.parse(body);

    // 检查目标用户是否属于当前家庭且是孩子
    const targetUser = await prisma.user.findFirst({
      where: {
        id: validated.userId,
        familyId,
        role: "CHILD",
      },
      select: {
        id: true,
        username: true,
        currentPoints: true,
        totalPoints: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { code: 4003, data: null, message: "用户不存在或不属于当前家庭" },
        { status: 400 }
      );
    }

    // 创建奖励记录并更新积分（事务）
    const reward = await prisma.$transaction(async (tx) => {
      // 创建奖励记录
      const newReward = await tx.reward.create({
        data: {
          userId: validated.userId,
          familyId,
          points: validated.points,
          reason: validated.reason,
          createdBy: parentId,
        },
        select: {
          id: true,
          points: true,
          reason: true,
          createdAt: true,
        },
      });

      // 更新孩子积分
      await tx.user.update({
        where: { id: validated.userId },
        data: {
          currentPoints: targetUser.currentPoints + validated.points,
          totalPoints: targetUser.totalPoints + validated.points,
        },
      });

      return newReward;
    });

    return NextResponse.json({
      code: 0,
      data: {
        id: reward.id,
        userId: validated.userId,
        username: targetUser.username,
        points: reward.points,
        reason: reward.reason,
        createdBy: parentId,
        creatorName: "", // 前端可以自己获取
        createdAt: formatBeijingTime(reward.createdAt),
      },
      message: "奖励成功",
    });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { code: 4001, data: null, message: "参数验证失败" },
        { status: 400 }
      );
    }
    return handleAuthError(error);
  }
}