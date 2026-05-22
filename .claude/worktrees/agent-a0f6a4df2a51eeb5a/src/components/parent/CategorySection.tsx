"use client";

import { cn } from "@/lib/cn";
import { useLongPress } from "@/hooks/use-long-press";
import { TaskCard } from "./TaskCard";
import type { CategoryWithTasks, ParentTask } from "@/types";

interface CategorySectionProps {
  category: CategoryWithTasks;
  onTaskLongPress: (task: ParentTask) => void;
  onCategoryLongPress: (category: CategoryWithTasks) => void;
}

export function CategorySection({
  category,
  onTaskLongPress,
  onCategoryLongPress,
}: CategorySectionProps) {
  const { isPressed, handlers } = useLongPress({
    onLongPress: () => onCategoryLongPress(category),
    delay: 400,
  });

  return (
    <div className="mb-6">
      {/* 类别标题 */}
      <div
        {...handlers}
        className={cn(
          "px-4 py-2 mb-3 rounded-lg transition-all duration-150 cursor-pointer select-none",
          isPressed && "bg-card/60"
        )}
      >
        <h2 className="text-lg font-semibold text-text flex items-center gap-2">
          <span>{category.name}</span>
          <span className="text-sm text-text-secondary font-normal">
            ({category.tasks.length})
          </span>
        </h2>
      </div>

      {/* 任务列表 */}
      {category.tasks.length === 0 ? (
        <div className="px-4 py-8 text-center text-text-secondary text-sm">
          暂无任务
        </div>
      ) : (
        <div className="space-y-3 px-4">
          {category.tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onLongPress={() => onTaskLongPress(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
}