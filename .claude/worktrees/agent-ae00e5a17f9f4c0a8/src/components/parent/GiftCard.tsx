"use client";

import { cn } from "@/lib/cn";
import { useLongPress } from "@/hooks/use-long-press";

interface Gift {
  id: string;
  name: string;
  points: number;
  description: string | null;
  color: string | null;
  weeklyLimit: number | null;
}

interface GiftCardProps {
  gift: Gift;
  onLongPress: () => void;
}

export function GiftCard({ gift, onLongPress }: GiftCardProps) {
  const { isPressed, handlers } = useLongPress({
    onLongPress,
    delay: 400,
  });

  return (
    <div
      {...handlers}
      className={cn(
        "bg-card rounded-card p-4 border border-border shadow-sm",
        "transition-all duration-150 cursor-pointer select-none",
        isPressed && "scale-[0.98] bg-card/80 border-primary"
      )}
    >
      {/* 顶部颜色条 */}
      <div
        className="h-2 rounded-full mb-3"
        style={{ backgroundColor: gift.color || "#4ECDC4" }}
      />

      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-text truncate">
            {gift.name}
          </h3>
          {gift.description && (
            <p className="text-sm text-text-secondary truncate mt-1">
              {gift.description}
            </p>
          )}
          {gift.weeklyLimit && (
            <p className="text-xs text-text-secondary mt-1">
              每周上限: {gift.weeklyLimit} 次
            </p>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-lg font-semibold text-primary">
            {gift.points}
          </span>
          <span className="text-sm text-text-secondary">积分</span>
        </div>
      </div>
    </div>
  );
}