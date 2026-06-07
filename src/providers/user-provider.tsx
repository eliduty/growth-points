"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserInfo } from "@/types";
import { edgeFetch } from "@/lib/edge-fetch";

interface UserContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 页面加载时获取当前用户
    fetchCurrentUser();
  }, []);

  // 根据用户角色设置 html 的 data-role 属性
  useEffect(() => {
    if (user?.role) {
      const role = user.role === "CHILD" ? "child" : "parent";
      document.documentElement.setAttribute("data-role", role);
    } else {
      document.documentElement.removeAttribute("data-role");
    }
  }, [user?.role]);

  const fetchCurrentUser = async () => {
    try {
      const res = await edgeFetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
