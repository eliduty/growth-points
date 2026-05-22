import { NextResponse } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { createGiftSchema } from "@/lib/validators";

/**
 * GET /api/parent/gifts - 获取礼物列表
 */
export async function GET() {
  try {
    const { familyId } = await requireParent();

    const gifts = await prisma.gift.findMany({
      where: { familyId, deletedAt: null },
      select: {
        id: true,
        name: true,
        points: true,
        description: true,
        color: true,
        weeklyLimit: true,
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json({
      code: 0,
      data: gifts,
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}

/**
 * POST /api/parent/gifts - 创建礼物
 */
export async function POST(request: Request) {
  try {
    const { familyId } = await requireParent();
    const body = await request.json();

    // 验证输入
    const validated = createGiftSchema.parse(body);

    // 检查礼物名是否已存在
    const existingGift = await prisma.gift.findFirst({
      where: {
        name: validated.name,
        familyId,
        deletedAt: null,
      },
    });

    if (existingGift) {
      return NextResponse.json(
        { code: 4004, data: null, message: "已存在同名礼物" },
        { status: 400 }
      );
    }

    // 预设颜色池
    const colors = [
      "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
      "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9"
    ];

    // 获取当前家庭已有礼物颜色
    const existingColors = await prisma.gift.findMany({
      where: { familyId, deletedAt: null },
      select: { color: true },
    });

    const usedColors = existingColors.map((g) => g.color);
    const availableColors = colors.filter((c) => !usedColors.includes(c));
    const color = availableColors.length > 0
      ? availableColors[Math.floor(Math.random() * availableColors.length)]
      : colors[Math.floor(Math.random() * colors.length)];

    // 创建礼物
    const gift = await prisma.gift.create({
      data: {
        name: validated.name,
        points: validated.points,
        description: validated.description,
        weeklyLimit: validated.weeklyLimit,
        color,
        familyId,
      },
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