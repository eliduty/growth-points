import { NextResponse } from "next/server";
import { getSession } from "@/lib/session";

export interface SessionUser {
  userId: string;
  familyId: string;
  role: "parent" | "child";
}

/**
 * 获取当前会话用户
 */
export async function getUser(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session?.user) return null;
  return {
    userId: session.user.id,
    familyId: session.user.familyId,
    role: session.user.role as "parent" | "child",
  };
}

/**
 * 要求孩子角色权限
 */
export async function requireChild(): Promise<{ userId: string; familyId: string }> {
  const user = await getUser();
  if (!user) {
    throw new AuthError("未登录", 401);
  }
  if (user.role !== "child") {
    throw new AuthError("权限不足", 403);
  }
  return { userId: user.userId, familyId: user.familyId };
}

/**
 * 要求家长角色权限
 */
export async function requireParent(): Promise<{ userId: string; familyId: string }> {
  const user = await getUser();
  if (!user) {
    throw new AuthError("未登录", 401);
  }
  if (user.role !== "parent") {
    throw new AuthError("权限不足", 403);
  }
  return { userId: user.userId, familyId: user.familyId };
}

/**
 * 认证错误类
 */
export class AuthError extends Error {
  constructor(
    message: string,
    public statusCode: number = 401
  ) {
    super(message);
    this.name = "AuthError";
  }
}

/**
 * 处理认证错误
 */
export function handleAuthError(error: unknown): NextResponse {
  if (error instanceof AuthError) {
    return NextResponse.json(
      { code: 4001, data: null, message: error.message },
      { status: error.statusCode }
    );
  }
  console.error("Auth error:", error);
  return NextResponse.json(
    { code: 5000, data: null, message: "服务器错误" },
    { status: 500 }
  );
}
