import { NextResponse, NextRequest } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { getWeekStart, getWeekEnd } from "@/lib/date";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId, familyId } = await requireParent(request);
    const { id } = await params;

    // 查询完成记录
    const completion = await prisma.taskCompletion.findUnique({
      where: { id },
      include: {
        task: {
          select: {
            familyId: true,
          },
        },
        user: {
          select: {
            id: true,
            currentPoints: true,
            familyId: true,
          },
        },
      },
    });

    if (!completion) {
      return NextResponse.json(
        { code: 4004, data: null, message: "完成记录不存在" },
        { status: 404 }
      );
    }

    // 验证属于本家庭
    if (completion.task.familyId !== familyId) {
      return NextResponse.json(
        { code: 4002, data: null, message: "无权限" },
        { status: 403 }
      );
    }

    // 检查是否已撤销
    if (completion.revokedAt) {
      return NextResponse.json(
        { code: 4003, data: null, message: "该记录已撤销" },
        { status: 400 }
      );
    }

    // 检查是否本周内
    const weekStart = getWeekStart();
    const weekEnd = getWeekEnd();

    if (completion.completedAt < weekStart || completion.completedAt > weekEnd) {
      return NextResponse.json(
        { code: 4003, data: null, message: "只能撤销本周内的完成记录" },
        { status: 400 }
      );
    }

    const pointsToRevoke = completion.points;

    // 查询该孩子的待确认兑换记录（按时间倒序）
    const pendingRedemptions = await prisma.giftRedemption.findMany({
      where: {
        userId: completion.user.id,
        status: "PENDING",
      },
      orderBy: {
        redeemedAt: "desc",
      },
    });

    // 计算需要撤销哪些兑换记录
    const userCurrentPoints = completion.user.currentPoints;
    const pointsAfterRevoke = userCurrentPoints - pointsToRevoke;

    // 如果积分不足，需要撤销待确认兑换记录
    let redemptionsCancelled = 0;
    const redemptionsToCancel: string[] = [];

    if (pointsAfterRevoke < 0) {
      let deficit = Math.abs(pointsAfterRevoke);

      for (const redemption of pendingRedemptions) {
        if (deficit <= 0) break;

        redemptionsToCancel.push(redemption.id);
        deficit -= redemption.points;
        redemptionsCancelled++;
      }
    }

    // 执行撤销操作
    await prisma.$transaction([
      // 撤销完成记录
      prisma.taskCompletion.update({
        where: { id },
        data: {
          revokedAt: new Date(),
          revokedBy: userId,
        },
      }),
      // 扣减积分
      prisma.user.update({
        where: { id: completion.user.id },
        data: {
          currentPoints: Math.max(0, pointsAfterRevoke),
        },
      }),
      // 撤销待确认兑换记录
      ...redemptionsToCancel.map((redemptionId) =>
        prisma.giftRedemption.update({
          where: { id: redemptionId },
          data: {
            status: "CANCELLED",
            cancelledAt: new Date(),
            cancelledBy: userId,
          },
        })
      ),
    ]);

    return NextResponse.json({
      code: 0,
      data: {
        pointsRevoked: pointsToRevoke,
        redemptionsCancelled,
      },
      message: "撤销成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}