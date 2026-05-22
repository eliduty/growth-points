"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface SettingsCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function SettingsCard({ title, children, className }: SettingsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-card rounded-2xl p-4 border border-border shadow-card",
        className
      )}
    >
      {/* 标题 */}
      <div className="text-base font-semibold text-text mb-4">{title}</div>

      {/* 内容 */}
      <div className="space-y-3">{children}</div>
    </motion.div>
  );
}