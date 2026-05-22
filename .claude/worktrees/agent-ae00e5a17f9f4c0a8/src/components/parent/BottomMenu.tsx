"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

export interface MenuItem {
  label: string;
  onClick: () => void;
  destructive?: boolean;
  icon?: React.ReactNode;
}

export interface BottomMenuProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  items: MenuItem[];
}

export function BottomMenu({
  open,
  onClose,
  title,
  subtitle,
  items,
}: BottomMenuProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 背景遮罩 - 点击关闭 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* 底部菜单 */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl shadow-lg"
          >
            {/* 标题区域 */}
            {(title || subtitle) && (
              <div className="px-4 py-3 border-b border-border">
                {title && (
                  <h3 className="text-base font-semibold text-text">{title}</h3>
                )}
                {subtitle && (
                  <p className="text-sm text-text-secondary mt-1">{subtitle}</p>
                )}
              </div>
            )}

            {/* 菜单项 */}
            <div className="py-2">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick();
                    onClose();
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-base transition-colors",
                    item.destructive
                      ? "text-error hover:bg-error/10"
                      : "text-text hover:bg-card"
                  )}
                >
                  {item.icon && <span className="shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            {/* 取消按钮 */}
            <div className="px-4 py-3 border-t border-border">
              <button
                onClick={onClose}
                className="w-full py-3 text-base font-medium text-text-secondary bg-card rounded-lg transition-colors hover:bg-card/80"
              >
                取消
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}