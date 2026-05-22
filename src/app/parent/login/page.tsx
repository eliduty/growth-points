"use client";

import { useEffect } from "react";
import ParentLoginForm from "@/components/parent/ParentLoginForm";
import { Home, Info } from "lucide-react";

export default function ParentLoginPage() {
  // 设置 data-role='parent' 以应用蓝色主题
  useEffect(() => {
    document.documentElement.setAttribute("data-role", "parent");
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
            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235B7FFF' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        }}
      />

      {/* 登录容器 */}
      <div
        className="w-full max-w-[375px] bg-white rounded-[20px] p-9 relative z-10 animate-[fadeInScale_0.5s_ease-out]"
        style={{
          boxShadow:
            "0 8px 32px rgba(91, 127, 255, 0.12), 0 4px 8px rgba(91, 127, 255, 0.08)",
        }}
      >
        {/* Logo 区域 */}
        <div className="text-center mb-9">
          {/* Logo Icon */}
          <div
            className="w-[72px] h-[72px] rounded-[18px] flex items-center justify-center mx-auto mb-5 relative overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)",
              boxShadow:
                "0 8px 24px rgba(91, 127, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            }}
          >
            {/* 光泽效果 */}
            <div
              className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)",
              }}
            />
            <Home className="w-9 h-9 text-white" />
          </div>

          {/* 标题 */}
          <h1 className="text-[22px] font-semibold text-[var(--text-primary)] mb-2 tracking-wide">
            家庭积分兑换系统
          </h1>
          <p className="text-sm text-[var(--text-muted)]">家长端管理平台</p>
        </div>

        {/* 登录表单 */}
        <ParentLoginForm />

        {/* 底部提示 */}
        <div className="mt-7 text-center flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
          <Info className="w-3.5 h-3.5" />
          <span>注册后自动创建家庭，成为创始家长</span>
        </div>
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