import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireChild, handleAuthError } from "@/lib/auth/guard";
import { getWeekStart, getWeekEnd, formatBeijingDate, formatBeijingTime, getBeijingNow } from "@/lib/date";

/**
 * GET /api/child/history/rewards - 按周查询孩子的奖励记录
 */
export async function GET(request: NextRequest) {
  try {
    const { userId } = await requireChild(request);

    // 获取周数参数（可选，默认4周）
    const weeksParam = request.nextUrl.searchParams.get("weeks");
    const weeks = weeksParam ? parseInt(weeksParam, 10) : 4;
    const validWeeks = isNaN(weeks) || weeks < 1 ? 4 : weeks;

    const now = getBeijingNow();
    const currentWeekStart = getWeekStart(now);

    // 准备周数据
    const weeksData = [];

    for (let i = 0; i < validWeeks; i++) {
      const weekStart = new Date(currentWeekStart);
      weekStart.setDate(weekStart.getDate() - i * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      // 查询本周的奖励记录
      const rewards = await prisma.reward.findMany({
        where: {
          userId,
          createdAt: { gte: weekStart, lte: weekEnd },
        },
        select: {
          id: true,
          points: true,
          reason: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      const rewardsData = rewards.map((r) => ({
        id: r.id,
        points: r.points,
        reason: r.reason,
        createdAt: formatBeijingTime(r.createdAt),
      }));

      // 统计汇总
      const rewardsCount = rewards.length;
      const totalPoints = rewards.reduce((sum, r) => sum + r.points, 0);

      weeksData.push({
        weekRange: {
          start: formatBeijingDate(weekStart),
          end: formatBeijingDate(weekEnd),
        },
        rewards: rewardsData,
        summary: {
          rewards: rewardsCount,
          points: totalPoints,
        },
      });
    }

    return NextResponse.json({
      code: 0,
      data: weeksData,
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}