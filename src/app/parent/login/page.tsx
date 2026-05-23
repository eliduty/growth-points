"use client";

import { useEffect, useState } from "react";
import ParentLoginForm from "@/components/parent/ParentLoginForm";
import { Home, Info } from "lucide-react";

export default function ParentLoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  // 设置 data-role='parent' 以应用蓝色主题
  useEffect(() => {
    document.documentElement.setAttribute("data-role", "parent");
    return () => {
      document.documentElement.removeAttribute("data-role");
    };
  }, []);

  // 副标题根据模式动态变化
  const subtitle = mode === "login" ? "家长端管理平台" : "创建新家庭";

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
        className="w-full max-w-[375px] bg-white rounded-[20px] p-9 relative z-10 animate-fade-up"
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
          {/* 副标题 - 动态变化 */}
          <p className="text-sm text-[var(--text-muted)] transition-all">{subtitle}</p>
        </div>

        {/* 登录表单 */}
        <ParentLoginForm onModeChange={setMode} />

        {/* 底部提示 */}
        <div className="mt-5 text-center flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
          <Info className="w-3.5 h-3.5" />
          <span>注册后自动创建家庭，成为创始家长</span>
        </div>
      </div>
    </div>
  );
}