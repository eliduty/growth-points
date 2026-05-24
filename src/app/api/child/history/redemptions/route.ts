import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireChild, handleAuthError } from "@/lib/auth/guard";
import { getWeekStart, formatBeijingDate, formatBeijingTime, getBeijingNow } from "@/lib/date";

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

      // 查询本周的兑换记录
      const redemptions = await prisma.giftRedemption.findMany({
        where: {
          userId,
          redeemedAt: { gte: weekStart, lte: weekEnd },
        },
        include: {
          gift: {
            select: { name: true, color: true },
          },
        },
        orderBy: {
          redeemedAt: "desc",
        },
      });

      const redemptionsData = redemptions.map((r) => ({
        id: r.id,
        giftName: r.gift.name,
        giftColor: r.gift.color,
        points: r.points,
        redeemedAt: formatBeijingTime(r.redeemedAt),
        status: r.status,
        confirmedAt: r.confirmedAt ? formatBeijingTime(r.confirmedAt) : undefined,
        cancelledAt: r.cancelledAt ? formatBeijingTime(r.cancelledAt) : undefined,
      }));

      // 统计汇总
      const confirmedCount = redemptions.filter((r) => r.status === "CONFIRMED").length;
      const pendingCount = redemptions.filter((r) => r.status === "PENDING").length;
      const totalPointsSpent = redemptions
        .filter((r) => r.status === "CONFIRMED")
        .reduce((sum, r) => sum + r.points, 0);

      weeksData.push({
        weekRange: {
          start: formatBeijingDate(weekStart),
          end: formatBeijingDate(weekEnd),
        },
        redemptions: redemptionsData,
        summary: {
          confirmed: confirmedCount,
          pointsSpent: totalPointsSpent,
          pending: pendingCount,
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
