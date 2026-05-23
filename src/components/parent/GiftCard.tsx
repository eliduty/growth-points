"use client";

import { Gift, Settings, Trash2 } from "lucide-react";

interface GiftItem {
  id: string;
  name: string;
  points: number;
  description: string | null;
  color: string | null;
  weeklyLimit: number | null;
}

interface GiftCardProps {
  gift: GiftItem;
  onEdit: () => void;
  onDelete: () => void;
}

// 礼物颜色池 - 与设计一致
const giftColors = [
  { bg: "linear-gradient(135deg, #FF6B35 0%, #FF8A50 100%)", name: "orange" },
  { bg: "linear-gradient(135deg, #4ECDC4 0%, #7FDBDA 100%)", name: "teal" },
  { bg: "linear-gradient(135deg, #FFD93D 0%, #FFE066 100%)", name: "yellow" },
  { bg: "linear-gradient(135deg, #60A5FA 0%, #93C5FD 100%)", name: "blue" },
  { bg: "linear-gradient(135deg, #A78BFA 0%, #C4B5FD 100%)", name: "purple" },
  { bg: "linear-gradient(135deg, #FB923C 0%, #FDBA74 100%)", name: "amber" },
];

export function GiftCard({ gift, onEdit, onDelete }: GiftCardProps) {
  // 根据礼物颜色或索引获取颜色样式
  const colorIndex = gift.color
    ? giftColors.findIndex((c) => c.name === gift.color)
    : -1;
  const colorStyle =
    colorIndex >= 0
      ? giftColors[colorIndex]
      : giftColors[Math.abs(gift.name.charCodeAt(0) % giftColors.length)];

  return (
    <div
      className="bg-white rounded-[12px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.08)] border border-[#E5E7EB]"
    >
      {/* 彩色背景区域 */}
      <div
        className="px-[14px] py-6 text-center relative overflow-hidden"
        style={{ background: colorStyle.bg }}
      >
        {/* 光泽效果 */}
        <div
          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 50%)",
          }}
        />

        {/* 图标盒子 */}
        <div
          className="w-9 h-9 mx-auto mb-[10px] bg-[rgba(255,255,255,0.2)] rounded-[10px] flex items-center justify-center relative"
        >
          <Gift className="w-5 h-5 text-white" />
        </div>

        {/* 礼物名称 */}
        <div className="text-base text-white font-semibold relative">
          {gift.name}
        </div>
      </div>

      {/* 底部白色区域 */}
      <div className="px-[14px] py-[14px] text-center">
        {/* 积分显示 */}
        <div
          className="text-sm text-[var(--color-primary)] font-semibold mb-3 flex items-center justify-center gap-1"
        >
          <Gift className="w-3.5 h-3.5 stroke-[var(--color-primary)]" />
          {gift.points} 积分
        </div>

        {/* 编辑/删除按钮 */}
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="flex-1 bg-white border border-[#E5E7EB] rounded-[6px] py-2 text-sm cursor-pointer transition-all flex items-center justify-center gap-1 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]"
          >
            <Settings className="w-3.5 h-3.5" />
            编辑
          </button>
          <button
            onClick={onDelete}
            className="flex-1 bg-white border border-[#E5E7EB] rounded-[6px] py-2 text-sm cursor-pointer transition-all flex items-center justify-center gap-1 hover:border-[var(--color-error)] hover:text-[var(--color-error)]"
          >
            <Trash2 className="w-3.5 h-3.5" />
            删除
          </button>
        </div>
      </div>
    </div>
  );
}