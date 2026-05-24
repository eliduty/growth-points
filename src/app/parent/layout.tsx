"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import BottomNav from "@/components/shared/BottomNav";
import TopNavbar from "@/components/shared/TopNavbar";
import { TopNavbarProvider } from "@/providers/topnavbar-provider";
import { useUser } from "@/hooks/use-user";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/parent/login";
  const { user, isLoading } = useUser();

  // 家长端统一设置 data-role
  useEffect(() => {
    // 如果用户已登录且是家长，或者用户未登录（登录页），设置 parent 主题
    if (!user || user.role === "PARENT") {
      document.documentElement.setAttribute("data-role", "parent");
    }
  }, [user]);

  // 权限检查：非登录页需要家长权限
  useEffect(() => {
    if (!isLoading && !isLoginPage) {
      if (!user) {
        // 未登录，重定向到家长登录页
        router.replace("/parent/login");
      } else if (user.role !== "PARENT") {
        // 不是家长，重定向到对应端
        if (user.role === "CHILD") {
          router.replace("/child");
        }
      }
    }
  }, [user, isLoading, isLoginPage, router]);

  // 加载中显示骨架
  if (isLoading && !isLoginPage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <TopNavbarProvider>
      <div className={isLoginPage ? "min-h-screen" : "min-h-screen pb-nav pt-topnav"} style={{ background: "var(--bg-gradient)" }}>
        {!isLoginPage && <TopNavbar />}
        {children}
        {!isLoginPage && <BottomNav role="parent" />}
      </div>
    </TopNavbarProvider>
  );
}
