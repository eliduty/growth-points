"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Clock, Star, Gift } from "lucide-react";
import { formatBeijingTime } from "@/lib/date";

interface RewardRecordCardProps {
  record: {
    id: string;
    points: number;
    reason: string;
    createdAt: string;
  };
}

export function RewardRecordCard({ record }: RewardRecordCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="relative rounded-xl p-4 border bg-secondary/5 border-secondary/30 hover:shadow-sm"
    >
      {/* 家长奖励标记 */}
      <div className="absolute top-2 right-2 flex items-center gap-1 text-secondary">
        <Gift className="w-3 h-3" />
        <span className="text-xs">家长奖励</span>
      </div>

      {/* 原因 */}
      <div className="text-base font-medium mb-2 text-text">
        {record.reason}
      </div>

      {/* 信息行 */}
      <div className="flex items-center justify-between">
        {/* 奖励时间 */}
        <div className="flex items-center gap-1.5 text-sm text-text-secondary">
          <Clock className="w-3.5 h-3.5" />
          <span>{record.createdAt}</span>
        </div>

        {/* 积分 */}
        <div className="flex items-center gap-1 text-sm font-semibold text-secondary">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>+{record.points}</span>
        </div>
      </div>
    </motion.div>
  );
}