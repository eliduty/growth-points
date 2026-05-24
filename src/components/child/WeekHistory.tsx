"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CheckCircle2, Gift, Clock, Calendar, Star, Sparkles } from "lucide-react";

interface CompletionItem {
  id: string;
  taskName: string;
  points: number;
  completedAt: string;
  revoked: boolean;
}

interface RedemptionItem {
  id: string;
  giftName: string;
  giftColor: string | null;
  points: number;
  redeemedAt: string;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  confirmedAt?: string;
  cancelledAt?: string;
}

interface RewardItem {
  id: string;
  points: number;
  reason: string;
  createdAt: string;
}

// 混合项类型
interface MixedCompletionItem extends CompletionItem {
  itemType: "completion";
  sortTime: number;
}

interface MixedRewardItem extends RewardItem {
  itemType: "reward";
  sortTime: number;
}

type MixedItem = MixedCompletionItem | MixedRewardItem;

interface WeekData {
  weekRange: { start: string; end: string };
  completions?: CompletionItem[];
  redemptions?: RedemptionItem[];
  rewards?: RewardItem[];
  summary: {
    completed?: number;
    points?: number;
    confirmed?: number;
    pointsSpent?: number;
    pending?: number;
    rewards?: number;
    rewardPoints?: number;
  };
}

interface WeekHistoryProps {
  weekData: WeekData;
  type: "completions" | "redemptions";
  isExpanded: boolean;
  onToggle: () => void;
}

export default function WeekHistory({ weekData, type, isExpanded, onToggle }: WeekHistoryProps) {
  const { weekRange, summary } = weekData;

  // 对于 completions tab，需要混合展示任务完成和奖励记录
  const getMixedItems = (): MixedItem[] | null => {
    if (type !== "completions") return null;

    const completions: MixedCompletionItem[] = (weekData.completions || []).map((c) => ({
      ...c,
      itemType: "completion" as const,
      sortTime: new Date(c.completedAt).getTime(),
    }));

    const rewards: MixedRewardItem[] = (weekData.rewards || []).map((r) => ({
      ...r,
      itemType: "reward" as const,
      sortTime: new Date(r.createdAt).getTime(),
    }));

    return [...completions, ...rewards].sort((a, b) => b.sortTime - a.sortTime);
  };

  const items = type === "completions" ? getMixedItems() : weekData.redemptions;

  const formatWeekLabel = () => {
    const start = new Date(weekRange.start);
    const end = new Date(weekRange.end);
    const now = new Date();
    const currentWeekStart = new Date(now);
    currentWeekStart.setDate(now.getDate() - now.getDay() + (now.getDay() === 0 ? -6 : 1));

    const isCurrentWeek = start.toDateString() === currentWeekStart.toDateString();

    if (isCurrentWeek) {
      return "本周";
    }

    const weekAgo = Math.floor((now.getTime() - start.getTime()) / (7 * 24 * 60 * 60 * 1000));
    if (weekAgo === 1) {
      return "上周";
    }

    return `${start.getMonth() + 1}月${start.getDate()}日 - ${end.getMonth() + 1}月${end.getDate()}日`;
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      {/* 周标题栏 */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <Calendar className="w-4 h-4 text-primary" />
          <span className="font-semibold text-gray-900">{formatWeekLabel()}</span>
          <span className="text-sm text-gray-500">
            {weekRange.start} ~ {weekRange.end}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* 统计汇总 */}
          <div className="flex items-center gap-4 text-sm">
            {type === "completions" ? (
              <>
                <span className="text-gray-600">
                  完成 <span className="font-semibold text-[#4ECDC4]">{summary.completed}</span> 个任务
                </span>
                {summary.rewards && summary.rewards > 0 && (
                  <span className="text-gray-600">
                    奖励 <span className="font-semibold text-secondary">{summary.rewards}</span> 次
                  </span>
                )}
                <span className="text-gray-600">
                  获得 <span className="font-semibold text-[#FF6B35]">{(summary.points || 0) + (summary.rewardPoints || 0)}</span> 积分
                </span>
              </>
            ) : (
              <>
                <span className="text-gray-600">
                  已确认 <span className="font-semibold text-[#4ECDC4]">{summary.confirmed}</span> 个
                </span>
                <span className="text-gray-600">
                  消耗 <span className="font-semibold text-[#FF6B35]">{summary.pointsSpent}</span> 积分
                </span>
                {summary.pending && summary.pending > 0 && (
                  <span className="text-gray-600">
                    待确认 <span className="font-semibold text-amber-500">{summary.pending}</span> 个
                  </span>
                )}
              </>
            )}
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-100"
          >
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </motion.div>
        </div>
      </button>

      {/* 详细列表 */}
      <AnimatePresence>
        {isExpanded && items && items.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-100"
          >
            <div className="p-4 space-y-3">
              {type === "completions"
                ? ((items as MixedItem[]) || []).map((item) => (
                    item.itemType === "completion" ? (
                      // 任务完成记录
                      <div
                        key={`completion-${item.id}`}
                        className="flex items-center justify-between bg-gradient-to-r from-[#E8F8F5] to-[#F0FAF8] rounded-xl p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              item.revoked ? "bg-gray-200" : "bg-[#4ECDC4]/10"
                            }`}
                          >
                            <CheckCircle2
                              className={`w-4 h-4 ${item.revoked ? "text-gray-400" : "text-[#4ECDC4]"}`}
                            />
                          </div>
                          <div>
                            <p
                              className={`font-medium ${
                                item.revoked ? "text-gray-400 line-through" : "text-gray-900"
                              }`}
                            >
                              {item.taskName}
                            </p>
                            <p className="text-xs text-gray-500">{item.completedAt}</p>
                          </div>
                        </div>
                        <span
                          className={`font-semibold ${
                            item.revoked ? "text-gray-400" : "text-[#FF6B35]"
                          }`}
                        >
                          {item.revoked ? "" : "+"}
                          {item.points} 积分
                        </span>
                      </div>
                    ) : (
                      // 奖励记录
                      <div
                        key={`reward-${item.id}`}
                        className="flex items-center justify-between bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-xl p-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-secondary/20">
                            <Sparkles className="w-4 h-4 text-secondary" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.reason}</p>
                            <div className="flex items-center gap-2">
                              <p className="text-xs text-gray-500">{item.createdAt}</p>
                              <span className="text-xs text-secondary flex items-center gap-1">
                                <Gift className="w-3 h-3" />
                                家长奖励
                              </span>
                            </div>
                          </div>
                        </div>
                        <span className="font-semibold text-secondary">
                          +{item.points} 积分
                        </span>
                      </div>
                    )
                  ))
                : (items as RedemptionItem[]).map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-gradient-to-r from-[#FFF8F0] to-[#FFEDD8] rounded-xl p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: item.giftColor ? `${item.giftColor}20` : "#F3F4F6" }}
                        >
                          <Gift
                            className="w-4 h-4"
                            style={{ color: item.giftColor || "#9CA3AF" }}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.giftName}</p>
                          <p className="text-xs text-gray-500">{item.redeemedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.status === "PENDING" && (
                          <span className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                            <Clock className="w-3 h-3" />
                            待确认
                          </span>
                        )}
                        {item.status === "CANCELLED" && (
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            已取消
                          </span>
                        )}
                        <span className="font-semibold text-[#FF6B35]">-{item.points} 积分</span>
                      </div>
                    </div>
                  ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 空状态 */}
      <AnimatePresence>
        {isExpanded && (!items || items.length === 0) && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-gray-100"
          >
            <div className="p-8 text-center text-gray-400">
              <p className="text-sm">本周{type === "completions" ? "暂无完成任务" : "暂无兑换记录"}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
