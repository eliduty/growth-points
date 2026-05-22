import { NextResponse } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { RedemptionStatus } from "@/generated/prisma";

/**
 * PUT /api/parent/gifts/redemptions/[id]/cancel - 撤销兑换（仅 PENDING 状态）
 */
export async function PUT(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: parentId, familyId } = await requireParent();
    const { id } = await params;

    // 检查兑换记录是否存在且属于当前家庭
    const redemption = await prisma.giftRedemption.findFirst({
      where: {
        id,
        gift: { familyId },
        status: RedemptionStatus.PENDING,
      },
      include: {
        gift: true,
        user: true,
      },
    });

    if (!redemption) {
      return NextResponse.json(
        { code: 4003, data: null, message: "兑换记录不存在或已处理" },
        { status: 400 }
      );
    }

    // 使用事务：更新兑换状态 + 返还积分
    await prisma.$transaction([
      // 更新兑换状态为已撤销
      prisma.giftRedemption.update({
        where: { id },
        data: {
          status: RedemptionStatus.CANCELLED,
          cancelledAt: new Date(),
          cancelledBy: parentId,
        },
      }),
      // 返还积分给用户
      prisma.user.update({
        where: { id: redemption.userId },
        data: {
          currentPoints: { increment: redemption.points },
        },
      }),
    ]);

    return NextResponse.json({
      code: 0,
      data: {
        giftName: redemption.gift.name,
        username: redemption.user.username,
        pointsReturned: redemption.points,
      },
      message: "撤销成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}