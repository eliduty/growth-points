"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  ListTodo,
  Gift,
  User,
  BarChart3,
  Settings,
} from "lucide-react";

interface BottomNavProps {
  role: "child" | "parent";
}

const childNavItems = [
  { href: "/child", label: "任务", icon: ListTodo },
  { href: "/child/gifts", label: "礼物", icon: Gift },
  { href: "/child/profile", label: "我的", icon: User },
];

const parentNavItems = [
  { href: "/parent", label: "统计", icon: BarChart3 },
  { href: "/parent/tasks", label: "任务", icon: ListTodo },
  { href: "/parent/gifts", label: "礼物", icon: Gift },
  { href: "/parent/settings", label: "设置", icon: Settings },
];

export default function BottomNav({ role }: BottomNavProps) {
  const pathname = usePathname();
  const navItems = role === "child" ? childNavItems : parentNavItems;

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-nav bg-card border-t border-border shadow-nav z-50">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "nav-item-active-indicator nav-item-float flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors",
                isActive ? "active text-primary" : "text-text-muted"
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
