import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { SessionData, Role } from "@/types";
import { JWT_SECRET_NAME, COOKIE_NAME } from "@/lib/constants";

// 需要认证的路由
const protectedRoutes = {
  child: ["/child"],
  parent: ["/parent"],
  any: [], // 任何角色都可访问（暂无）
};

// 公开路由（无需认证）
const publicRoutes = ["/", "/login", "/register", "/parent/login", "/child/login"];

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

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 静态文件和 manifest 直接放行
  if (
    pathname.startsWith("/_next/") ||
    pathname === "/favicon.ico" ||
    pathname === "/manifest.json" ||
    pathname === "/manifest.webmanifest" ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|ico|css|js)$/i)
  ) {
    return NextResponse.next();
  }

  // 公开路由直接放行
  if (publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next();
  }

  // 从 request.cookies 读取 token
  const token = request.cookies.get(COOKIE_NAME)?.value;

  // 未登录，跳转到对应登录页
  if (!token) {
    if (pathname.startsWith("/child")) {
      const loginUrl = new URL("/child/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    if (pathname.startsWith("/parent")) {
      const loginUrl = new URL("/parent/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  // 验证 JWT token
  const payload = await verifyJwtToken(token);

  // Token 无效或过期
  if (!payload) {
    if (pathname.startsWith("/child")) {
      const loginUrl = new URL("/child/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    if (pathname.startsWith("/parent")) {
      const loginUrl = new URL("/parent/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  const { role } = payload;

  // 孩子端路由检查（排除 /child/login）
  if (protectedRoutes.child.some((route) => pathname.startsWith(route))) {
    if (pathname === "/child/login") {
      return NextResponse.next(); // 登录页已登录用户直接放行
    }
    if (role !== "CHILD") {
      // 家长访问孩子端，跳转到家长端
      const parentUrl = new URL("/parent", request.url);
      return NextResponse.redirect(parentUrl);
    }
  }

  // 家长端路由检查（排除 /parent/login）
  if (protectedRoutes.parent.some((route) => pathname.startsWith(route))) {
    if (pathname === "/parent/login") {
      return NextResponse.next(); // 登录页已登录用户直接放行
    }
    if (role !== "PARENT") {
      // 孩子访问家长端，跳转到孩子端
      const childUrl = new URL("/child", request.url);
      return NextResponse.redirect(childUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了：
     * - api (API 路由)
     * - _next/static (静态文件)
     * - _next/image (图片优化)
     * - favicon.ico (浏览器图标)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public/).*)",
  ],
};