import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "请输入用户名"),
  password: z.string().min(1, "请输入密码"),
  timezoneOffset: z.number().int().min(-12).max(14).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证输入
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { code: 1004, data: null, message: "用户名或密码错误" },
        { status: 400 }
      );
    }

    const { username, password, timezoneOffset } = parsed.data;

    // 查询用户
    const user = await prisma.user.findFirst({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
        role: true,
        familyId: true,
        currentPoints: true,
        totalPoints: true,
        timezoneOffset: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { code: 1004, data: null, message: "用户名或密码错误" },
        { status: 400 }
      );
    }

    // 验证密码
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { code: 1004, data: null, message: "用户名或密码错误" },
        { status: 400 }
      );
    }

    // 更新时区偏移量（如果提供了）
    if (timezoneOffset !== undefined) {
      await prisma.user.update({
        where: { id: user.id },
        data: { timezoneOffset },
      });
    }

    // 创建 Session
    await createSession(user.id, user.role, user.familyId);

    // 返回用户信息（不包含密码）
    const responseData = {
      id: user.id,
      username: user.username,
      role: user.role,
      familyId: user.familyId,
      timezoneOffset: timezoneOffset ?? user.timezoneOffset,
      ...(user.role === "CHILD" && {
        currentPoints: user.currentPoints,
        totalPoints: user.totalPoints,
      }),
    };

    return NextResponse.json({
      code: 0,
      data: responseData,
      message: "登录成功",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { code: 5001, data: null, message: "登录失败，请重试" },
      { status: 500 }
    );
  }
}