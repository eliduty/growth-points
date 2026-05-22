"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Smile, CheckCircle, Star } from "lucide-react";
import type { ChildStats } from "@/types";

interface ChildOverviewCardProps {
  child: ChildStats;
  weekRange: { start: string; end: string };
  isSelected?: boolean;
}

export function ChildOverviewCard({
  child,
  weekRange,
  isSelected = false,
}: ChildOverviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Link
        href={`/parent/stats/${child.id}`}
        className={cn(
          "block min-w-[150px] bg-card rounded-2xl p-[18px] shadow-card border cursor-pointer transition-all",
          isSelected
            ? "border-primary bg-gradient-to-br from-primary-light/10 to-primary/5 shadow-primary/15"
            : "border-border hover:shadow-lg"
        )}
      >
        {/* 孩子头像 */}
        <div
          className={cn(
            "w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-3",
            isSelected
              ? "bg-gradient-to-br from-primary-light/20 to-primary/10"
              : "bg-gradient-to-br from-primary-light/10 to-primary/5"
          )}
        >
          <Smile
            className={cn(
              "w-[18px] h-[18px]",
              isSelected ? "text-primary" : "text-primary"
            )}
          />
        </div>

        {/* 孩子名字 */}
        <div className="text-base font-semibold text-text text-center mb-[14px]">
          {child.username}
        </div>

        {/* 统计信息 */}
        <div className="flex flex-col gap-[10px]">
          {/* 完成数 */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-[6px] text-text-secondary">
              <CheckCircle className="w-[14px] h-[14px]" />
              <span>完成</span>
            </div>
            <div className="text-primary font-semibold">
              {child.weeklyCompleted} 个
            </div>
          </div>

          {/* 积分 */}
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-[6px] text-text-secondary">
              <Star className="w-[14px] h-[14px]" />
              <span>获得</span>
            </div>
            <div className="flex items-center gap-1 text-primary font-semibold">
              <Star className="w-[12px] h-[12px] fill-primary" />
              <span>+{child.weeklyPoints} 积分</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}