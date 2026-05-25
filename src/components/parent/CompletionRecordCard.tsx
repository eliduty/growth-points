"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Clock, Star, Undo2 } from "lucide-react";
import type { CompletionRecord } from "@/types";
import { formatBeijingTime } from "@/lib/date";

interface CompletionRecordCardProps {
  record: CompletionRecord;
  onRevoke?: (record: CompletionRecord) => void;
  disabled?: boolean;
}

export function CompletionRecordCard({
  record,
  onRevoke,
  disabled = false,
}: CompletionRecordCardProps) {
  const isRevoked = record.revokedAt !== null;

  const handleUndoClick = () => {
    if (!isRevoked && onRevoke && !disabled) {
      onRevoke(record);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "relative rounded-xl p-4 border transition-all",
        isRevoked
          ? "bg-gray-50 border-gray-200 opacity-60"
          : "bg-card border-border hover:shadow-sm"
      )}
    >
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

        {/* 积分和撤销按钮 */}
        <div className="flex items-center gap-3">
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

          {/* 撤销按钮 */}
          {!isRevoked && onRevoke && (
            <button
              onClick={handleUndoClick}
              disabled={disabled}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all",
                "bg-white border border-gray-200 text-text-secondary",
                "hover:border-red-400 hover:text-red-500",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>撤销</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}