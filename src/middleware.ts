import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData } from "@/types";
import { sessionOptions } from "@/lib/auth/session";

// 需要认证的路由
const protectedRoutes = {
  child: ["/child"],
  parent: ["/parent"],
  any: [], // 任何角色都可访问（暂无）
};

// 公开路由（无需认证）
const publicRoutes = ["/", "/login", "/register", "/parent/login", "/child/login"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 公开路由直接放行
  if (publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next();
  }

  // 获取 Session
  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(request, response, sessionOptions);

  // 未登录，跳转到对应登录页
  if (!session.userId) {
    // 根据访问路径判断跳转到哪个登录页
    if (pathname.startsWith("/child")) {
      const loginUrl = new URL("/child/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    if (pathname.startsWith("/parent")) {
      const loginUrl = new URL("/parent/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
    // 其他路径跳转到首页入口
    const homeUrl = new URL("/", request.url);
    return NextResponse.redirect(homeUrl);
  }

  // 孩子端路由检查（排除 /child/login）
  if (protectedRoutes.child.some((route) => pathname.startsWith(route))) {
    if (pathname === "/child/login") {
      return response; // 登录页已登录用户直接放行
    }
    if (session.role !== "CHILD") {
      // 家长访问孩子端，跳转到家长端
      const parentUrl = new URL("/parent", request.url);
      return NextResponse.redirect(parentUrl);
    }
  }

  // 家长端路由检查（排除 /parent/login）
  if (protectedRoutes.parent.some((route) => pathname.startsWith(route))) {
    if (pathname === "/parent/login") {
      return response; // 登录页已登录用户直接放行
    }
    if (session.role !== "PARENT") {
      // 孩子访问家长端，跳转到孩子端
      const childUrl = new URL("/child", request.url);
      return NextResponse.redirect(childUrl);
    }
  }

  return response;
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