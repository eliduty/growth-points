"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { useParentStats } from "@/hooks/use-parent-stats";
import { useConfirm } from "@/hooks/use-confirm";
import { CompletionRecordCard } from "@/components/parent/CompletionRecordCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, AlertCircle, Undo2, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

export default function ChildStatsDetailPage() {
  const params = useParams();
  const childId = params.childId as string;

  const { children, weekRange, isLoading, isError, error, refetch, revokeCompletion, isRevoking } =
    useParentStats();

  const { confirmState, showConfirm } = useConfirm();

  // 找到当前孩子
  const child = children.find((c) => c.id === childId);
  const completions = child?.completions || [];

  // 按时间倒序排序
  const sortedCompletions = [...completions].sort(
    (a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
  );

  // 处理撤销
  const handleRevoke = async (completionId: string) => {
    const confirmed = await showConfirm({
      title: "撤销完成记录",
      content: "撤销后，该任务积分将被扣除。确定要撤销吗？",
      confirmText: "确认撤销",
      cancelText: "取消",
      destructive: true,
    });

    if (confirmed) {
      revokeCompletion(completionId);
    }
  };

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
      <div className="p-4">
        <Link
          href="/parent"
          className="flex items-center gap-2 text-text-secondary mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回</span>
        </Link>
        <div className="flex items-center justify-center min-h-[40vh]">
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
      </div>
    );
  }

  // 孩子不存在
  if (!child) {
    return (
      <div className="p-4">
        <Link
          href="/parent"
          className="flex items-center gap-2 text-text-secondary mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回</span>
        </Link>
        <div className="flex items-center justify-center min-h-[40vh]">
          <div className="text-center">
            <p className="text-text-secondary">孩子不存在或已被删除</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* 返回按钮 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-6"
      >
        <Link
          href="/parent"
          className="flex items-center gap-2 text-text-secondary hover:text-text transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回</span>
        </Link>
      </motion.div>

      {/* 孩子信息 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-xl font-bold text-text mb-2">{child.username} 的完成记录</h1>
        {weekRange && (
          <p className="text-sm text-text-secondary">
            {weekRange.start} ~ {weekRange.end}
          </p>
        )}
      </motion.div>

      {/* 撤销提示 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100"
      >
        <div className="flex items-center gap-2 text-blue-600">
          <Info className="w-4 h-4" />
          <span className="text-sm">长按记录可撤销完成</span>
        </div>
      </motion.div>

      {/* 完成记录列表 */}
      {sortedCompletions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <p className="text-text-secondary">本周暂无完成记录</p>
        </motion.div>
      ) : (
        <>
          <div className="space-y-3">
            {sortedCompletions.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <CompletionRecordCard
                  record={record}
                  onRevoke={handleRevoke}
                  disabled={isRevoking}
                />
              </motion.div>
            ))}
          </div>

          {/* 底部统计 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 pt-4 border-t border-border text-center"
          >
            <p className="text-base text-text-secondary">
              本周共完成 <span className="font-bold text-primary">{sortedCompletions.length}</span> 个任务
            </p>
          </motion.div>
        </>
      )}

      {/* 确认弹窗 */}
      {confirmState && (
        <Dialog open={confirmState.isOpen} onOpenChange={(open) => !open && confirmState.onCancel()}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle className={cn(confirmState.destructive && "text-red-600")}>
                {confirmState.title}
              </DialogTitle>
              {confirmState.content && (
                <DialogDescription>{confirmState.content}</DialogDescription>
              )}
            </DialogHeader>
            <DialogFooter className="flex gap-2">
              <button
                onClick={confirmState.onCancel}
                className="px-4 py-2 text-text-secondary border border-border rounded-lg hover:bg-gray-50 transition-colors"
              >
                {confirmState.cancelText}
              </button>
              <button
                onClick={confirmState.onConfirm}
                className={cn(
                  "px-4 py-2 rounded-lg transition-colors",
                  confirmState.destructive
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-primary text-white hover:bg-primary/90"
                )}
              >
                {confirmState.confirmText}
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}