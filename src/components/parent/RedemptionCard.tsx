"use client";

import { Clock, CheckCircle, Gift, User, Star } from "lucide-react";
import { cn } from "@/lib/cn";
import { formatRelativeTime } from "@/lib/date";
import { RedemptionStatus } from "@prisma/client";

interface Redemption {
  id: string;
  giftName: string;
  giftColor: string | null;
  points: number;
  userId: string;
  username: string;
  redeemedAt: string;
  confirmedAt?: string | null;
  status: RedemptionStatus;
}

interface RedemptionCardProps {
  redemption: Redemption;
  onConfirm?: (id: string) => void;
  onCancel?: (id: string) => void;
  isConfirming?: boolean;
  isCancelling?: boolean;
}

export function RedemptionCard({
  redemption,
  onConfirm,
  onCancel,
  isConfirming,
  isCancelling,
}: RedemptionCardProps) {
  const isPending = redemption.status === RedemptionStatus.PENDING;
  const isConfirmed = redemption.status === RedemptionStatus.CONFIRMED;

  return (
    <div className="flex items-start justify-between py-[14px] border-b border-[#E5E7EB] last:border-b-0">
      {/* 左侧信息 */}
      <div className="flex-1">
        {/* 兑换名称 */}
        <div className="text-sm text-[var(--text-primary)] mb-1 flex items-center gap-2">
          <Gift className="w-4 h-4 stroke-[var(--color-primary)]" />
          {redemption.username}兑换了「{redemption.giftName}」
        </div>

        {/* 时间 */}
        <div className="text-xs text-[var(--text-muted)] flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {isConfirmed && redemption.confirmedAt
            ? formatRelativeTime(redemption.confirmedAt)
            : formatRelativeTime(redemption.redeemedAt)}
        </div>
      </div>

      {/* 积分 */}
      <div className="text-sm text-[var(--color-error)] font-semibold mr-[14px] flex items-center gap-1">
        <Star className="w-3.5 h-3.5 stroke-[var(--color-error)]" />
        -{redemption.points}积分
      </div>

      {/* 操作按钮 - 仅待确认时显示 */}
      {isPending && onConfirm && onCancel && (
        <div className="flex gap-2">
          <button
            onClick={() => onConfirm(redemption.id)}
            disabled={isConfirming || isCancelling}
            className="bg-white border border-[#E5E7EB] rounded-[6px] px-[14px] py-2 text-sm cursor-pointer transition-all flex items-center gap-1 text-[var(--color-success)] hover:bg-[var(--color-success)] hover:text-white hover:border-[var(--color-success)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="w-3.5 h-3.5" />
            {isConfirming ? "确认中..." : "确认"}
          </button>
          <button
            onClick={() => onCancel(redemption.id)}
            disabled={isConfirming || isCancelling}
            className="bg-white border border-[#E5E7EB] rounded-[6px] px-[14px] py-2 text-sm cursor-pointer transition-all flex items-center gap-1 hover:border-[var(--color-error)] hover:text-[var(--color-error)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <User className="w-3.5 h-3.5 stroke-[var(--text-secondary)]" />
            {isCancelling ? "撤销中..." : "撤销"}
          </button>
        </div>
      )}
    </div>
  );
}

// 兑换区域 Section Header 组件
interface RedemptionSectionProps {
  title: string;
  count: number;
  type: "pending" | "confirmed";
  children: React.ReactNode;
}

export function RedemptionSection({
  title,
  count,
  type,
  children,
}: RedemptionSectionProps) {
  return (
    <div
      className="bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#E5E7EB] mb-3"
    >
      {/* Header - 渐变背景 */}
      <div
        className={cn(
          "px-[18px] py-[14px] rounded-t-[12px] text-sm text-[var(--text-primary)] font-medium flex items-center gap-[10px]",
          type === "pending" &&
            "bg-[linear-gradient(135deg,#FEF3C7_0%,#FDE68A_100%)]",
          type === "confirmed" &&
            "bg-[linear-gradient(135deg,#D1FAE5_0%,#A7F3D0_100%)]"
        )}
      >
        {type === "pending" && (
          <Clock className="w-[18px] h-[18px] stroke-[var(--color-warning)]" />
        )}
        {type === "confirmed" && (
          <CheckCircle className="w-[18px] h-[18px] stroke-[var(--color-success)]" />
        )}
        {title}（{count} 条）
      </div>

      {/* 内容列表 */}
      <div className="px-[18px]">{children}</div>
    </div>
  );
}