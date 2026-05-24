import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { Role, SessionData } from "@/types";
import { JWT_SECRET_NAME, COOKIE_NAME, TOKEN_EXPIRY } from "@/lib/constants";

/**
 * 获取 JWT 密钥
 */
function getJwtSecret(): Uint8Array {
  const secret = process.env[JWT_SECRET_NAME];
  if (!secret) {
    throw new Error(`JWT secret not configured. Set ${JWT_SECRET_NAME} environment variable.`);
  }
  return new TextEncoder().encode(secret);
}

/**
 * 创建 JWT token
 */
async function createJwtToken(payload: SessionData): Promise<string> {
  const secret = getJwtSecret();
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_EXPIRY}s`)
    .sign(secret);
  return token;
}

/**
 * 验证 JWT token 并提取 payload
 */
async function verifyJwtToken(token: string): Promise<SessionData | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify<SessionData>(token, secret);
    return payload;
  } catch {
    return null;
  }
}

/**
 * 获取 cookie 配置（导出供 Route Handlers 直接在 NextResponse 上设置）
 */
export function getCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: TOKEN_EXPIRY,
    path: "/",
  };
}

/**
 * 创建 Session token（登录成功后，由 Route Handler 负责将 token 写入响应 cookie）
 */
export async function createSession(userId: string, role: Role, familyId: string): Promise<string> {
  const payload: SessionData = { userId, role, familyId };
  return createJwtToken(payload);
}

/**
 * 获取当前 session payload
 */
export async function getSessionPayload(): Promise<SessionData | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }
  return verifyJwtToken(token);
}

/**
 * 检查是否已登录
 */
export async function isAuthenticated(): Promise<boolean> {
  const payload = await getSessionPayload();
  return !!payload?.userId;
}

/**
 * 获取当前用户 ID
 */
export async function getCurrentUserId(): Promise<string | null> {
  const payload = await getSessionPayload();
  return payload?.userId || null;
}

/**
 * 获取当前用户角色
 */
export async function getCurrentRole(): Promise<Role | null> {
  const payload = await getSessionPayload();
  return payload?.role || null;
}

/**
 * 获取当前家庭 ID
 */
export async function getCurrentFamilyId(): Promise<string | null> {
  const payload = await getSessionPayload();
  return payload?.familyId || null;
}