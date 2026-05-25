"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="max-w-[320px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="space-y-3 pt-2">
            <div className="flex items-center gap-2 text-[#1F2937]">
              <svg className="w-[18px] h-[18px] text-[#FF6B35]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3 3H2z"/>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3 3h7z"/>
              </svg>
              <span className="font-medium">{taskName}</span>
            </div>
            <div className="flex items-center gap-1 text-[#FF6B35] font-semibold">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span>{content}</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-3 pt-4">
          <button
            onClick={onCancel}
            className="flex-1 bg-white border-2 border-[#E5E7EB] rounded-[14px] py-3
              text-base text-[#6B7280] font-medium
              transition-all duration-150
              hover:border-[#9CA3AF] hover:text-[#1F2937]"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-gradient-to-br from-[#FF6B35] to-[#FF8A50] rounded-[14px] py-3
              text-base text-white font-semibold
              shadow-[0_4px_12px_rgba(255,107,53,0.2)]
              transition-all duration-150
              hover:translate-y-[-1px] hover:shadow-[0_6px_16px_rgba(255,107,53,0.3)]"
          >
            {confirmText}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
