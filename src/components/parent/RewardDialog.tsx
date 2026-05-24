"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gift, Star, Check, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";

// 预设档位
const PRESET_POINTS = [5, 10, 20, 30, 50];

interface RewardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { points: number; reason: string }) => Promise<void>;
  childName: string;
}

export function RewardDialog({
  isOpen,
  onClose,
  onSubmit,
  childName,
}: RewardDialogProps) {
  const [points, setPoints] = useState<number>(0);
  const [reason, setReason] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // 验证表单是否可提交
  const isValid = points > 0 && reason.trim().length > 0;

  // 选择预设档位
  const handlePresetClick = (value: number) => {
    setSelectedPreset(value);
    setPoints(value);
  };

  // 自定义积分输入
  const handlePointsChange = (value: string) => {
    const num = parseInt(value, 10);
    if (num >= 1 && num <= 1000) {
      setPoints(num);
      // 如果输入值匹配预设，则选中对应预设
      setSelectedPreset(PRESET_POINTS.includes(num) ? num : null);
    } else if (value === "") {
      setPoints(0);
      setSelectedPreset(null);
    }
  };

  // 原因输入
  const handleReasonChange = (value: string) => {
    if (value.length <= 50) {
      setReason(value);
    }
  };

  // 打开二次确认弹窗
  const handleConfirmClick = () => {
    if (isValid) {
      setShowConfirm(true);
    }
  };

  // 确认提交
  const handleFinalSubmit = async () => {
    setIsLoading(true);
    try {
      await onSubmit({ points, reason: reason.trim() });
      setShowConfirm(false);
      resetAndClose();
    } catch (error) {
      // 错误由外部处理
    } finally {
      setIsLoading(false);
    }
  };

  // 重置并关闭
  const resetAndClose = () => {
    setPoints(0);
    setReason("");
    setSelectedPreset(null);
    setShowConfirm(false);
    onClose();
  };

  // 从确认弹窗返回
  const handleBackToForm = () => {
    setShowConfirm(false);
  };

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
            onClick={showConfirm ? undefined : resetAndClose}
          />

          {/* 弹窗内容 */}
          <div className="fixed inset-0 z-[51] flex items-center justify-center p-4 pointer-events-none">
            {!showConfirm ? (
              // 奖励表单弹窗
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full max-w-[360px] bg-card rounded-card p-5 shadow-lg border border-border pointer-events-auto"
              >
                {/* 标题 */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Gift className="w-4 h-4 text-secondary" />
                    </div>
                    <span className="text-lg font-semibold text-text">
                      奖励积分
                    </span>
                  </div>
                  <button
                    onClick={resetAndClose}
                    className="w-8 h-8 rounded-button flex items-center justify-center hover:bg-card transition-colors"
                  >
                    <X className="w-4 h-4 text-text-muted" />
                  </button>
                </div>

                {/* 预设档位 */}
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {PRESET_POINTS.map((value) => (
                    <button
                      key={value}
                      onClick={() => handlePresetClick(value)}
                      className={cn(
                        "h-12 rounded-button text-sm font-semibold transition-all",
                        "border-2",
                        selectedPreset === value
                          ? "border-secondary bg-secondary/10 text-secondary"
                          : "border-border bg-background hover:border-secondary/50 hover:bg-secondary/5"
                      )}
                    >
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-3 h-3" />
                        <span>{value}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* 自定义积分 */}
                <div className="mb-4">
                  <label className="text-sm text-text-secondary mb-1 flex items-center gap-1">
                    自定义积分
                  </label>
                  <input
                    type="number"
                    value={points || ""}
                    onChange={(e) => handlePointsChange(e.target.value)}
                    placeholder="输入积分数量"
                    min={1}
                    max={1000}
                    className={cn(
                      "w-full h-11 px-3 rounded-input border-2 text-base font-semibold transition-colors",
                      "focus:outline-none",
                      points > 0
                        ? "border-secondary bg-secondary/5"
                        : "border-border bg-background focus:border-secondary"
                    )}
                  />
                </div>

                {/* 原因输入 */}
                <div className="mb-5">
                  <label className="text-sm text-text-secondary mb-1 flex items-center gap-1">
                    奖励原因（必填）
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => handleReasonChange(e.target.value)}
                    placeholder="如：考试取得好成绩"
                    rows={2}
                    className={cn(
                      "w-full px-3 py-2 rounded-input border-2 text-base resize-none transition-colors",
                      "focus:outline-none",
                      reason.trim()
                        ? "border-secondary bg-secondary/5"
                        : "border-border bg-background focus:border-secondary"
                    )}
                  />
                  <div className="text-xs text-text-muted text-right mt-1">
                    {reason.length}/50
                  </div>
                </div>

                {/* 提交按钮 */}
                <Button
                  onClick={handleConfirmClick}
                  disabled={!isValid}
                  className="w-full"
                >
                  <Check className="w-4 h-4" />
                  确认
                </Button>
              </motion.div>
            ) : (
              // 二次确认弹窗
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="w-full max-w-[320px] bg-card rounded-card p-5 shadow-lg border border-border pointer-events-auto"
              >
                {/* 图标 */}
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-secondary" />
                </div>

                {/* 标题 */}
                <div className="text-base font-semibold text-text text-center mb-4">
                  确认奖励积分？
                </div>

                {/* 详情 */}
                <div className="bg-background rounded-input p-3 mb-5">
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-text-secondary">奖励对象</span>
                    <span className="text-text font-medium">{childName}</span>
                  </div>
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-text-secondary">奖励积分</span>
                    <span className="text-secondary font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {points}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 text-sm">
                    <span className="text-text-secondary">奖励原因</span>
                    <span className="text-text font-medium max-w-[150px] truncate">
                      {reason.trim()}
                    </span>
                  </div>
                </div>

                {/* 按钮区域 */}
                <div className="flex gap-3">
                  <button
                    onClick={handleBackToForm}
                    disabled={isLoading}
                    className={cn(
                      "flex-1 h-11 rounded-button text-base font-medium transition-colors",
                      "border border-border bg-background hover:bg-card",
                      "disabled:opacity-50"
                    )}
                  >
                    取消
                  </button>
                  <Button
                    onClick={handleFinalSubmit}
                    disabled={isLoading}
                    className="flex-1"
                  >
                    {isLoading ? "提交中..." : "确认奖励"}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </>
      )}
    </AnimatePresence>
  );
}