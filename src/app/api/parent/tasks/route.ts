import { NextRequest, NextResponse } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { createTaskSchema, availableDaysSchema } from "@/lib/validators";
import { formatTaskStatus, formatAvailableDaysDisplay } from "@/lib/date";
import { z } from "zod";

const createTaskWithDaysSchema = createTaskSchema.extend({
  availableDays: availableDaysSchema,
});

/**
 * GET /api/parent/tasks - 获取任务列表（按类别分组）
 */
export async function GET(request: NextRequest) {
  try {
    const { familyId } = await requireParent(request);

    // 获取家庭内所有类别及其任务
    const categories = await prisma.category.findMany({
      where: { familyId },
      orderBy: { order: "asc" },
      select: {
        id: true,
        name: true,
        order: true,
        tasks: {
          where: { deletedAt: null },
          select: {
            id: true,
            name: true,
            points: true,
            description: true,
            categoryId: true,
            availableDays: true,
          },
          orderBy: { createdAt: "asc" },
        },
      },
    });

    // 转换为前端期望的格式
    const result = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      order: cat.order,
      tasks: cat.tasks.map((task) => ({
        id: task.id,
        name: task.name,
        points: task.points,
        description: task.description,
        categoryId: task.categoryId,
        categoryName: cat.name,
        availableDays: task.availableDays,
        status: formatTaskStatus(task.availableDays),
        availableDaysDisplay: formatAvailableDaysDisplay(task.availableDays),
      })),
    }));

    return NextResponse.json({
      code: 0,
      data: { categories: result },
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}

/**
 * POST /api/parent/tasks - 创建任务
 */
export async function POST(request: NextRequest) {
  try {
    const { familyId } = await requireParent(request);
    const body = await request.json();

    // 验证输入
    const validated = createTaskWithDaysSchema.parse(body);

    // 检查类别是否属于当前家庭
    const category = await prisma.category.findFirst({
      where: { id: validated.categoryId, familyId },
    });

    if (!category) {
      return NextResponse.json(
        { code: 4003, data: null, message: "类别不存在或不属于当前家庭" },
        { status: 400 }
      );
    }

    // 检查任务名是否已存在（同一类别内）
    const existingTask = await prisma.task.findFirst({
      where: {
        name: validated.name,
        categoryId: validated.categoryId,
        deletedAt: null,
      },
    });

    if (existingTask) {
      return NextResponse.json(
        { code: 4004, data: null, message: "该类别下已存在同名任务" },
        { status: 400 }
      );
    }

    // 创建任务
    const task = await prisma.task.create({
      data: {
        name: validated.name,
        points: validated.points,
        description: validated.description,
        categoryId: validated.categoryId,
        familyId,
        availableDays: validated.availableDays,
      },
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
        categoryName: category.name,
        status: formatTaskStatus(task.availableDays),
        availableDaysDisplay: formatAvailableDaysDisplay(task.availableDays),
      },
      message: "创建成功",
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