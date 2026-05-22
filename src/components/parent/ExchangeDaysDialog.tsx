"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle2 } from "lucide-react";

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

  // 点击遮罩层关闭
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 fadeIn"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-[380px] mx-4 p-6 shadow-xl popIn">
        {/* 头部 */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF] flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">兑换日设置</h2>
            <p className="text-xs text-gray-500">选择允许兑换的日期</p>
          </div>
        </div>

        {/* 说明文字 */}
        <p className="text-sm text-gray-600 mb-4">
          孩子只能在选中的日期兑换礼物，请合理设置。
        </p>

        {/* 星期选择 - 4列网格 */}
        <div className="grid grid-cols-4 gap-2 mb-4">
          {WEEKDAY_NAMES.map((name, index) => {
            const isSelected = selectedDays.includes(index);
            return (
              <button
                key={index}
                onClick={() => toggleDay(index)}
                disabled={isUpdating}
                className={`py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1 ${
                  isSelected
                    ? "bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF] text-white shadow-md"
                    : "bg-gray-50 border border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                {name}
              </button>
            );
          })}
        </div>

        {/* 当前选择 */}
        <div className="text-xs text-gray-500 mb-6">
          已选择：{selectedDays.length > 0
            ? selectedDays.map((d) => WEEKDAY_NAMES[d]).join("、")
            : "未选择"}
        </div>

        {/* 按钮组 */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isUpdating}
            className="flex-1 rounded-xl border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            取消
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isUpdating}
            className="flex-1 rounded-xl bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF] text-white hover:opacity-90 transition-opacity"
          >
            {isUpdating ? "保存中..." : "保存设置"}
          </Button>
        </div>
      </div>
    </div>
  );
}
