import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireChild, handleAuthError } from "@/lib/auth/guard";
import { getWeekStart, getWeekEnd, formatBeijingTime, getBeijingNow, isExchangeDayNow, getNextExchangeDayInfo } from "@/lib/date";

export async function GET() {
  try {
    const { userId, familyId } = await requireChild();

    // 计算本周时间范围
    const weekStart = getWeekStart();
    const weekEnd = getWeekEnd();

    // 查询兑换日设置
    const exchangeDaysRecords = await prisma.exchangeDay.findMany({
      where: { familyId },
      select: { dayOfWeek: true },
    });
    const exchangeDays = exchangeDaysRecords.map((d) => d.dayOfWeek);

    // 查询用户信息和家庭设置
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        currentPoints: true,
        totalPoints: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { code: 4003, data: null, message: "用户不存在" },
        { status: 404 }
      );
    }

    const isExchangeDay = isExchangeDayNow(exchangeDays);
    const nextExchangeDay = getNextExchangeDayInfo(exchangeDays);

    // 查询家庭所有礼物
    const gifts = await prisma.gift.findMany({
      where: { familyId, deletedAt: null },
      orderBy: { points: "asc" },
      select: {
        id: true,
        name: true,
        points: true,
        description: true,
        color: true,
        weeklyLimit: true,
      },
    });

    // 查询本周已兑换数量
    const weeklyRedemptions = await prisma.giftRedemption.groupBy({
      by: ["giftId"],
      where: {
        userId,
        redeemedAt: { gte: weekStart, lte: weekEnd },
        status: { in: ["PENDING", "CONFIRMED"] },
      },
      _count: { id: true },
    });

    const weeklyRedemptionMap = new Map(
      weeklyRedemptions.map((r) => [r.giftId, r._count.id])
    );

    // 处理礼物数据
    const giftsWithStatus = gifts.map((gift) => {
      const weeklyRedeemed = weeklyRedemptionMap.get(gift.id) || 0;
      const weeklyLimit = gift.weeklyLimit;
      const hasWeeklyLimit = weeklyLimit !== null && weeklyLimit > 0;
      const limitExceeded = hasWeeklyLimit && weeklyRedeemed >= weeklyLimit;
      const hasEnoughPoints = (user.currentPoints || 0) >= gift.points;

      let limitStatus: "unlimited" | "available" | "exhausted" = "unlimited";
      if (hasWeeklyLimit) {
        limitStatus = limitExceeded ? "exhausted" : "available";
      }

      return {
        id: gift.id,
        name: gift.name,
        points: gift.points,
        description: gift.description,
        color: gift.color,
        weeklyLimit: gift.weeklyLimit,
        weeklyRedeemed,
        limitStatus,
        canRedeem: isExchangeDay && hasEnoughPoints && !limitExceeded,
      };
    });

    // 查询待确认兑换列表
    const pendingRedemptions = await prisma.giftRedemption.findMany({
      where: {
        userId,
        status: "PENDING",
      },
      orderBy: { redeemedAt: "desc" },
      select: {
        id: true,
        gift: { select: { name: true } },
        points: true,
        redeemedAt: true,
      },
    });

    const pendingRedemptionsList = pendingRedemptions.map((r) => ({
      id: r.id,
      giftName: r.gift.name,
      points: r.points,
      redeemedAt: formatBeijingTime(r.redeemedAt),
    }));

    return NextResponse.json({
      code: 0,
      data: {
        pointsOverview: {
          current: user.currentPoints || 0,
          total: user.totalPoints || 0,
          weekly: 0,
        },
        exchangeDaysInfo: {
          days: exchangeDays,
          isExchangeDay,
          nextExchangeDay,
        },
        gifts: giftsWithStatus,
        pendingRedemptions: pendingRedemptionsList,
      },
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}
