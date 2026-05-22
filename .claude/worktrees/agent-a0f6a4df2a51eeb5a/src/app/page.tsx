"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // 已登录，根据角色跳转
        if (user.role === "PARENT") {
          router.replace("/parent");
        } else {
          router.replace("/child");
        }
      } else {
        // 未登录，跳转到登录页
        router.replace("/login");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-text-secondary">加载中...</p>
        </div>
      </div>
    );
  }

  return null;
}