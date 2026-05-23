"use client";

import { useParentStats } from "@/hooks/use-parent-stats";
import { ChildOverviewCard } from "@/components/parent/ChildOverviewCard";
import { motion } from "framer-motion";
import { RefreshCw, AlertCircle } from "lucide-react";

export default function ParentStatsPage() {
  const { weeklyStats, weekRange, children, isLoading, isError, error, refetch, isFetching } =
    useParentStats();

  // 加载状态
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-text-secondary">加载中...</p>
        </div>
      </div>
    );
  }

  // 错误状态
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-red-500 mb-4">{error?.message || "加载失败"}</p>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
          >
            <RefreshCw className="w-4 h-4" />
            重新加载
          </button>
        </div>
      </div>
    );
  }

  // 无数据状态
  if (!weeklyStats || children.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-text-secondary mb-2">暂无孩子数据</p>
          <p className="text-text-secondary text-sm">请先添加孩子成员</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* 本周日期范围 */}
      {weekRange && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              {weekRange.start} ~ {weekRange.end}
            </p>
            {isFetching && (
              <div className="flex items-center gap-1 text-xs text-text-secondary">
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>刷新中...</span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* 孩子概览卡片（垂直列表） */}
      <div className="space-y-6">
        {children.map((child, index) => (
          <motion.div
            key={child.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ChildOverviewCard
              child={child}
              weekRange={weekRange!}
            />
          </motion.div>
        ))}
      </div>

      {/* 操作提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center text-sm text-text-muted mt-8"
      >
        点击「查看详情」可查看孩子的完成记录
      </motion.div>
    </div>
  );
}