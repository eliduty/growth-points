import { NextResponse } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateGiftSchema = z.object({
  name: z.string().min(1, "请输入礼物名称").max(50, "礼物名称最多50字符").optional(),
  points: z.number().int().min(1, "积分至少为1").max(1000, "积分最多1000").optional(),
  description: z.string().max(200, "描述最多200字符").optional(),
  weeklyLimit: z
    .number()
    .int()
    .min(1, "每周上限至少为1")
    .max(10, "每周上限最多10")
    .optional()
    .nullable(),
});

/**
 * PUT /api/parent/gifts/[id] - 更新礼物
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { familyId } = await requireParent();
    const { id } = await params;
    const body = await request.json();

    // 验证输入
    const validated = updateGiftSchema.parse(body);

    // 检查礼物是否存在且属于当前家庭
    const existingGift = await prisma.gift.findFirst({
      where: { id, familyId, deletedAt: null },
    });

    if (!existingGift) {
      return NextResponse.json(
        { code: 4003, data: null, message: "礼物不存在" },
        { status: 400 }
      );
    }

    // 如果更新名称，检查是否有同名礼物
    if (validated.name && validated.name !== existingGift.name) {
      const duplicateGift = await prisma.gift.findFirst({
        where: {
          name: validated.name,
          familyId,
          deletedAt: null,
          id: { not: id },
        },
      });

      if (duplicateGift) {
        return NextResponse.json(
          { code: 4004, data: null, message: "已存在同名礼物" },
          { status: 400 }
        );
      }
    }

    // 更新礼物
    const gift = await prisma.gift.update({
      where: { id },
      data: validated,
      select: {
        id: true,
        name: true,
        points: true,
        description: true,
        color: true,
        weeklyLimit: true,
      },
    });

    return NextResponse.json({
      code: 0,
      data: gift,
      message: "更新成功",
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

/**
 * DELETE /api/parent/gifts/[id] - 软删除礼物
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { familyId } = await requireParent();
    const { id } = await params;

    // 检查礼物是否存在且属于当前家庭
    const existingGift = await prisma.gift.findFirst({
      where: { id, familyId, deletedAt: null },
    });

    if (!existingGift) {
      return NextResponse.json(
        { code: 4003, data: null, message: "礼物不存在" },
        { status: 400 }
      );
    }

    // 软删除礼物
    await prisma.gift.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({
      code: 0,
      data: null,
      message: "删除成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}