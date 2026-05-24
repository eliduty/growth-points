"use client";

import { useEffect } from "react";
import ChildLoginForm from "@/components/child/ChildLoginForm";

export default function ChildLoginPage() {
  // 设置 data-role='child' 以应用橙色主题
  useEffect(() => {
    document.documentElement.setAttribute("data-role", "child");
    return () => {
      document.documentElement.removeAttribute("data-role");
    };
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--bg-gradient)" }}
    >
      {/* 星星背景纹理 */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L32 25 L50 30 L32 35 L30 55 L28 35 L10 30 L28 25 Z' fill='%23FF6B35' fill-opacity='0.03'/%3E%3C/svg%3E\")",
        }}
      />

      {/* 登录容器 */}
      <div
        className="w-full max-w-[375px] bg-white rounded-[28px] p-10 relative z-10 animate-fade-up overflow-hidden"
        style={{
          boxShadow:
            "0 8px 32px rgba(255, 107, 53, 0.12), 0 4px 8px rgba(255, 107, 53, 0.08)",
        }}
      >
        {/* 卡片内部装饰星星 */}
        <div className="absolute top-4 left-5 animate-twinkle">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FFD93D">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
        <div className="absolute top-4 right-5 animate-twinkle" style={{ animationDelay: "0.5s" }}>
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#FFD93D">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-3 animate-twinkle" style={{ animationDelay: "1s" }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFD93D">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
        <div className="absolute bottom-20 right-3 animate-twinkle" style={{ animationDelay: "1.5s" }}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#FFD93D">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>

        {/* 登录表单 */}
        <ChildLoginForm />

        {/* 卡片底部渐变装饰条 */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[10px]"
          style={{
            background:
              "linear-gradient(90deg, #FF6B35 0%, #4ECDC4 33%, #FFD93D 66%, #FF6B35 100%)",
          }}
        />
      </div>
    </div>
  );
}