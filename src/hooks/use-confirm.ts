"use client";

import { useState, useCallback } from "react";

interface ConfirmOptions {
  title: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

interface ConfirmState extends ConfirmOptions {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function useConfirm() {
  const [state, setState] = useState<ConfirmState | null>(null);

  const showConfirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        ...options,
        isOpen: true,
        confirmText: options.confirmText || "确认",
        cancelText: options.cancelText || "取消",
        onConfirm: () => {
          setState(null);
          resolve(true);
        },
        onCancel: () => {
          setState(null);
          resolve(false);
        },
      });
    });
  }, []);

  const closeConfirm = useCallback(() => {
    if (state) {
      state.onCancel();
    }
  }, [state]);

  return {
    confirmState: state,
    showConfirm,
    closeConfirm,
  };
}