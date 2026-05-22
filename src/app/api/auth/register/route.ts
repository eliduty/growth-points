import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { usernameSchema, passwordSchema } from "@/lib/validators";
import { z } from "zod";

const registerSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证输入
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const errorMessage = parsed.error.issues[0]?.message || "输入格式错误";
      const errorCode = parsed.error.issues[0]?.path[0] === "username" ? 1002 : 1003;
      return NextResponse.json(
        { code: errorCode, data: null, message: errorMessage },
        { status: 400 }
      );
    }

    const { username, password } = parsed.data;

    // 检查用户名是否已存在（全局唯一检查，注册时不属于任何家庭）
    // 注意：根据设计，注册时创建新家庭，所以检查 username 全局唯一
    const existingUser = await prisma.user.findFirst({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { code: 1001, data: null, message: "用户名已存在" },
        { status: 400 }
      );
    }

    // 加密密码
    const hashedPassword = await hashPassword(password);

    // 创建新家庭和用户
    const family = await prisma.family.create({ data: {} });

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: "PARENT",
        familyId: family.id,
        timezoneOffset: 8, // 默认北京时间
      },
      select: {
        id: true,
        username: true,
        role: true,
        familyId: true,
      },
    });

    // 创建 Session
    await createSession(user.id, user.role, user.familyId);

    return NextResponse.json({
      code: 0,
      data: user,
      message: "注册成功",
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { code: 5001, data: null, message: "注册失败，请重试" },
      { status: 500 }
    );
  }
}