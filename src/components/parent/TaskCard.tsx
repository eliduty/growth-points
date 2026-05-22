"use client";

import { cn } from "@/lib/cn";
import { useLongPress } from "@/hooks/use-long-press";
import type { ParentTask } from "@/types";

interface TaskCardProps {
  task: ParentTask;
  onLongPress: () => void;
}

export function TaskCard({ task, onLongPress }: TaskCardProps) {
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
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-medium text-text truncate">
            {task.name}
          </h3>
          {task.description && (
            <p className="text-sm text-text-secondary truncate mt-1">
              {task.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-lg font-semibold text-primary">
            {task.points}
          </span>
          <span className="text-sm text-text-secondary">积分</span>
        </div>
      </div>
    </div>
  );
}