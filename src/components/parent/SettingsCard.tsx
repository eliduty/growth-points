"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";

interface SettingsCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  icon?: LucideIcon;
  delay?: number;
}

export function SettingsCard({ title, children, className, icon: Icon, delay = 0 }: SettingsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className={cn(
        "bg-card rounded-2xl p-4 border border-border shadow-card",
        className
      )}
    >
      {/* 标题 */}
      <div className="flex items-center gap-2 text-base font-semibold text-text mb-4">
        {Icon && <Icon className="w-4 h-4 text-primary" />}
        {title}
      </div>

      {/* 内容 */}
      <div className="space-y-3">{children}</div>
    </motion.div>
  );
}