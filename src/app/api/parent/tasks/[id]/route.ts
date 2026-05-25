import { NextRequest, NextResponse } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { z } from "zod";
import { availableDaysSchema } from "@/lib/validators";
import { formatTaskStatus, formatAvailableDaysDisplay } from "@/lib/date";

const updateTaskSchema = z.object({
  name: z.string().min(1, "请输入任务名称").max(50, "任务名称最多50字符").optional(),
  points: z.number().int().min(1, "积分至少为1").max(100, "积分最多100").optional(),
  description: z.string().max(200, "描述最多200字符").optional(),
  categoryId: z.string().min(1, "请选择类别").optional(),
  availableDays: availableDaysSchema.optional(),
});

/**
 * PUT /api/parent/tasks/[id] - 更新任务
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { familyId } = await requireParent(request);
    const { id } = await params;
    const body = await request.json();

    // 验证输入
    const validated = updateTaskSchema.parse(body);

    // 检查任务是否存在且属于当前家庭
    const existingTask = await prisma.task.findFirst({
      where: { id, familyId, deletedAt: null },
      include: { category: true },
    });

    if (!existingTask) {
      return NextResponse.json(
        { code: 4003, data: null, message: "任务不存在" },
        { status: 400 }
      );
    }

    // 如果要更换类别，检查新类别是否属于当前家庭
    let newCategory = existingTask.category;
    if (validated.categoryId && validated.categoryId !== existingTask.categoryId) {
      const targetCategory = await prisma.category.findFirst({
        where: { id: validated.categoryId, familyId },
      });

      if (!targetCategory) {
        return NextResponse.json(
          { code: 4004, data: null, message: "类别不存在或不属于当前家庭" },
          { status: 400 }
        );
      }

      newCategory = targetCategory;

      // 检查新类别下是否有同名任务
      if (validated.name || existingTask.name) {
        const duplicateTask = await prisma.task.findFirst({
          where: {
            name: validated.name || existingTask.name,
            categoryId: validated.categoryId,
            deletedAt: null,
            id: { not: id },
          },
        });

        if (duplicateTask) {
          return NextResponse.json(
            { code: 4005, data: null, message: "目标类别下已存在同名任务" },
            { status: 400 }
          );
        }
      }
    }

    // 如果只更新名称（不换类别），检查当前类别下是否有同名任务
    if (validated.name && !validated.categoryId) {
      const duplicateTask = await prisma.task.findFirst({
        where: {
          name: validated.name,
          categoryId: existingTask.categoryId,
          deletedAt: null,
          id: { not: id },
        },
      });

      if (duplicateTask) {
        return NextResponse.json(
          { code: 4006, data: null, message: "当前类别下已存在同名任务" },
          { status: 400 }
        );
      }
    }

    // 构建更新数据
    const updateData: Record<string, unknown> = {};
    if (validated.name !== undefined) updateData.name = validated.name;
    if (validated.points !== undefined) updateData.points = validated.points;
    if (validated.description !== undefined) updateData.description = validated.description;
    if (validated.categoryId !== undefined) updateData.categoryId = validated.categoryId;
    if (validated.availableDays !== undefined) updateData.availableDays = validated.availableDays;

    // 更新任务
    const task = await prisma.task.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        points: true,
        description: true,
        categoryId: true,
        availableDays: true,
      },
    });

    return NextResponse.json({
      code: 0,
      data: {
        ...task,
        categoryName: newCategory.name,
        status: formatTaskStatus(task.availableDays),
        availableDaysDisplay: formatAvailableDaysDisplay(task.availableDays),
      },
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
 * DELETE /api/parent/tasks/[id] - 软删除任务
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { familyId } = await requireParent(request);
    const { id } = await params;

    // 检查任务是否存在且属于当前家庭
    const existingTask = await prisma.task.findFirst({
      where: { id, familyId, deletedAt: null },
    });

    if (!existingTask) {
      return NextResponse.json(
        { code: 4003, data: null, message: "任务不存在" },
        { status: 400 }
      );
    }

    // 软删除任务
    await prisma.task.update({
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