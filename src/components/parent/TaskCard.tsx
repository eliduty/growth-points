"use client";

import { useState } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { cn } from "@/lib/cn";
import type { ParentTask } from "@/types";

interface TaskCardProps {
  task: ParentTask;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-lg p-4 border border-border shadow-sm mb-3",
        "flex items-center justify-between gap-3"
      )}
    >
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-text truncate">
          {task.name}
        </h3>
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