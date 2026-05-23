"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  title: string;
  content?: string;
  subContent?: string;
  warningText?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmDialog({
  isOpen,
  title,
  content,
  subContent,
  warningText,
  confirmText = "确认删除",
  cancelText = "取消",
  destructive = false,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onCancel}
          />

          {/* 弹窗内容 */}
          <div className="fixed inset-0 z-[51] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="w-full max-w-[320px] bg-card rounded-card p-5 shadow-lg border border-border pointer-events-auto"
            >
              {/* 标题 */}
              <div className="text-lg font-semibold text-text text-center mb-3">
                {title}
              </div>

              {/* 内容 */}
              {content && (
                <div className="text-sm text-text-secondary text-center mb-2 whitespace-pre-line">
                  {content}
                </div>
              )}

              {/* 次级内容 */}
              {subContent && (
                <div className="text-sm text-text-secondary text-center mb-2 whitespace-pre-line">
                  {subContent}
                </div>
              )}

              {/* 警告文本 */}
              {warningText && (
                <div className="text-sm text-error text-center mb-5 whitespace-pre-line">
                  {warningText}
                </div>
              )}

              {/* 按钮区域 */}
              <div className="flex gap-3">
                {/* 取消按钮 */}
                <button
                  onClick={onCancel}
                  className={cn(
                    "flex-1 h-11 rounded-button text-base font-medium transition-colors",
                    "border border-border bg-background hover:bg-card"
                  )}
                >
                  {cancelText}
                </button>

                {/* 确认按钮 */}
                <button
                  onClick={onConfirm}
                  className={cn(
                    "flex-1 h-11 rounded-button text-base font-medium transition-colors text-white shadow-sm",
                    destructive
                      ? "bg-error hover:bg-error/90"
                      : "bg-primary hover:bg-primaryLight"
                  )}
                >
                  {confirmText}
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}