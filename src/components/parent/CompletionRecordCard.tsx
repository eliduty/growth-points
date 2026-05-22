"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Clock, Star, Undo2 } from "lucide-react";
import { useLongPress } from "@/hooks/use-long-press";
import type { CompletionRecord } from "@/types";
import { formatBeijingTime } from "@/lib/date";

interface CompletionRecordCardProps {
  record: CompletionRecord;
  onRevoke?: (id: string) => void;
  disabled?: boolean;
}

export function CompletionRecordCard({
  record,
  onRevoke,
  disabled = false,
}: CompletionRecordCardProps) {
  const isRevoked = record.revokedAt !== null;

  const { isPressed, handlers } = useLongPress({
    onLongPress: () => {
      if (!isRevoked && onRevoke && !disabled) {
        onRevoke(record.id);
      }
    },
    delay: 800,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative rounded-xl p-4 border transition-all",
        isRevoked
          ? "bg-gray-50 border-gray-200 opacity-60"
          : isPressed
            ? "bg-red-50 border-red-300 scale-[0.98]"
            : "bg-card border-border hover:shadow-sm"
      )}
      {...handlers}
    >
      {/* 长按提示 */}
      {!isRevoked && !disabled && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isPressed ? 1 : 0 }}
          className="absolute inset-0 flex items-center justify-center bg-red-100/80 rounded-xl"
        >
          <div className="flex items-center gap-2 text-red-600">
            <Undo2 className="w-5 h-5" />
            <span className="text-sm font-medium">松开撤销</span>
          </div>
        </motion.div>
      )}

      {/* 已撤销标记 */}
      {isRevoked && (
        <div className="absolute top-2 right-2 flex items-center gap-1 text-gray-500">
          <Undo2 className="w-3 h-3" />
          <span className="text-xs">已撤销</span>
        </div>
      )}

      {/* 任务名称 */}
      <div
        className={cn(
          "text-base font-medium mb-2",
          isRevoked ? "text-gray-500" : "text-text"
        )}
      >
        {record.taskName}
      </div>

      {/* 信息行 */}
      <div className="flex items-center justify-between">
        {/* 完成时间 */}
        <div className="flex items-center gap-1.5 text-sm text-text-secondary">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatBeijingTime(record.completedAt)}</span>
        </div>

        {/* 积分 */}
        <div
          className={cn(
            "flex items-center gap-1 text-sm font-semibold",
            isRevoked ? "text-gray-500" : "text-primary"
          )}
        >
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>+{record.points}</span>
        </div>
      </div>
    </motion.div>
  );
}