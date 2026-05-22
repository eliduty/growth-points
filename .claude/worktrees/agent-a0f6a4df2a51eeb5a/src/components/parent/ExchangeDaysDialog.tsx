"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const WEEKDAY_NAMES = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

interface ExchangeDaysDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentDays: number[];
  onUpdate: (days: number[]) => void;
  isUpdating?: boolean;
}

export function ExchangeDaysDialog({
  isOpen,
  onClose,
  currentDays,
  onUpdate,
  isUpdating = false,
}: ExchangeDaysDialogProps) {
  const [selectedDays, setSelectedDays] = useState<number[]>(currentDays);

  // 当弹窗打开时，更新选中状态
  useEffect(() => {
    if (isOpen) {
      setSelectedDays(currentDays);
    }
  }, [isOpen, currentDays]);

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = () => {
    onUpdate(selectedDays);
    onClose();
  };

  const handleClose = () => {
    setSelectedDays(currentDays);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>兑换日设置</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p className="text-sm text-text-secondary">
            选择允许兑换礼物的日期，孩子只能在这些日期兑换礼物。
          </p>

          {/* 星期选择 */}
          <div className="flex flex-wrap gap-2">
            {WEEKDAY_NAMES.map((name, index) => (
              <button
                key={index}
                onClick={() => toggleDay(index)}
                disabled={isUpdating}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedDays.includes(index)
                    ? "bg-primary text-white shadow-md"
                    : "bg-card border border-border text-text-secondary hover:bg-card/80"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* 当前选择 */}
          <div className="text-sm text-text-secondary">
            已选择：{selectedDays.length > 0
              ? selectedDays.map((d) => WEEKDAY_NAMES[d]).join("、")
              : "未选择"}
          </div>

          {/* 提交按钮 */}
          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={isUpdating}
          >
            {isUpdating ? "保存中..." : "保存设置"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}