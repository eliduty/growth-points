"use client";

import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { useParentStats } from "@/hooks/use-parent-stats";
import { useParentRewards } from "@/hooks/use-parent-rewards";
import { useConfirm } from "@/hooks/use-confirm";
import { CompletionRecordCard } from "@/components/parent/CompletionRecordCard";
import { RewardRecordCard } from "@/components/parent/RewardRecordCard";
import { RewardDialog } from "@/components/parent/RewardDialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { getWeekStart, formatBeijingDate } from "@/lib/date";
import { RefreshCw, AlertCircle, Gift } from "lucide-react";

type MixedRecord = {
  id: string;
  type: "completion" | "reward";
  points: number;
  createdAt: string;
  // 任务完成特有
  taskName?: string;
  revokedAt?: string | null;
  // 奖励特有
  reason?: string;
};

export default function ChildStatsDetailPage() {
  const params = useParams();
  const childId = params.childId as string;

  const { children, weekRange, isLoading, isError, error, refetch, revokeCompletion, isRevoking } =
    useParentStats();

  const { confirmState, showConfirm } = useConfirm();

  // 奖励弹窗状态
  const [showRewardDialog, setShowRewardDialog] = useState(false);

  // 找到当前孩子
  const child = children.find((c) => c.id === childId);
  const completions = child?.completions || [];

  // 当前周 weekStart（与 API 相同的归一化函数，保证周口径一致）
  const weekStart = useMemo(() => formatBeijingDate(getWeekStart()), []);

  const { rewards, isLoading: rewardsLoading, createReward, isCreating } = useParentRewards({
    userId: childId,
    weekStart,
  });

  // 合并任务完成和奖励记录，按时间排序
  const mixedRecords = useMemo(() => {
    const completionRecords: MixedRecord[] = completions.map((c) => ({
      id: c.id,
      type: "completion" as const,
      points: c.points,
      createdAt: c.completedAt,
      taskName: c.taskName,
      revokedAt: c.revokedAt,
    }));

    const rewardRecords: MixedRecord[] = rewards.map((r) => ({
      id: r.id,
      type: "reward" as const,
      points: r.points,
      createdAt: r.createdAt,
      reason: r.reason,
    }));

    return [...completionRecords, ...rewardRecords].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [completions, rewards]);

  // 统计数据：直接采用 /api/parent/stats 的本周口径（与首页一致，单一事实来源）
  const weeklyCompleted = child?.weeklyCompleted ?? 0;
  const weeklyRewardsCount = child?.weeklyRewards ?? 0;
  const weeklyPoints = child?.weeklyPoints ?? 0;

  // 处理撤销
  const handleRevoke = async (record: { id: string; taskName: string; points: number }) => {
    const confirmed = await showConfirm({
      title: "撤销完成记录",
      content: `任务「${record.taskName}」将扣回 ${record.points} 积分，确定要撤销吗？`,
      confirmText: "确认撤销",
      cancelText: "取消",
      destructive: true,
    });

    if (confirmed) {
      revokeCompletion(record.id);
    }
  };

  // 处理奖励
  const handleReward = async (data: { points: number; reason: string }) => {
    createReward({
      userId: childId,
      points: data.points,
      reason: data.reason,
    });
  };

  // 加载状态
  if (isLoading || rewardsLoading) {
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
      {/* 孩子信息 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-xl font-bold text-text mb-2">{child.username}</h1>
        {weekRange && (
          <p className="text-sm text-text-secondary">
            {weekRange.start} ~ {weekRange.end}
          </p>
        )}
      </motion.div>

      {/* 奖励积分按钮 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-4"
      >
        <button
          onClick={() => setShowRewardDialog(true)}
          className={cn(
            "w-full h-12 rounded-button text-base font-semibold transition-all",
            "flex items-center justify-center gap-2",
            "bg-secondary text-white shadow-md hover:bg-secondary/80"
          )}
        >
          <Gift className="w-5 h-5" />
          奖励积分
        </button>
      </motion.div>

      {/* 完成记录列表 */}
      {mixedRecords.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <p className="text-text-secondary">本周暂无记录</p>
        </motion.div>
      ) : (
        <>
          <div className="space-y-3">
            {mixedRecords.map((record, index) => (
              <motion.div
                key={`${record.type}-${record.id}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {record.type === "completion" ? (
                  <CompletionRecordCard
                    record={{
                      id: record.id,
                      taskName: record.taskName || "",
                      points: record.points,
                      completedAt: record.createdAt,
                      revokedAt: record.revokedAt,
                    }}
                    onRevoke={handleRevoke}
                    disabled={isRevoking}
                  />
                ) : (
                  <RewardRecordCard
                    record={{
                      id: record.id,
                      points: record.points,
                      reason: record.reason || "",
                      createdAt: record.createdAt,
                    }}
                  />
                )}
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
              本周完成 <span className="font-bold text-primary">{weeklyCompleted}</span> 个任务，
              奖励 <span className="font-bold text-secondary">{weeklyRewardsCount}</span> 次
            </p>
            <p className="text-sm text-text-secondary mt-1">
              共获得 <span className="font-bold text-primary">{weeklyPoints}</span> 积分
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

      {/* 奖励弹窗 */}
      <RewardDialog
        isOpen={showRewardDialog}
        onClose={() => setShowRewardDialog(false)}
        onSubmit={handleReward}
        childName={child.username}
      />
    </div>
  );
}