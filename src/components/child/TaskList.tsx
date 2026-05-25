"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CompleteConfirmDialog from "./CompleteConfirmDialog";
import UnavailableTaskDialog from "./UnavailableTaskDialog";
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

interface UnavailableState {
  isOpen: boolean;
  taskName: string;
  availableDaysDisplay: string;
}

// 分类折叠组组件（用于今日待办）
function TodayCategoryGroup({
  name,
  tasks,
  onComplete,
  isCompleting,
  defaultExpanded = false,
}: {
  name: string;
  tasks: ChildTask[];
  onComplete: (taskId: string) => void;
  isCompleting?: string | null;
  defaultExpanded?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="mb-[14px]">
      <div className="bg-white rounded-[16px] p-[18px] shadow-[0_4px_12px_rgba(255,107,53,0.15),0_1px_2px_rgba(0,0,0,0.05)] border border-[rgba(255,107,53,0.08)]">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-base text-[#1F2937] font-medium"
        >
          <span className="flex items-center gap-2.5">
            <svg className="w-[18px] h-[18px] text-[#FF6B35]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            <span>【{name}】</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6B7280]">{tasks.length} 个待完成</span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.15 }}
              className="w-5 h-5 text-[#9CA3AF]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </motion.div>
          </div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-[14px] overflow-hidden"
            >
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center justify-between py-[14px] border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex-1">
                    <h4 className="text-base text-[#1F2937] mb-1 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#FF6B35]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                      </svg>
                      {task.name}
                    </h4>
                    {task.description && (
                      <p className="text-sm text-[#6B7280]">{task.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[#FF6B35] flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                      +{task.points}
                    </span>
                    <button
                      onClick={() => onComplete(task.id)}
                      disabled={isCompleting === task.id}
                      className="bg-gradient-to-br from-[#FF6B35] to-[#FF8A50] rounded-[12px] px-[18px] py-3 text-white text-sm font-medium shadow-[0_2px_8px_rgba(255,107,53,0.2)] transition-all duration-150 flex items-center gap-1.5 hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(255,107,53,0.3)] active:scale-[0.95] disabled:opacity-50"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"/>
                        <path d="M9 12l2 2 4-4"/>
                      </svg>
                      {isCompleting === task.id ? "完成中..." : "完成"}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// 其他时间任务项组件
function OtherTimeTaskItem({
  task,
  onClick,
}: {
  task: ChildTask;
  onClick: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClick}
      className="bg-[#F9FAFB] rounded-[14px] p-4 mb-3 last:mb-0 cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-base text-[#9CA3AF] flex items-center gap-2">
            <svg className="w-4 h-4 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {task.name}
          </p>
          {task.description && (
            <p className="text-sm text-[#9CA3AF] mt-1">{task.description}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#9CA3AF] flex items-center gap-1">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            +{task.points}
          </span>
          <span className="text-xs text-[#9CA3AF] bg-[#E5E7EB] px-2 py-1 rounded-full">
            {task.availableDaysDisplay}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function TaskList({ categories, completedTasks, onComplete }: TaskListProps) {
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const [confirmState, setConfirmState] = useState<ConfirmState>({
    isOpen: false,
    taskId: null,
    taskName: "",
    points: 0,
  });
  const [unavailableState, setUnavailableState] = useState<UnavailableState>({
    isOpen: false,
    taskName: "",
    availableDaysDisplay: "",
  });

  // 分组任务：今日待办 vs 其他时间
  const allTasks = categories.flatMap((c) => c.tasks);
  const todayTasks = allTasks.filter((t) => t.isAvailableToday && !t.completed);
  const otherTimeTasks = allTasks.filter((t) => !t.isAvailableToday);

  // 按类别分组今日待办任务
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);
  const todayCategories = sortedCategories.map((cat) => ({
    ...cat,
    tasks: cat.tasks.filter((t) => t.isAvailableToday && !t.completed),
  })).filter((cat) => cat.tasks.length > 0);

  const handleCompleteClick = (taskId: string) => {
    const task = allTasks.find((t) => t.id === taskId);
    if (!task) return;

    setConfirmState({
      isOpen: true,
      taskId,
      taskName: task.name,
      points: task.points,
    });
  };

  const handleOtherTaskClick = (task: ChildTask) => {
    setUnavailableState({
      isOpen: true,
      taskName: task.name,
      availableDaysDisplay: task.availableDaysDisplay,
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

  const handleUnavailableClose = () => {
    setUnavailableState({
      isOpen: false,
      taskName: "",
      availableDaysDisplay: "",
    });
  };

  return (
    <div>
      {/* 今日待办区域 */}
      {todayCategories.length > 0 && (
        <div className="mb-6">
          <h3 className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span className="text-sm font-medium text-[#6B7280] bg-[#FFF8F0] px-3 py-1 rounded-full">
              今日待办 · {todayTasks.length} 个
            </span>
          </h3>

          {todayCategories.map((category, index) => (
            <TodayCategoryGroup
              key={category.id}
              name={category.name}
              tasks={category.tasks}
              onComplete={handleCompleteClick}
              isCompleting={completingTaskId}
              defaultExpanded={index === 0}
            />
          ))}
        </div>
      )}

      {/* 今日待办为空时的祝贺语 */}
      {todayCategories.length === 0 && completedTasks.length > 0 && (
        <div className="text-center py-8 mb-6">
          <div className="w-16 h-16 mx-auto mb-4 text-[#4ECDC4]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10"/>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
              <line x1="9" y1="9" x2="9.01" y2="9"/>
              <line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
          </div>
          <p className="text-lg font-medium text-[#4ECDC4]">太棒了！</p>
          <p className="text-sm text-[#6B7280] mt-2">今天的任务都完成啦，继续加油哦！</p>
        </div>
      )}

      {/* 已完成区域 */}
      {completedTasks.length > 0 && (
        <div className="mb-6">
          <h3 className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-[#4ECDC4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span className="text-sm font-medium text-[#6B7280] bg-[#E8F8F5] px-3 py-1 rounded-full">
              已完成 · {completedTasks.length} 个
            </span>
          </h3>

          <div className="bg-white rounded-[16px] p-[18px] shadow-[0_4px_12px_rgba(255,107,53,0.15),0_1px_2px_rgba(0,0,0,0.05)] border border-[rgba(255,107,53,0.08)]">
            {completedTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-[#E8F8F5] rounded-[14px] p-4 mb-3 last:mb-0"
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

      {/* 其他时间区域 */}
      {otherTimeTasks.length > 0 && (
        <div className="mb-6">
          <h3 className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-[#9CA3AF]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
              <line x1="16" y1="2" x2="16" y2="6"/>
              <line x1="8" y1="2" x2="8" y2="6"/>
              <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
            <span className="text-sm font-medium text-[#6B7280] bg-[#F3F4F6] px-3 py-1 rounded-full">
              其他时间 · {otherTimeTasks.length} 个
            </span>
          </h3>

          <div className="bg-white rounded-[16px] p-[18px] shadow-[0_4px_12px_rgba(255,107,53,0.15),0_1px_2px_rgba(0,0,0,0.05)] border border-[rgba(255,107,53,0.08)]">
            {otherTimeTasks.map((task) => (
              <OtherTimeTaskItem
                key={task.id}
                task={task}
                onClick={() => handleOtherTaskClick(task)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 空状态 - 没有任何任务 */}
      {allTasks.length === 0 && completedTasks.length === 0 && (
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

      {/* 不可用任务提示弹窗 */}
      <UnavailableTaskDialog
        isOpen={unavailableState.isOpen}
        taskName={unavailableState.taskName}
        availableDaysDisplay={unavailableState.availableDaysDisplay}
        onClose={handleUnavailableClose}
      />
    </div>
  );
}