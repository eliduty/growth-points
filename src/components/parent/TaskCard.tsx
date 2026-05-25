"use client";

import { Edit2, Trash2, Clock } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ParentTask } from "@/types";

interface TaskCardProps {
  task: ParentTask;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  const isPending = !task.availableDays;

  return (
    <div
      className={cn(
        "bg-card rounded-lg p-4 border border-border shadow-sm mb-3",
        "flex items-center justify-between gap-3"
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-medium text-text truncate">
            {task.name}
          </h3>
          {/* 待安排/已安排状态 */}
          {isPending ? (
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
              待安排
            </span>
          ) : (
            <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {task.availableDaysDisplay || task.status}
            </span>
          )}
        </div>
        {task.description && (
          <p className="text-sm text-text-muted truncate mt-1">
            {task.description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-lg font-semibold text-primary">
          {task.points}
        </span>
        <span className="text-sm text-text-muted">积分</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          className="p-2 rounded-lg text-text-muted hover:bg-gray-100 transition-colors"
        >
          <Edit2 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}