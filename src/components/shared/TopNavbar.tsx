"use client";

import { useRouter, usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useTopNavbar } from "@/providers/topnavbar-provider";

const TITLE_MAP: Record<string, string> = {
  "/parent": "统计",
  "/parent/tasks": "任务管理",
  "/parent/gifts": "礼物管理",
  "/parent/settings": "设置",
  "/child": "我的任务",
  "/child/gifts": "礼物兑换",
  "/child/profile": "个人中心",
};

// 动态路由标题匹配
function getTitleFromPathname(pathname: string): string | undefined {
  // /parent/stats/[childId] 详情页
  if (pathname.match(/^\/parent\/stats\/[^/]+$/)) {
    return "完成记录";
  }
  return TITLE_MAP[pathname];
}

export default function TopNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { config } = useTopNavbar();

  // 获取标题：优先使用页面设置的，否则使用路由映射
  const title = config.title ?? getTitleFromPathname(pathname) ?? "";

  const handleBack = () => {
    router.back();
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: "var(--nav-height)",
        background: "var(--topnav-bg)",
        boxShadow: "var(--topnav-shadow)",
      }}
    >
      <div className="flex items-center justify-between h-full px-4">
        {/* 返回按钮 */}
        <button
          onClick={handleBack}
          className="w-12 h-12 flex items-center justify-center rounded-lg transition-colors"
          style={{
            color: "var(--topnav-icon)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--topnav-hover)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
          }}
        >
          <ChevronLeft className="w-6 h-6" style={{ stroke: "var(--topnav-icon)" }} />
        </button>

        {/* 标题 */}
        <div
          className="text-lg font-semibold"
          style={{ color: "var(--topnav-text)" }}
        >
          {title}
        </div>

        {/* 右侧操作区域 */}
        <div className="w-12 h-12 flex items-center justify-center">
          {config.action}
        </div>
      </div>
    </header>
  );
}