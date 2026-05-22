"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskItem from "./TaskItem";
import { ChildTask } from "@/types";

interface CategoryGroupProps {
  id: string;
  name: string;
  order: number;
  tasks: ChildTask[];
  onComplete: (taskId: string) => void;
  isCompleting?: string | null;
  defaultExpanded?: boolean;
}

export default function CategoryGroup({
  name,
  tasks,
  onComplete,
  isCompleting,
  defaultExpanded = false,
}: CategoryGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  // 未展开的已完成的任务数
  const completedCount = completedTasks.length;

  return (
    <div className="mb-[14px]">
      <div className="bg-white rounded-[16px] p-[18px] shadow-[0_4px_12px_rgba(255,107,53,0.15),0_1px_2px_rgba(0,0,0,0.05)] border border-[rgba(255,107,53,0.08)]">
        <button
          onClick={toggleExpand}
          className="flex items-center justify-between w-full text-base text-[#1F2937] font-medium"
        >
          <span className="flex items-center gap-2.5">
            <svg className="w-[18px] h-[18px] text-[#FF6B35]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
            <span>【{name}】</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#6B7280]">{pendingTasks.length} 个待完成</span>
            {completedCount > 0 && !isExpanded && (
              <span className="text-xs text-[#4ECDC4] bg-[#4ECDC4]/20 px-2 py-0.5 rounded-full">
                {completedCount} 个已完成
              </span>
            )}
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
              {/* 待完成任务 */}
              {pendingTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onComplete={onComplete}
                  isCompleting={isCompleting === task.id}
                />
              ))}

              {/* 已完成任务 */}
              {completedTasks.length > 0 && (
                <div className="mt-2 pt-2 border-t border-dashed border-gray-200">
                  <p className="text-xs text-[#9CA3AF] mb-2 flex items-center gap-1">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    已完成
                  </p>
                  {completedTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onComplete={onComplete}
                      isCompleting={isCompleting === task.id}
                    />
                  ))}
                </div>
              )}

              {/* 空状态 */}
              {tasks.length === 0 && (
                <div className="text-center py-6 text-[#9CA3AF] text-sm">
                  <p>该分类下暂无任务</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
