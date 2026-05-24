import { NextRequest, NextResponse } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { RedemptionStatus } from "@/generated/prisma";

/**
 * GET /api/parent/gifts/redemptions - 获取兑换记录
 */
export async function GET(request: NextRequest) {
  try {
    const { familyId } = await requireParent(request);

    // 获取待确认和已确认的兑换记录
    const redemptions = await prisma.giftRedemption.findMany({
      where: {
        gift: { familyId },
        status: { in: [RedemptionStatus.PENDING, RedemptionStatus.CONFIRMED] },
      },
      select: {
        id: true,
        points: true,
        status: true,
        redeemedAt: true,
        confirmedAt: true,
        gift: {
          select: {
            name: true,
            color: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      orderBy: { redeemedAt: "desc" },
    });

    // 分离待确认和已确认
    const pending = redemptions
      .filter((r) => r.status === RedemptionStatus.PENDING)
      .map((r) => ({
        id: r.id,
        giftName: r.gift.name,
        giftColor: r.gift.color,
        points: r.points,
        userId: r.user.id,
        username: r.user.username,
        redeemedAt: r.redeemedAt.toISOString(),
        status: r.status,
      }));

    const confirmed = redemptions
      .filter((r) => r.status === RedemptionStatus.CONFIRMED)
      .map((r) => ({
        id: r.id,
        giftName: r.gift.name,
        giftColor: r.gift.color,
        points: r.points,
        userId: r.user.id,
        username: r.user.username,
        redeemedAt: r.redeemedAt.toISOString(),
        confirmedAt: r.confirmedAt?.toISOString() || null,
        status: r.status,
      }));

    return NextResponse.json({
      code: 0,
      data: { pending, confirmed },
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}