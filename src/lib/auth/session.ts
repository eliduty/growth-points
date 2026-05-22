import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, Role } from "@/types";
import { SESSION_CONFIG } from "@/lib/constants";

export const sessionOptions: SessionOptions = {
  cookieName: SESSION_CONFIG.cookieName,
  password: SESSION_CONFIG.password,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_CONFIG.ttl,
    sameSite: "lax",
    path: "/",
  },
};

/**
 * 获取 Session
 */
export async function getSession(): Promise<SessionData> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  return session;
}

/**
 * 创建 Session（登录成功后）
 */
export async function createSession(userId: string, role: Role, familyId: string): Promise<void> {
  const session = await getSession();
  session.userId = userId;
  session.role = role;
  session.familyId = familyId;
  await session.save();
}

/**
 * 清除 Session（登出）
 */
export async function clearSession(): Promise<void> {
  const session = await getSession();
  session.destroy();
}

/**
 * 检查是否已登录
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session.userId;
}

/**
 * 获取当前用户 ID
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getSession();
  return session.userId || null;
}

/**
 * 获取当前用户角色
 */
export async function getCurrentRole(): Promise<Role | null> {
  const session = await getSession();
  return session.role || null;
}

/**
 * 获取当前家庭 ID
 */
export async function getCurrentFamilyId(): Promise<string | null> {
  const session = await getSession();
  return session.familyId || null;
}