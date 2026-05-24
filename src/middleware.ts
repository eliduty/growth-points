import { NextRequest, NextResponse } from "next/server";
import { COOKIE_NAME } from "@/lib/constants";

// 需要认证的路由
const protectedRoutes = {
  child: ["/child"],
  parent: ["/parent"],
};

// 公开路由（无需认证）
const publicRoutes = ["/", "/login", "/register", "/parent/login", "/child/login"];

/**
 * 从 JWT token 中解码 payload（不验证签名）
 * middleware 运行在 Edge Runtime，用 jose jwtVerify 可能因环境变量不可用而失败。
 * 真正的签名验证在各 API route 的 guard.ts 中进行。
 */
function decodeJwtPayload(token: string): { role?: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    return JSON.parse(json);
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
      return NextResponse.redirect(new URL("/child/login", request.url));
    }
    if (pathname.startsWith("/parent")) {
      return NextResponse.redirect(new URL("/parent/login", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // 解码 payload（不验签）用于 role 路由判断
  // 签名合法性由各 API route 的 guard.ts 保证
  const payload = decodeJwtPayload(token);
  const role = payload?.role;

  // 孩子端路由检查
  if (protectedRoutes.child.some((route) => pathname.startsWith(route))) {
    if (pathname === "/child/login") return NextResponse.next();
    if (role !== "CHILD") {
      return NextResponse.redirect(new URL("/parent", request.url));
    }
  }

  // 家长端路由检查
  if (protectedRoutes.parent.some((route) => pathname.startsWith(route))) {
    if (pathname === "/parent/login") return NextResponse.next();
    if (role !== "PARENT") {
      return NextResponse.redirect(new URL("/child", request.url));
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