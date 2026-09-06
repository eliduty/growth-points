import { NextRequest, NextResponse } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { RedemptionStatus } from "@prisma/client";

/**
 * PUT /api/parent/gifts/redemptions/[id]/confirm - 确认兑换
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: parentId, familyId } = await requireParent(request);
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

    // 更新兑换状态为已确认
    await prisma.giftRedemption.update({
      where: { id },
      data: {
        status: RedemptionStatus.CONFIRMED,
        confirmedAt: new Date(),
        confirmedBy: parentId,
      },
    });

    return NextResponse.json({
      code: 0,
      data: null,
      message: "确认成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}