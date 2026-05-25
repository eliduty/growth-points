"use client";

import { motion, AnimatePresence } from "framer-motion";

interface UnavailableTaskDialogProps {
  isOpen: boolean;
  taskName: string;
  availableDaysDisplay: string;
  onClose: () => void;
}

export default function UnavailableTaskDialog({
  isOpen,
  taskName,
  availableDaysDisplay,
  onClose,
}: UnavailableTaskDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[20px] p-6 max-w-[300px] w-full shadow-lg"
          >
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 text-[#9CA3AF]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-[#1F2937] mb-2">
                {taskName}
              </h3>
              <p className="text-sm text-[#6B7280] mb-4">
                这个任务 {availableDaysDisplay} 才能做哦
              </p>
              <button
                onClick={onClose}
                className="w-full bg-[#F3F4F6] text-[#6B7280] rounded-[12px] py-3 text-sm font-medium"
              >
               知道了
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}