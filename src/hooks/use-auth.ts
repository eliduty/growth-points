"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";
import { Role } from "@/generated/prisma";
import { edgeFetch } from "@/lib/edge-fetch";

interface LoginInput {
  username: string;
  password: string;
}

interface RegisterInput {
  username: string;
  password: string;
}

/**
 * 认证相关 hook
 */
export function useAuth() {
  const router = useRouter();
  const { user, setUser, isLoading } = useUser();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  /**
   * 登录
   */
  const login = async (input: LoginInput) => {
    setIsLoggingIn(true);

    try {
      const timezoneOffset = -new Date().getTimezoneOffset() / 60;

      const response = await edgeFetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...input,
          timezoneOffset,
        }),
      });

      const result = await response.json();

      if (result.code === 0) {
        setUser(result.data);
        toast.success("登录成功");

        // 根据角色跳转
        if (result.data.role === "PARENT") {
          router.push("/parent");
        } else {
          router.push("/child");
        }

        return { success: true, data: result.data };
      } else {
        toast.error(result.message || "登录失败");
        return { success: false, error: result.message };
      }
    } catch {
      toast.error("网络异常，请重试");
      return { success: false, error: "网络异常" };
    } finally {
      setIsLoggingIn(false);
    }
  };

  /**
   * 注册
   */
  const register = async (input: RegisterInput) => {
    setIsRegistering(true);

    try {
      const response = await edgeFetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const result = await response.json();

      if (result.code === 0) {
        setUser(result.data);
        toast.success("注册成功");

        // 注册成功跳转到家长端
        router.push("/parent");

        return { success: true, data: result.data };
      } else {
        toast.error(result.message || "注册失败");
        return { success: false, error: result.message };
      }
    } catch {
      toast.error("网络异常，请重试");
      return { success: false, error: "网络异常" };
    } finally {
      setIsRegistering(false);
    }
  };

  /**
   * 登出
   */
  const logout = async () => {
    try {
      const response = await edgeFetch("/api/auth/logout", {
        method: "POST",
      });

      const result = await response.json();

      if (result.code === 0) {
        setUser(null);
        toast.info("已退出登录");
        // 根据角色跳转到对应登录页
        if (user?.role === "PARENT") {
          router.push("/parent/login");
        } else {
          router.push("/child/login");
        }

        return { success: true };
      } else {
        toast.error(result.message || "退出失败");
        return { success: false, error: result.message };
      }
    } catch {
      toast.error("网络异常，请重试");
      return { success: false, error: "网络异常" };
    }
  };

  return {
    user,
    isLoading,
    isLoggingIn,
    isRegistering,
    login,
    register,
    logout,
  };
}
