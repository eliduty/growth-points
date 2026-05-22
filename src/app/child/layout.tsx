"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import BottomNav from "@/components/shared/BottomNav";
import { useUser } from "@/hooks/use-user";

export default function ChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/child/login";
  const { user, isLoading } = useUser();

  // 孩子端统一设置 data-role
  useEffect(() => {
    // 如果用户已登录且是孩子，或者用户未登录（登录页），设置 child 主题
    if (!user || user.role === "CHILD") {
      document.documentElement.setAttribute("data-role", "child");
    }
  }, [user]);

  // 权限检查：非登录页需要孩子权限
  useEffect(() => {
    if (!isLoading && !isLoginPage) {
      if (!user) {
        // 未登录，重定向到孩子登录页
        router.replace("/child/login");
      } else if (user.role !== "CHILD") {
        // 不是孩子，重定向到对应端
        if (user.role === "PARENT") {
          router.replace("/parent");
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
    <div className="min-h-screen pb-nav" style={{ background: "var(--bg-gradient)" }}>
      {children}
      {!isLoginPage && <BottomNav role="child" />}
    </div>
  );
}
