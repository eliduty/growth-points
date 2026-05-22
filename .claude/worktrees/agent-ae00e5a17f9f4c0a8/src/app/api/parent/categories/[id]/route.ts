import { NextResponse } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";

/**
 * DELETE /api/parent/categories/[id] - 删除类别
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { familyId } = await requireParent();
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