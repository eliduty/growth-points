"use client";

import { motion, AnimatePresence } from "framer-motion";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  content: string;
  taskName: string;
  points: number;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function CompleteConfirmDialog({
  isOpen,
  title,
  content,
  taskName,
  points,
  confirmText = "确认完成",
  cancelText = "取消",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[200]"
            onClick={onCancel}
          />

          {/* 弹窗 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              bg-white rounded-[24px] p-7 w-[90%] max-w-[320px] max-h-[85vh] overflow-y-auto
              shadow-[0_16px_48px_rgba(0,0,0,0.2)] z-[201]"
          >
            {/* 图标 */}
            <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-[#FFF8F0] to-[#FFEDD8] rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-[#FF6B35]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9 12l2 2 4-4"/>
              </svg>
            </div>

            {/* 标题 */}
            <h3 className="text-lg text-[#1F2937] text-center mb-5 font-semibold">
              {title}
            </h3>

            {/* 内容 */}
            <div className="text-center mb-6 bg-[#F9FAFB] rounded-[12px] p-4">
              <p className="text-base text-[#1F2937] mb-2 flex items-center justify-center gap-2">
                <svg className="w-[18px] h-[18px] text-[#FF6B35]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3 3H2z"/>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3 3h7z"/>
                </svg>
                {taskName}
              </p>
              <p className="text-sm text-[#FF6B35] font-semibold flex items-center justify-center gap-1">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                {content}
              </p>
            </div>

            {/* 按钮 */}
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 bg-white border-2 border-[#E5E7EB] rounded-[14px] py-3.5
                  text-base text-[#6B7280] font-medium
                  transition-all duration-150
                  hover:border-[#9CA3AF] hover:text-[#1F2937]"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 bg-gradient-to-br from-[#FF6B35] to-[#FF8A50] rounded-[14px] py-3.5
                  text-base text-white font-semibold
                  shadow-[0_4px_12px_rgba(255,107,53,0.2)]
                  transition-all duration-150
                  hover:translate-y-[-1px] hover:shadow-[0_6px_16px_rgba(255,107,53,0.3)]"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
