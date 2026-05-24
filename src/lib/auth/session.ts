import { SignJWT, jwtVerify } from "jose";
import { NextRequest } from "next/server";
import { Role, SessionData } from "@/types";
import { JWT_SECRET_NAME, COOKIE_NAME, TOKEN_EXPIRY } from "@/lib/constants";

function getJwtSecret(): Uint8Array {
  const secret = process.env[JWT_SECRET_NAME];
  if (!secret) {
    throw new Error(`JWT secret not configured. Set ${JWT_SECRET_NAME} environment variable.`);
  }
  return new TextEncoder().encode(secret);
}

async function createJwtToken(payload: SessionData): Promise<string> {
  const secret = getJwtSecret();
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${TOKEN_EXPIRY}s`)
    .sign(secret);
  return token;
}

export async function verifyJwtToken(token: string): Promise<SessionData | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify<SessionData>(token, secret);
    return payload;
  } catch {
    return null;
  }
}

/**
 * 从 NextRequest 读取并验证 session（EdgeOne 兼容，所有 Route Handler 和 Middleware 使用此方式）
 */
export async function getSessionFromRequest(request: NextRequest): Promise<SessionData | null> {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyJwtToken(token);
}

/**
 * 获取 cookie 配置
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
 * 创建 Session token（由 Route Handler 负责将 token 写入 NextResponse cookie）
 */
export async function createSession(userId: string, role: Role, familyId: string): Promise<string> {
  const payload: SessionData = { userId, role, familyId };
  return createJwtToken(payload);
}
