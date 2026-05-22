import { NextResponse } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";

/**
 * DELETE /api/parent/members/[id] - 删除成员
 * 规则：
 * 1. 不能删除自己
 * 2. 不能删除最后一个家长（保护家庭管理）
 */
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId, familyId } = await requireParent();
    const { id } = await params;

    // 不能删除自己
    if (id === userId) {
      return NextResponse.json(
        { code: 4003, data: null, message: "不能删除自己" },
        { status: 400 }
      );
    }

    // 检查成员是否存在且属于当前家庭
    const member = await prisma.user.findFirst({
      where: { id, familyId },
    });

    if (!member) {
      return NextResponse.json(
        { code: 4004, data: null, message: "成员不存在" },
        { status: 400 }
      );
    }

    // 如果是家长，检查是否是最后一个家长
    if (member.role === "PARENT") {
      const parentCount = await prisma.user.count({
        where: { familyId, role: "PARENT" },
      });

      if (parentCount <= 1) {
        return NextResponse.json(
          { code: 4005, data: null, message: "不能删除最后一个家长" },
          { status: 400 }
        );
      }
    }

    // 删除成员（会级联删除相关记录）
    await prisma.user.delete({
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