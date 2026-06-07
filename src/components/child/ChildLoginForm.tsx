"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";

const loginSchema = z.object({
  username: z.string().min(1, "请输入用户名"),
  password: z.string().min(1, "请输入密码"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function ChildLoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // 获取当前时区偏移量
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
        setUser(result.data);
        window.location.href = "/child";
      } else {
        toast.error(result.message || "登录失败");
      }
    } catch {
      toast.error("网络异常，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[375px] mx-auto">
      {/* 顶部装饰 */}
      <div className="text-center mb-7">
        <div className="flex justify-center gap-10 mb-5">
          {/* 礼物图标 */}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary to-primaryLight shadow-[0_4px_12px_rgba(255,107,53,0.3)] animate-bounce">
            <svg
              className="w-8 h-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="3" y="8" width="18" height="4" rx="1" />
              <path d="M12 8v13" />
              <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7" />
              <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5" />
            </svg>
          </div>
          {/* 奖杯图标 */}
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-amber-400 to-amber-300 shadow-[0_4px_12px_rgba(255,217,61,0.3)] animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            <svg
              className="w-8 h-8 text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
              <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
              <path d="M4 22h16" />
              <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
              <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
              <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-primary mb-2">
          家庭积分兑换系统
        </h1>
        <p className="text-sm text-text-secondary">孩子端登录</p>
      </div>

      {/* 登录表单 */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="username">用户名</Label>
          <Input
            id="username"
            {...register("username")}
            placeholder="请输入用户名"
            disabled={isLoading}
            className="h-[50px] rounded-[14px] border-2 border-border bg-background focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,107,53,0.1)]"
          />
          {errors.username && (
            <p className="text-sm text-error">{errors.username.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">密码</Label>
          <Input
            id="password"
            type="password"
            {...register("password")}
            placeholder="请输入密码"
            disabled={isLoading}
            className="h-[50px] rounded-[14px] border-2 border-border bg-background focus:border-primary focus:bg-white focus:shadow-[0_0_0_4px_rgba(255,107,53,0.1)]"
          />
          {errors.password && (
            <p className="text-sm text-error">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-[50px] rounded-[14px] bg-gradient-to-r from-primary to-primaryLight text-white font-semibold text-lg shadow-[0_4px_16px_rgba(255,107,53,0.25)] hover:shadow-[0_6px_20px_rgba(255,107,53,0.35)] hover:translate-y-[-2px] active:translate-y-0 active:scale-[0.98] active:shadow-[0_2px_8px_rgba(255,107,53,0.2)] shine-effect"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? "登录中..." : "登录"}
        </Button>
      </form>

      {/* 激励标语 */}
      <div className="mt-7 text-center p-5 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl border border-orange-200">
        <p className="text-sm text-primary leading-relaxed">
          完成任务，赚取积分，兑换心仪礼物！
          <br />
          加油，小小努力家！
        </p>
      </div>
    </div>
  );
}