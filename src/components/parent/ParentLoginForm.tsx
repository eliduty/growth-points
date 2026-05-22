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
import { LogIn, UserPlus, Home, Info } from "lucide-react";

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

type Mode = "login" | "register";

interface ParentLoginFormProps {
  onSuccess?: () => void;
}

export default function ParentLoginForm({ onSuccess }: ParentLoginFormProps) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("login");
  const [isLoading, setIsLoading] = useState(false);

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

  // 切换模式时重置表单
  const switchMode = (newMode: Mode) => {
    setMode(newMode);
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

        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/parent");
        }
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
        toast.success("注册成功，已自动创建家庭");

        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/parent");
        }
      } else {
        toast.error(result.message || "注册失败");
      }
    } catch {
      toast.error("网络异常，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = loginForm;

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = registerForm;

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white rounded-2xl shadow-lg p-9 py-9 px-7">
      {/* Header */}
      <div className="text-center mb-9">
        {/* Logo Icon */}
        <div
          className="w-[72px] h-[72px] rounded-[18px] flex items-center justify-center mx-auto mb-5"
          style={{
            background: "linear-gradient(135deg, #5B7FFF 0%, #7B9FFF 100%)",
            boxShadow: "0 8px 24px rgba(91, 127, 255, 0.25)",
          }}
        >
          <Home className="w-9 h-9 text-white" strokeWidth={2} />
        </div>

        <h1 className="text-xl font-semibold text-text-primary mb-2">
          家庭积分兑换系统
        </h1>
        <p className="text-sm text-text-muted">
          {mode === "login" ? "家长端管理平台" : "创建新家庭"}
        </p>
      </div>

      {/* Form */}
      {mode === "login" ? (
        <form
          onSubmit={handleLoginSubmit(onLoginSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="login-username">用户名</Label>
            <Input
              id="login-username"
              {...loginRegister("username")}
              placeholder="请输入用户名"
              disabled={isLoading}
            />
            {loginErrors.username && (
              <p className="text-sm text-error">{loginErrors.username.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password">密码</Label>
            <Input
              id="login-password"
              type="password"
              {...loginRegister("password")}
              placeholder="请输入密码"
              disabled={isLoading}
            />
            {loginErrors.password && (
              <p className="text-sm text-error">{loginErrors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12"
            variant="default"
            size="lg"
            disabled={isLoading}
          >
            <LogIn className="w-5 h-5" />
            {isLoading ? "登录中..." : "登录"}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={handleRegisterSubmit(onRegisterSubmit)}
          className="space-y-6"
        >
          <div className="space-y-2">
            <Label htmlFor="register-username">用户名</Label>
            <Input
              id="register-username"
              {...registerRegister("username")}
              placeholder="请输入用户名"
              disabled={isLoading}
            />
            {registerErrors.username && (
              <p className="text-sm text-error">
                {registerErrors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-password">密码</Label>
            <Input
              id="register-password"
              type="password"
              {...registerRegister("password")}
              placeholder="请输入密码"
              disabled={isLoading}
            />
            {registerErrors.password && (
              <p className="text-sm text-error">
                {registerErrors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="register-confirmPassword">确认密码</Label>
            <Input
              id="register-confirmPassword"
              type="password"
              {...registerRegister("confirmPassword")}
              placeholder="请再次输入密码"
              disabled={isLoading}
            />
            {registerErrors.confirmPassword && (
              <p className="text-sm text-error">
                {registerErrors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12"
            variant="default"
            size="lg"
            disabled={isLoading}
          >
            <UserPlus className="w-5 h-5" />
            {isLoading ? "注册中..." : "注册"}
          </Button>
        </form>
      )}

      {/* Switch Mode */}
      <div className="text-center mt-7 pt-7 border-t border-[#E5E7EB]">
        <p className="text-sm text-[#9CA3AF]">
          {mode === "login" ? (
            <>
              没有账号？
              <button
                type="button"
                onClick={() => switchMode("register")}
                className="text-primary font-medium ml-1 inline-flex items-center gap-1 hover:text-primaryLight transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                注册
              </button>
            </>
          ) : (
            <>
              已有账号？
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="text-primary font-medium ml-1 inline-flex items-center gap-1 hover:text-primaryLight transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                登录
              </button>
            </>
          )}
        </p>
      </div>

      {/* Footer Tip */}
      <p className="text-xs text-[#9CA3AF] text-center mt-5 flex items-center justify-center gap-1.5">
        <Info className="w-3.5 h-3.5" />
        注册后自动创建家庭，成为创始家长
      </p>
    </div>
  );
}