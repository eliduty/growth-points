"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { LucideIcon } from "lucide-react";

interface SettingsCardProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SettingsCard({
  title,
  icon: Icon,
  children,
  className,
  delay = 0,
}: SettingsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className={cn(
        "bg-white rounded-xl border border-[rgba(91,127,255,0.08)] shadow-[0_2px_8px_rgba(91,127,255,0.08),0_1px_2px_rgba(91,127,255,0.04)] overflow-hidden",
        className
      )}
    >
      {/* 标题栏 - 渐变背景 */}
      <div
        className="px-4 py-3 bg-gradient-to-r from-[#F9FAFB] to-[#F5F7FF] border-b border-[rgba(91,127,255,0.08)]
          flex items-center gap-2 text-[15px] font-semibold text-[#1F2937]"
      >
        {Icon && <Icon className="w-[18px] h-[18px] text-[#5B7FFF]" strokeWidth={2} />}
        {title}
      </div>

      {/* 内容 */}
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
