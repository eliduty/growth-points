"use client";

import { motion } from "framer-motion";
import { ChildTask } from "@/types";

interface TaskItemProps {
  task: ChildTask;
  onComplete: (taskId: string) => void;
  isCompleting?: boolean;
}

export default function TaskItem({ task, onComplete, isCompleting }: TaskItemProps) {
  const handleComplete = () => {
    if (!task.completed && !isCompleting) {
      onComplete(task.id);
    }
  };

  const isCompleted = task.completed;
  const primaryColor = "#FF6B35";
  const secondaryColor = "#4ECDC4";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={`
        flex items-center justify-between py-[14px] border-b border-gray-200 last:border-b-0
        ${isCompleted ? "bg-[#E8F8F5] rounded-[14px] my-[10px] px-[14px] py-[14px] border-b-0" : ""}
      `}
    >
      {/* 任务信息 */}
      <div className="flex-1">
        <h4 className="text-base text-[#1F2937] mb-1 flex items-center gap-2">
          <svg
            className={`w-4 h-4 ${isCompleted ? "text-[#4ECDC4]" : "text-[#FF6B35]"}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isCompleted
              ? <polyline points="20 6 9 17 4 12"/>
              : <circle cx="12" cy="12" r="10"/>}
          </svg>
          {task.name}
        </h4>
        {task.description && (
          <p className="text-sm text-[#6B7280]">{task.description}</p>
        )}
      </div>

      {/* 积分和按钮 */}
      <div className="flex items-center gap-3">
        <span className={`
          text-sm font-semibold flex items-center gap-1
          ${isCompleted ? "text-[#4ECDC4]" : "text-[#FF6B35]"}
        `}>
          <svg
            className="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          +{task.points}
        </span>

        {isCompleted ? (
          <span className="text-sm text-[#4ECDC4] bg-[#4ECDC4]/20 px-3 py-2 rounded-[12px] flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            已完成
          </span>
        ) : (
          <button
            onClick={handleComplete}
            disabled={isCompleting}
            className="
              bg-gradient-to-br from-[#FF6B35] to-[#FF8A50] rounded-[12px]
              px-[18px] py-3 text-white text-sm font-medium
              shadow-[0_2px_8px_rgba(255,107,53,0.2)]
              transition-all duration-150 flex items-center gap-1.5
              hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(255,107,53,0.3)]
              active:scale-[0.95]
              disabled:opacity-50
            "
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9 12l2 2 4-4"/>
            </svg>
            {isCompleting ? "完成中..." : "完成"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
