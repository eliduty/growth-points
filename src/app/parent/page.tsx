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
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-text">本周统计</h1>
          {weekRange && (
            <p className="text-sm text-text-secondary">
              {weekRange.start} ~ {weekRange.end}
            </p>
          )}
        </div>
        {isFetching && (
          <div className="flex items-center gap-1 mt-2 text-xs text-text-secondary">
            <RefreshCw className="w-3 h-3 animate-spin" />
            <span>刷新中...</span>
          </div>
        )}
      </motion.div>

      {/* 孩子概览卡片（横向滑动） */}
      <div className="mb-6">
        <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <div className="flex gap-4">
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
        </div>
      </div>

      {/* 滚动隐藏样式 */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}