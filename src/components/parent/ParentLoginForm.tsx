"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { LogIn, UserPlus } from "lucide-react";
import { useUser } from "@/hooks/use-user";
import { edgeFetch } from "@/lib/edge-fetch";

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

// 供父组件使用的回调类型
interface ParentLoginFormProps {
  onModeChange?: (mode: "login" | "register") => void;
}

export default function ParentLoginForm({ onModeChange }: ParentLoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState<"login" | "register">("login");
  const { setUser } = useUser();

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
    onModeChange?.(newMode);
  };

  // 登录提交
  const onLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      const timezoneOffset = -new Date().getTimezoneOffset() / 60;

      const response = await edgeFetch("/api/auth/login", {
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
        setUser(result.data);
        window.location.href = "/parent";
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
      const response = await edgeFetch("/api/auth/register", {
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
        setUser(result.data);
        window.location.href = "/parent";
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
    <div className="mt-7">
      {/* 登录表单 */}
      {currentMode === "login" && (
        <form
          onSubmit={loginForm.handleSubmit(onLoginSubmit)}
          className="space-y-[22px]"
        >
          <div className="space-y-[10px]">
            <label className="block text-sm text-[var(--text-primary)] font-medium">
              用户名
            </label>
            <input
              {...loginForm.register("username")}
              placeholder="请输入用户名"
              disabled={isLoading}
              className="w-full h-12 border border-[var(--border-color)] rounded-[8px] px-[18px] py-[14px] text-base font-[inherit] transition-all bg-[var(--bg-page)] focus:outline-none focus:border-[var(--color-primary)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(91,127,255,0.1)] placeholder:text-[var(--text-muted)]"
            />
            {loginForm.formState.errors.username && (
              <p className="text-sm text-error">
                {loginForm.formState.errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-[10px]">
            <label className="block text-sm text-[var(--text-primary)] font-medium">
              密码
            </label>
            <input
              type="password"
              {...loginForm.register("password")}
              placeholder="请输入密码"
              disabled={isLoading}
              className="w-full h-12 border border-[var(--border-color)] rounded-[8px] px-[18px] py-[14px] text-base font-[inherit] transition-all bg-[var(--bg-page)] focus:outline-none focus:border-[var(--color-primary)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(91,127,255,0.1)] placeholder:text-[var(--text-muted)]"
            />
            {loginForm.formState.errors.password && (
              <p className="text-sm text-error">
                {loginForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-primary-light)_100%)] border-none rounded-[8px] text-white text-base font-medium font-[inherit] cursor-pointer transition-all shadow-[0_4px_12px_rgba(91,127,255,0.2)] mt-2 flex items-center justify-center gap-[10px] relative overflow-hidden hover:translate-y-[-2px] hover:shadow-[0_6px_16px_rgba(91,127,255,0.25)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(91,127,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {/* 光泽效果 */}
            <span className="absolute top-0 left-[-100%] w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] group-hover:left-[100%] transition-[left_0.5s]" />
            <LogIn className="w-5 h-5" />
            {isLoading ? "登录中..." : "登录"}
          </button>
        </form>
      )}

      {/* 注册表单 */}
      {currentMode === "register" && (
        <form
          onSubmit={registerForm.handleSubmit(onRegisterSubmit)}
          className="space-y-[22px]"
        >
          <div className="space-y-[10px]">
            <label className="block text-sm text-[var(--text-primary)] font-medium">
              用户名
            </label>
            <input
              {...registerForm.register("username")}
              placeholder="请输入用户名"
              disabled={isLoading}
              className="w-full h-12 border border-[var(--border-color)] rounded-[8px] px-[18px] py-[14px] text-base font-[inherit] transition-all bg-[var(--bg-page)] focus:outline-none focus:border-[var(--color-primary)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(91,127,255,0.1)] placeholder:text-[var(--text-muted)]"
            />
            {registerForm.formState.errors.username && (
              <p className="text-sm text-error">
                {registerForm.formState.errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-[10px]">
            <label className="block text-sm text-[var(--text-primary)] font-medium">
              密码
            </label>
            <input
              type="password"
              {...registerForm.register("password")}
              placeholder="请输入密码（至少6位）"
              disabled={isLoading}
              className="w-full h-12 border border-[var(--border-color)] rounded-[8px] px-[18px] py-[14px] text-base font-[inherit] transition-all bg-[var(--bg-page)] focus:outline-none focus:border-[var(--color-primary)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(91,127,255,0.1)] placeholder:text-[var(--text-muted)]"
            />
            {registerForm.formState.errors.password && (
              <p className="text-sm text-error">
                {registerForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-[10px]">
            <label className="block text-sm text-[var(--text-primary)] font-medium">
              确认密码
            </label>
            <input
              type="password"
              {...registerForm.register("confirmPassword")}
              placeholder="请再次输入密码"
              disabled={isLoading}
              className="w-full h-12 border border-[var(--border-color)] rounded-[8px] px-[18px] py-[14px] text-base font-[inherit] transition-all bg-[var(--bg-page)] focus:outline-none focus:border-[var(--color-primary)] focus:bg-white focus:shadow-[0_0_0_3px_rgba(91,127,255,0.1)] placeholder:text-[var(--text-muted)]"
            />
            {registerForm.formState.errors.confirmPassword && (
              <p className="text-sm text-error">
                {registerForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-[linear-gradient(135deg,var(--color-primary)_0%,var(--color-primary-light)_100%)] border-none rounded-[8px] text-white text-base font-medium font-[inherit] cursor-pointer transition-all shadow-[0_4px_12px_rgba(91,127,255,0.2)] mt-2 flex items-center justify-center gap-[10px] relative overflow-hidden hover:translate-y-[-2px] hover:shadow-[0_6px_16px_rgba(91,127,255,0.25)] active:translate-y-0 active:shadow-[0_2px_8px_rgba(91,127,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {/* 光泽效果 */}
            <span className="absolute top-0 left-[-100%] w-full h-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] group-hover:left-[100%] transition-[left_0.5s]" />
            <UserPlus className="w-5 h-5" />
            {isLoading ? "注册中..." : "注册"}
          </button>
        </form>
      )}

      {/* 切换登录/注册 - 底部链接方式 */}
      <div className="text-center mt-7 pt-7 border-t border-[var(--border-color)]">
        <p className="text-sm text-[var(--text-muted)]">
          {currentMode === "login" ? (
            <>
              没有账号？
              <span
                onClick={() => switchMode("register")}
                className="text-[var(--color-primary)] font-medium cursor-pointer transition-color inline-flex items-center gap-1 hover:text-[var(--color-primary-light)]"
              >
                <UserPlus className="w-3.5 h-3.5" />
                注册
              </span>
            </>
          ) : (
            <>
              已有账号？
              <span
                onClick={() => switchMode("login")}
                className="text-[var(--color-primary)] font-medium cursor-pointer transition-color inline-flex items-center gap-1 hover:text-[var(--color-primary-light)]"
              >
                <LogIn className="w-3.5 h-3.5" />
                登录
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
