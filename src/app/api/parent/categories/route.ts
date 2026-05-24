import { NextRequest, NextResponse } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { createCategorySchema } from "@/lib/validators";

/**
 * GET /api/parent/categories - 获取类别列表
 */
export async function GET(request: NextRequest) {
  try {
    const { familyId } = await requireParent(request);

    // 获取家庭内所有类别
    const categories = await prisma.category.findMany({
      where: { familyId },
      orderBy: { order: "asc" },
      select: {
        id: true,
        name: true,
        order: true,
        tasks: {
          where: { deletedAt: null },
          select: { id: true },
        },
      },
    });

    // 转换为前端期望的格式
    const result = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      order: cat.order,
      taskCount: cat.tasks.length,
    }));

    return NextResponse.json({
      code: 0,
      data: result,
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}

/**
 * POST /api/parent/categories - 创建类别
 */
export async function POST(request: NextRequest) {
  try {
    const { familyId } = await requireParent(request);
    const body = await request.json();

    // 验证输入
    const validated = createCategorySchema.parse(body);

    // 检查类别名是否已存在
    const existingCategory = await prisma.category.findFirst({
      where: { name: validated.name, familyId },
    });

    if (existingCategory) {
      return NextResponse.json(
        { code: 4002, data: null, message: "类别名称已存在" },
        { status: 400 }
      );
    }

    // 获取当前最大顺序值
    const maxOrderCategory = await prisma.category.findFirst({
      where: { familyId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = (maxOrderCategory?.order ?? -1) + 1;

    // 创建类别
    const category = await prisma.category.create({
      data: {
        name: validated.name,
        familyId,
        order: newOrder,
      },
      select: {
        id: true,
        name: true,
        order: true,
      },
    });

    return NextResponse.json({
      code: 0,
      data: category,
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