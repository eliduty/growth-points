"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { cn } from "@/lib/cn";
import type { CategoryWithTasks, ParentTask } from "@/types";

interface CategorySectionProps {
  category: CategoryWithTasks;
  onEditTask: (task: ParentTask) => void;
  onDeleteTask: (task: ParentTask) => void;
  defaultExpanded?: boolean;
}

export function CategorySection({
  category,
  onEditTask,
  onDeleteTask,
  defaultExpanded = true,
}: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border mb-3">
      {/* 类别标题（可点击折叠） */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center justify-between px-4 py-3 cursor-pointer",
          "rounded-xl transition-colors",
          isExpanded ? "bg-gradient-to-r from-blue-50 to-blue-100/50" : "bg-gray-50"
        )}
      >
        <h2 className="text-sm font-medium text-text">
          {category.name}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">
            {category.tasks.length} 个任务
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-text-muted transition-transform duration-150",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </div>

      {/* 任务列表（仅展开时显示） */}
      {isExpanded && (
        <div className="px-4 py-2">
          {category.tasks.length === 0 ? (
            <div className="py-4 text-center text-sm text-text-muted">
              暂无任务
            </div>
          ) : (
            category.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
