import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireChild, handleAuthError } from "@/lib/auth/guard";
import { getWeekStart, getWeekEnd, getBeijingNow, isExchangeDayNow } from "@/lib/date";

export async function POST(request: NextRequest) {
  try {
    const { userId, familyId } = await requireChild();

    const body = await request.json();
    const { giftId } = body;

    if (!giftId) {
      return NextResponse.json(
        { code: 4001, data: null, message: "缺少礼物ID" },
        { status: 400 }
      );
    }

    // 查询礼物信息
    const gift = await prisma.gift.findUnique({
      where: { id: giftId },
    });

    if (!gift || gift.deletedAt) {
      return NextResponse.json(
        { code: 4004, data: null, message: "礼物不存在" },
        { status: 404 }
      );
    }

    // 查询家庭兑换日设置
    const exchangeDaysRecords = await prisma.exchangeDay.findMany({
      where: { familyId },
      select: { dayOfWeek: true },
    });
    const exchangeDays = exchangeDaysRecords.map((d) => d.dayOfWeek);

    // 检查是否是兑换日
    if (!isExchangeDayNow(exchangeDays)) {
      return NextResponse.json(
        { code: 3001, data: null, message: "今日不是兑换日" },
        { status: 400 }
      );
    }

    // 查询用户当前积分
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        currentPoints: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { code: 4003, data: null, message: "用户不存在" },
        { status: 404 }
      );
    }

    // 检查积分是否足够
    if ((user.currentPoints || 0) < gift.points) {
      return NextResponse.json(
        { code: 3002, data: null, message: "积分不足" },
        { status: 400 }
      );
    }

    // 检查每周限制
    const weekStart = getWeekStart();
    const weekEnd = getWeekEnd();

    const weeklyRedemptions = await prisma.giftRedemption.count({
      where: {
        giftId,
        userId,
        redeemedAt: { gte: weekStart, lte: weekEnd },
        status: { in: ["PENDING", "CONFIRMED"] },
      },
    });

    if (gift.weeklyLimit && weeklyRedemptions >= gift.weeklyLimit) {
      return NextResponse.json(
        { code: 3003, data: null, message: "本周兑换次数已达上限" },
        { status: 400 }
      );
    }

    // 创建兑换记录并扣除积分
    const result = await prisma.$transaction([
      prisma.giftRedemption.create({
        data: {
          giftId,
          userId,
          points: gift.points,
          status: "PENDING",
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          currentPoints: { decrement: gift.points },
        },
      }),
    ]);

    const redemption = result[0];
    const updatedUser = result[1];

    return NextResponse.json({
      code: 0,
      data: {
        redemptionId: redemption.id,
        pointsSpent: gift.points,
        currentPoints: updatedUser.currentPoints,
        status: "PENDING",
      },
      message: "兑换成功",
    });
  } catch (error) {
    console.error("Redeem gift error:", error);
    return handleAuthError(error);
  }
}
