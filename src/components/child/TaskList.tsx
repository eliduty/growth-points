"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CategoryGroup from "./CategoryGroup";
import CompleteConfirmDialog from "./CompleteConfirmDialog";
import { ChildTask } from "@/types";

interface TaskCategory {
  id: string;
  name: string;
  order: number;
  tasks: ChildTask[];
}

interface CompletedTask {
  id: string;
  taskName: string;
  points: number;
  completedAt: string;
}

interface TaskListProps {
  categories: TaskCategory[];
  completedTasks: CompletedTask[];
  onComplete: (taskId: string) => Promise<void>;
}

interface ConfirmState {
  isOpen: boolean;
  taskId: string | null;
  taskName: string;
  points: number;
}

export default function TaskList({ categories, completedTasks, onComplete }: TaskListProps) {
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const [confirmState, setConfirmState] = useState<ConfirmState>({
    isOpen: false,
    taskId: null,
    taskName: "",
    points: 0,
  });

  const handleCompleteClick = (taskId: string) => {
    const task = categories
      .flatMap((c) => c.tasks)
      .find((t) => t.id === taskId);

    if (!task) return;

    setConfirmState({
      isOpen: true,
      taskId,
      taskName: task.name,
      points: task.points,
    });
  };

  const handleConfirm = async () => {
    if (!confirmState.taskId) return;

    setConfirmState((prev) => ({ ...prev, isOpen: false }));
    setCompletingTaskId(confirmState.taskId);

    try {
      await onComplete(confirmState.taskId);
    } finally {
      setCompletingTaskId(null);
      setConfirmState({
        isOpen: false,
        taskId: null,
        taskName: "",
        points: 0,
      });
    }
  };

  const handleCancel = () => {
    setConfirmState({
      isOpen: false,
      taskId: null,
      taskName: "",
      points: 0,
    });
  };

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  // 计算待完成任务总数
  const pendingCount = categories.flatMap((c) => c.tasks.filter((t) => !t.completed)).length;

  return (
    <div>
      {/* 待完成区域 */}
      {sortedCategories.length > 0 && pendingCount > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-[#6B7280] mb-3">
            【待完成】（{pendingCount} 个）
          </h3>

          {sortedCategories.map((category, index) => (
            <CategoryGroup
              key={category.id}
              {...category}
              onComplete={handleCompleteClick}
              isCompleting={completingTaskId}
              defaultExpanded={index === 0}
            />
          ))}
        </div>
      )}

      {/* 已完成区域 */}
      {completedTasks.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-[#6B7280] mb-3">
            【已完成】（{completedTasks.length} 个）
          </h3>

          <div className="bg-white rounded-[16px] p-[18px] shadow-[0_4px_12px_rgba(255,107,53,0.15),0_1px_2px_rgba(0,0,0,0.05)] border border-[rgba(255,107,53,0.08)]">
            {completedTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#F9FAFB] rounded-[14px] p-4 mb-3 last:mb-0"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-base text-[#1F2937] flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#4ECDC4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {task.taskName}
                    </p>
                    <p className="text-sm text-[#6B7280] mt-1">{task.completedAt}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#4ECDC4] font-semibold flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      +{task.points}
                    </span>
                    <span className="text-xs text-[#4ECDC4] bg-[#4ECDC4]/20 px-2 py-1 rounded-full">
                      已完成
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* 空状态 - 没有任务 */}
      {categories.length === 0 && (
        <div className="text-center py-12 text-[#9CA3AF]">
          <div className="w-12 h-12 mx-auto mb-4 opacity-60">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
          </div>
          <p className="text-sm">等待家长添加任务</p>
        </div>
      )}

      {/* 空状态 - 有待完成但已全部完成 */}
      {categories.length > 0 && pendingCount === 0 && completedTasks.length === 0 && (
        <div className="text-center py-12 text-[#9CA3AF]">
          <div className="w-12 h-12 mx-auto mb-4 opacity-60 text-[#4ECDC4]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
          </div>
          <p className="text-sm">太棒了！今天的任务都完成啦</p>
        </div>
      )}

      {/* 确认弹窗 */}
      <CompleteConfirmDialog
        isOpen={confirmState.isOpen}
        title="确认完成这个任务？"
        content={`获得 ${confirmState.points} 积分`}
        taskName={confirmState.taskName}
        points={confirmState.points}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
