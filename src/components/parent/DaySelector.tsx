"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const DAY_OPTIONS = [
  { value: 0, label: "周日", short: "日" },
  { value: 1, label: "周一", short: "一" },
  { value: 2, label: "周二", short: "二" },
  { value: 3, label: "周三", short: "三" },
  { value: 4, label: "周四", short: "四" },
  { value: 5, label: "周五", short: "五" },
  { value: 6, label: "周六", short: "六" },
];

interface DaySelectorProps {
  value: string | null;
  onChange: (value: string | null) => void;
  disabled?: boolean;
}

export function DaySelector({ value, onChange, disabled }: DaySelectorProps) {
  // 解析当前值
  const selectedDays = value
    ? value.split(",").map((p) => parseInt(p.trim(), 10)).filter((n) => !isNaN(n))
    : [];

  const isAllDays = selectedDays.length === 7;

  const toggleDay = (dayValue: number) => {
    if (disabled) return;

    let newDays: number[];
    if (selectedDays.includes(dayValue)) {
      newDays = selectedDays.filter((d) => d !== dayValue);
    } else {
      newDays = [...selectedDays, dayValue];
    }

    // 排序
    newDays.sort((a, b) => a - b);

    // 更新值
    onChange(newDays.length > 0 ? newDays.join(",") : null);
  };

  const selectAllDays = () => {
    if (disabled) return;
    if (isAllDays) {
      onChange(null);
    } else {
      onChange("0,1,2,3,4,5,6");
    }
  };

  return (
    <div className="space-y-3">
      {/* 快捷按钮 */}
      <div className="flex gap-2">
        <button
          type="button"
          onClick={selectAllDays}
          disabled={disabled}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            isAllDays
              ? "bg-primary text-white"
              : "bg-gray-100 text-text-muted hover:bg-gray-200",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          每天
        </button>
        <button
          type="button"
          onClick={() => onChange(null)}
          disabled={disabled}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
            selectedDays.length === 0
              ? "bg-gray-300 text-text"
              : "bg-gray-100 text-text-muted hover:bg-gray-200",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          待安排
        </button>
      </div>

      {/* 复选框 */}
      <div className="flex gap-2">
        {DAY_OPTIONS.map((day) => {
          const isSelected = selectedDays.includes(day.value);
          return (
            <button
              key={day.value}
              type="button"
              onClick={() => toggleDay(day.value)}
              disabled={disabled}
              className={cn(
                "w-10 h-10 rounded-lg text-sm font-medium transition-colors flex items-center justify-center",
                isSelected
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-text-muted hover:bg-gray-200",
                disabled && "opacity-50 cursor-not-allowed"
              )}
            >
              {day.short}
            </button>
          );
        })}
      </div>

      {/* 显示摘要 */}
      <div className="text-sm text-text-muted">
        {selectedDays.length === 0 ? (
          <span className="text-gray-400">待安排</span>
        ) : selectedDays.length === 7 ? (
          <span className="text-primary font-medium">每天</span>
        ) : (
          <span>
            {selectedDays.map((d) => DAY_OPTIONS.find((opt) => opt.value === d)?.label).join("、")}
          </span>
        )}
      </div>
    </div>
  );
}