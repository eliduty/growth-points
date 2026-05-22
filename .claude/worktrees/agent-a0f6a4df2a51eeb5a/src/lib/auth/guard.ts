import { getCurrentUserId, getCurrentRole, getCurrentFamilyId } from "./session";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { Role } from "@/generated/prisma";

/**
 * 要求用户已登录
 * 未登录返回 401 错误
 */
export async function requireAuth(): Promise<{ userId: string; role: Role; familyId: string }> {
  const userId = await getCurrentUserId();
  const role = await getCurrentRole();
  const familyId = await getCurrentFamilyId();

  if (!userId || !role || !familyId) {
    throw new Error("UNAUTHORIZED");
  }

  return { userId, role, familyId };
}

/**
 * 要求用户是家长角色
 * 不是家长返回 403 错误
 */
export async function requireParent(): Promise<{ userId: string; familyId: string }> {
  const { userId, role, familyId } = await requireAuth();

  if (role !== "PARENT") {
    throw new Error("FORBIDDEN");
  }

  return { userId, familyId };
}

/**
 * 要求用户是孩子角色
 * 不是孩子返回 403 错误
 */
export async function requireChild(): Promise<{ userId: string; familyId: string }> {
  const { userId, role, familyId } = await requireAuth();

  if (role !== "CHILD") {
    throw new Error("FORBIDDEN");
  }

  return { userId, familyId };
}

/**
 * 获取完整用户信息（含数据库数据）
 */
export async function getFullUserInfo(): Promise<{
  id: string;
  username: string;
  role: Role;
  familyId: string;
  timezoneOffset: number | null;
  currentPoints?: number;
  totalPoints?: number;
} | null> {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      role: true,
      familyId: true,
      timezoneOffset: true,
      currentPoints: true,
      totalPoints: true,
    },
  });

  return user;
}

/**
 * API 错误响应处理
 */
export function handleAuthError(error: unknown): NextResponse {
  if (error instanceof Error) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { code: 4001, data: null, message: "未登录" },
        { status: 401 }
      );
    }
    if (error.message === "FORBIDDEN") {
      return NextResponse.json(
        { code: 4002, data: null, message: "无权限" },
        { status: 403 }
      );
    }
  }

  return NextResponse.json(
    { code: 5001, data: null, message: "服务器错误" },
    { status: 500 }
  );
}