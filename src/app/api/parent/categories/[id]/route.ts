import { NextRequest, NextResponse } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { createCategorySchema } from "@/lib/validators";

/**
 * PUT /api/parent/categories/[id] - 更新类别名称
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { familyId } = await requireParent(request);
    const { id } = await params;
    const body = await request.json();

    const validated = createCategorySchema.parse(body);

    // 检查类别是否存在且属于当前家庭
    const existingCategory = await prisma.category.findFirst({
      where: { id, familyId },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { code: 4003, data: null, message: "类别不存在" },
        { status: 400 }
      );
    }

    // 检查名称是否与其他类别重复
    const duplicateCategory = await prisma.category.findFirst({
      where: { name: validated.name, familyId, id: { not: id } },
    });

    if (duplicateCategory) {
      return NextResponse.json(
        { code: 4002, data: null, message: "类别名称已存在" },
        { status: 400 }
      );
    }

    // 更新类别名称
    const updatedCategory = await prisma.category.update({
      where: { id },
      data: { name: validated.name },
      select: { id: true, name: true, order: true },
    });

    return NextResponse.json({
      code: 0,
      data: updatedCategory,
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
 * DELETE /api/parent/categories/[id] - 删除类别
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { familyId } = await requireParent(request);
    const { id } = await params;

    // 检查类别是否存在且属于当前家庭
    const existingCategory = await prisma.category.findFirst({
      where: { id, familyId },
      include: {
        tasks: {
          where: { deletedAt: null },
          select: { id: true },
        },
      },
    });

    if (!existingCategory) {
      return NextResponse.json(
        { code: 4003, data: null, message: "类别不存在" },
        { status: 400 }
      );
    }

    // 检查是否有未删除的任务
    if (existingCategory.tasks.length > 0) {
      return NextResponse.json(
        { code: 4004, data: null, message: "该类别下还有任务，无法删除" },
        { status: 400 }
      );
    }

    // 删除类别
    await prisma.category.delete({
      where: { id },
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