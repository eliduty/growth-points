"use client";

import { useState } from "react";
import LoginForm from "@/components/shared/LoginForm";
import RegisterForm from "@/components/shared/RegisterForm";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="w-full max-w-md mx-auto p-8">
      {/* 标题 */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          家庭积分兑换系统
        </h1>
        <p className="text-sm text-text-secondary">
          通过积分机制激励孩子完成日常任务
        </p>
      </div>

      {/* 模式切换 */}
      <div className="bg-white rounded-card shadow-card p-6">
        <div className="flex mb-6">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-center font-medium rounded-lg transition-colors ${
              mode === "login"
                ? "bg-primary text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            登录
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2 text-center font-medium rounded-lg transition-colors ${
              mode === "register"
                ? "bg-primary text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            注册
          </button>
        </div>

        {/* 表单 */}
        {mode === "login" ? <LoginForm /> : <RegisterForm />}

        {/* 提示文字 */}
        <div className="mt-6 text-center text-sm text-text-secondary">
          {mode === "login" ? (
            <>
              没有账号？
              <button
                onClick={() => setMode("register")}
                className="text-primary hover:underline ml-1"
              >
                注册
              </button>
            </>
          ) : (
            <>
              已有账号？
              <button
                onClick={() => setMode("login")}
                className="text-primary hover:underline ml-1"
              >
                登录
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}