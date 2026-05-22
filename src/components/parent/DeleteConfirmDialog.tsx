"use client";

import { AlertTriangle, Info, Trash2, X } from "lucide-react";
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
  if (!isOpen) return null;

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fadeIn"
        onClick={onCancel}
      />

      {/* 弹窗容器 */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        {/* 弹窗内容 */}
        <div className="w-[320px] bg-card rounded-card p-6 shadow-lg border border-border animate-popIn pointer-events-auto">
          {/* 关闭按钮 */}
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 p-1 rounded-full text-text-secondary hover:text-text hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* 警告图标区域 */}
          <div className="flex flex-col items-center mb-5">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/30 mb-4">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* 标题 */}
          <div className="text-lg font-semibold text-text text-center mb-2">
            {title}
          </div>

          {/* 内容 */}
          {content && (
            <div className="text-sm text-text-secondary text-center mb-3 whitespace-pre-line">
              {content}
            </div>
          )}

          {/* 次要内容 */}
          {subContent && (
            <div className="text-xs text-text-muted text-center mb-4">
              {subContent}
            </div>
          )}

          {/* 警告提示 */}
          {warningText && (
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-5">
              <Info className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
              <span className="text-xs text-amber-700 leading-relaxed">
                {warningText}
              </span>
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
                "flex-1 h-11 rounded-button text-base font-medium transition-colors text-white shadow-sm flex items-center justify-center gap-2",
                destructive
                  ? "bg-error hover:bg-error/90"
                  : "bg-primary hover:bg-primaryLight"
              )}
            >
              <Trash2 className="w-4 h-4" />
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
