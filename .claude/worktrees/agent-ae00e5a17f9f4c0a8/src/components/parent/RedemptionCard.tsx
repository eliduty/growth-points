"use client";

import { cn } from "@/lib/cn";
import { formatRelativeTime } from "@/lib/date";
import { RedemptionStatus } from "@/generated/prisma";
import { Button } from "@/components/ui/button";

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
    <div
      className={cn(
        "bg-card rounded-card p-4 border border-border shadow-sm",
        isPending && "border-primary/50"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* 顶部颜色条 */}
          <div
            className="h-1 rounded-full mb-2 w-12"
            style={{ backgroundColor: redemption.giftColor || "#4ECDC4" }}
          />

          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-base font-medium text-text truncate">
              {redemption.giftName}
            </h3>
            <span
              className={cn(
                "px-2 py-0.5 rounded-full text-xs font-medium shrink-0",
                isPending && "bg-primary/20 text-primary",
                isConfirmed && "bg-green-100 text-green-700"
              )}
            >
              {isPending ? "待确认" : "已确认"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <span>{redemption.username}</span>
            <span className="text-xs">兑换</span>
            <span className="text-primary font-medium">
              {redemption.points} 积分
            </span>
          </div>

          <p className="text-xs text-text-secondary mt-1">
            {isConfirmed && redemption.confirmedAt
              ? `确认于 ${formatRelativeTime(redemption.confirmedAt)}`
              : `申请于 ${formatRelativeTime(redemption.redeemedAt)}`}
          </p>
        </div>

        {/* 待确认时显示操作按钮 */}
        {isPending && onConfirm && onCancel && (
          <div className="flex items-center gap-2 shrink-0">
            <Button
              size="sm"
              onClick={() => onConfirm(redemption.id)}
              disabled={isConfirming || isCancelling}
            >
              {isConfirming ? "确认中..." : "确认"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onCancel(redemption.id)}
              disabled={isConfirming || isCancelling}
            >
              {isCancelling ? "撤销中..." : "撤销"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}