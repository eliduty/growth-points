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
      {/* 背景纹理 */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF6B35' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* 登录容器 */}
      <div
        className="w-full max-w-[375px] bg-white rounded-[20px] p-9 relative z-10 animate-[fadeInScale_0.5s_ease-out]"
        style={{
          boxShadow:
            "0 8px 32px rgba(255, 107, 53, 0.12), 0 4px 8px rgba(255, 107, 53, 0.08)",
        }}
      >
        {/* 登录表单 */}
        <ChildLoginForm />
      </div>

      {/* 动画样式 */}
      <style jsx global>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}