import { NextResponse, NextRequest } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { getWeekStart, getWeekEnd, formatBeijingTime } from "@/lib/date";

export async function GET(request: NextRequest) {
  try {
    const { familyId } = await requireParent(request);

    // 获取可选的 weekStart 参数
    const weekStartParam = request.nextUrl.searchParams.get("weekStart");
    const weekStartDate = weekStartParam
      ? new Date(weekStartParam)
      : undefined;

    // 计算本周时间范围
    const weekStart = getWeekStart(weekStartDate);
    const weekEnd = getWeekEnd(weekStartDate);

    // 查询家庭内所有孩子
    const children = await prisma.user.findMany({
      where: {
        familyId,
        role: "CHILD",
      },
      select: {
        id: true,
        username: true,
        currentPoints: true,
        totalPoints: true,
        taskCompletions: {
          where: {
            completedAt: {
              gte: weekStart,
              lte: weekEnd,
            },
            // 查询所有记录（包含已撤销）
          },
          select: {
            id: true,
            points: true,
            completedAt: true,
            revokedAt: true,
            task: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            completedAt: "desc",
          },
        },
      },
    });

    // 查询家庭内本周所有奖励记录
    const weeklyRewards = await prisma.reward.findMany({
      where: {
        familyId,
        createdAt: { gte: weekStart, lte: weekEnd },
      },
      select: {
        userId: true,
        points: true,
      },
    });

    // 按孩子 ID 分组奖励积分
    const rewardPointsByChild = new Map<string, number>();
    for (const reward of weeklyRewards) {
      const current = rewardPointsByChild.get(reward.userId) || 0;
      rewardPointsByChild.set(reward.userId, current + reward.points);
    }

    // 计算统计数据（只统计未撤销的记录）
    const stats = children.map((child) => {
      const activeCompletions = child.taskCompletions.filter((c) => !c.revokedAt);
      const weeklyCompleted = activeCompletions.length;
      const taskPoints = activeCompletions.reduce(
        (sum, c) => sum + c.points,
        0
      );
      const rewardPoints = rewardPointsByChild.get(child.id) || 0;
      const weeklyPoints = taskPoints + rewardPoints;

      return {
        id: child.id,
        username: child.username,
        currentPoints: child.currentPoints,
        totalPoints: child.totalPoints,
        weeklyCompleted,
        weeklyPoints,
        completions: child.taskCompletions.map((c) => ({
          id: c.id,
          taskId: c.task.id,
          taskName: c.task.name,
          points: c.points,
          completedAt: formatBeijingTime(c.completedAt),
          revokedAt: c.revokedAt ? formatBeijingTime(c.revokedAt) : null,
        })),
      };
    });

    return NextResponse.json({
      code: 0,
      data: {
        weekRange: {
          start: formatBeijingTime(weekStart),
          end: formatBeijingTime(weekEnd),
        },
        children: stats,
      },
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}