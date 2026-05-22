"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { LogIn, UserPlus } from "lucide-react";

// 登录表单验证
const loginSchema = z.object({
  username: z.string().min(1, "请输入用户名"),
  password: z.string().min(1, "请输入密码"),
});

// 注册表单验证
const registerSchema = z
  .object({
    username: z
      .string()
      .min(2, "用户名至少2个字符")
      .max(20, "用户名最多20个字符")
      .regex(/^[一-龥a-zA-Z0-9]+$/, "用户名只能包含中文、英文、数字"),
    password: z.string().min(6, "密码至少6位").max(32, "密码最多32位"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次密码不一致",
    path: ["confirmPassword"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export default function ParentLoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<"login" | "register">("login");

  // 登录表单
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 注册表单
  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  // 切换模式
  const switchMode = (newMode: "login" | "register") => {
    setCurrentMode(newMode);
    loginForm.reset();
    registerForm.reset();
  };

  // 登录提交
  const onLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const timezoneOffset = -new Date().getTimezoneOffset() / 60;

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          timezoneOffset,
        }),
      });

      const result = await response.json();

      if (result.code === 0) {
        toast.success("登录成功");
        router.push("/parent");
      } else {
        toast.error(result.message || "登录失败");
      }
    } catch {
      toast.error("网络异常，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  // 注册提交
  const onRegisterSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (result.code === 0) {
        toast.success("注册成功");
        router.push("/parent");
      } else {
        toast.error(result.message || "注册失败");
      }
    } catch {
      toast.error("网络异常，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 模式切换按钮 */}
      <div className="flex gap-2">
        <button
          onClick={() => switchMode("login")}
          className={`flex-1 py-2.5 text-center font-medium rounded-lg transition-all ${
            currentMode === "login"
              ? "bg-[var(--color-primary)] text-white shadow-sm"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-page)]"
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <LogIn className="w-4 h-4" />
            登录
          </span>
        </button>
        <button
          onClick={() => switchMode("register")}
          className={`flex-1 py-2.5 text-center font-medium rounded-lg transition-all ${
            currentMode === "register"
              ? "bg-[var(--color-primary)] text-white shadow-sm"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-page)]"
          }`}
        >
          <span className="inline-flex items-center gap-2">
            <UserPlus className="w-4 h-4" />
            注册
          </span>
        </button>
      </div>

      {/* 登录表单 */}
      {currentMode === "login" && (
        <form
          onSubmit={loginForm.handleSubmit(onLoginSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="login-username">用户名</Label>
            <Input
              id="login-username"
              {...loginForm.register("username")}
              placeholder="请输入用户名"
              disabled={isLoading}
              className="h-12 rounded-lg border-[var(--border-color)] bg-[var(--bg-page)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/10"
            />
            {loginForm.formState.errors.username && (
              <p className="text-sm text-error">
                {loginForm.formState.errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password">密码</Label>
            <Input
              id="login-password"
              type="password"
              {...loginForm.register("password")}
              placeholder="请输入密码"
              disabled={isLoading}
              className="h-12 rounded-lg border-[var(--border-color)] bg-[var(--bg-page)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/10"
            />
            {loginForm.formState.errors.password && (
              <p className="text-sm text-error">
                {loginForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-primary to-primaryLight hover:opacity-90 rounded-lg shadow-sm"
            size="lg"
            disabled={isLoading}
          >
            <span className="inline-flex items-center gap-2">
              <LogIn className="w-5 h-5" />
              {isLoading ? "登录中..." : "登录"}
            </span>
          </Button>
        </form>
      )}

      {/* 注册表单 */}
      {currentMode === "register" && (
        <form
          onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
          className="space-y-5"
        >
          <div className="space-y-2">
            <Label htmlFor="register-username">用户名</Label>
            <Input
              id="register-username"
              {...registerForm.register("username")}
              placeholder="请输入用户名"
              disabled={isLoading}
              className="h-12 rounded-lg border-[var(--border-color)] bg-[var(--bg-page)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/10"
            />
            {registerForm.formState.errors.username && (
              <p className="text-sm text-error">
                {registerForm.formState.errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password">密码</Label>
            <Input
              id="register-password"
              type="password"
              {...registerForm.register("password")}
              placeholder="请输入密码（至少6位）"
              disabled={isLoading}
              className="h-12 rounded-lg border-[var(--border-color)] bg-[var(--bg-page)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/10"
            />
            {registerForm.formState.errors.password && (
              <p className="text-sm text-error">
                {registerForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-confirmPassword">确认密码</Label>
            <Input
              id="register-confirmPassword"
              type="password"
              {...registerForm.register("confirmPassword")}
              placeholder="请再次输入密码"
              disabled={isLoading}
              className="h-12 rounded-lg border-[var(--border-color)] bg-[var(--bg-page)] focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]/10"
            />
            {registerForm.formState.errors.confirmPassword && (
              <p className="text-sm text-error">
                {registerForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-primary to-primaryLight hover:opacity-90 rounded-lg shadow-sm"
            size="lg"
            disabled={isLoading}
          >
            <span className="inline-flex items-center gap-2">
              <UserPlus className="w-5 h-5" />
              {isLoading ? "注册中..." : "注册"}
            </span>
          </Button>
        </form>
      )}
    </div>
  );
}