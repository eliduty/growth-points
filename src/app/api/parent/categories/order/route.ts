import { NextResponse } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { z } from "zod";

const updateOrderSchema = z.object({
  orders: z.array(
    z.object({
      id: z.string(),
      order: z.number().int(),
    })
  ),
});

/**
 * PUT /api/parent/categories/order - 更新类别顺序
 */
export async function PUT(request: Request) {
  try {
    const { familyId } = await requireParent();
    const body = await request.json();

    // 验证输入
    const validated = updateOrderSchema.parse(body);

    // 验证所有类别都属于当前家庭
    const categoryIds = validated.orders.map((o) => o.id);
    const categories = await prisma.category.findMany({
      where: { id: { in: categoryIds }, familyId },
      select: { id: true },
    });

    if (categories.length !== categoryIds.length) {
      return NextResponse.json(
        { code: 4003, data: null, message: "部分类别不存在或不属于当前家庭" },
        { status: 400 }
      );
    }

    // 批量更新顺序
    await prisma.$transaction(
      validated.orders.map((item) =>
        prisma.category.update({
          where: { id: item.id },
          data: { order: item.order },
        })
      )
    );

    return NextResponse.json({
      code: 0,
      data: null,
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