import { NextResponse } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { exchangeDaysSchema } from "@/lib/validators";

/**
 * GET /api/parent/exchange-days - 获取兑换日设置
 */
export async function GET() {
  try {
    const { familyId } = await requireParent();

    // 获取兑换日设置
    const exchangeDays = await prisma.exchangeDay.findMany({
      where: { familyId },
      select: { dayOfWeek: true },
    });

    const days = exchangeDays.map((d) => d.dayOfWeek);

    return NextResponse.json({
      code: 0,
      data: days,
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}

/**
 * PUT /api/parent/exchange-days - 更新兑换日设置
 */
export async function PUT(request: Request) {
  try {
    const { familyId } = await requireParent();
    const body = await request.json();

    // 验证输入
    const validated = exchangeDaysSchema.parse(body);

    // 先删除所有现有设置
    await prisma.exchangeDay.deleteMany({
      where: { familyId },
    });

    // 创建新的设置
    if (validated.days.length > 0) {
      await prisma.exchangeDay.createMany({
        data: validated.days.map((day) => ({
          familyId,
          dayOfWeek: day,
        })),
      });
    }

    return NextResponse.json({
      code: 0,
      data: validated.days,
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