import { NextRequest, NextResponse } from "next/server";
import { requireParent, handleAuthError } from "@/lib/auth/guard";
import { prisma } from "@/lib/db";
import { usernameSchema, passwordSchema } from "@/lib/validators";
import { hash } from "bcryptjs";

/**
 * GET /api/parent/members - 获取成员列表（children + parents 分组）
 */
export async function GET(request: NextRequest) {
  try {
    const { userId, familyId } = await requireParent(request);

    // 获取家庭内所有成员
    const members = await prisma.user.findMany({
      where: { familyId },
      select: {
        id: true,
        username: true,
        role: true,
        currentPoints: true,
        totalPoints: true,
      },
      orderBy: { createdAt: "asc" },
    });

    // 分组并标记当前用户
    const children = members
      .filter((m) => m.role === "CHILD")
      .map((m) => ({
        id: m.id,
        username: m.username,
        role: m.role,
        isMe: m.id === userId,
        currentPoints: m.currentPoints,
        totalPoints: m.totalPoints,
      }));

    const parents = members
      .filter((m) => m.role === "PARENT")
      .map((m) => ({
        id: m.id,
        username: m.username,
        role: m.role,
        isMe: m.id === userId,
      }));

    return NextResponse.json({
      code: 0,
      data: { children, parents },
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}

/**
 * POST /api/parent/members - 添加成员
 */
export async function POST(request: NextRequest) {
  try {
    const { familyId } = await requireParent(request);
    const body = await request.json();

    // 验证输入
    const username = usernameSchema.parse(body.username);
    const password = passwordSchema.parse(body.password);
    const role = body.role;

    if (role !== "PARENT" && role !== "CHILD") {
      return NextResponse.json(
        { code: 4001, data: null, message: "角色必须是 PARENT 或 CHILD" },
        { status: 400 }
      );
    }

    // 检查用户名是否已存在（家庭内）
    const existingUser = await prisma.user.findFirst({
      where: { familyId, username },
    });

    if (existingUser) {
      return NextResponse.json(
        { code: 4002, data: null, message: "该用户名已存在" },
        { status: 400 }
      );
    }

    // 加密密码
    const hashedPassword = await hash(password, 10);

    // 创建用户
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role,
        familyId,
      },
      select: {
        id: true,
        username: true,
        role: true,
        familyId: true,
      },
    });

    return NextResponse.json({
      code: 0,
      data: user,
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