"use client";

import { Gift, IceCream, Gamepad2, BookOpen, Music, Tv } from "lucide-react";
import { ChildGift } from "@/types";

interface GiftItemProps {
  gift: ChildGift;
  onRedeem: (gift: ChildGift) => void;
  isRedeeming: boolean;
}

const GIFT_GRADIENTS = [
  "gift-gradient-1",
  "gift-gradient-2",
  "gift-gradient-3",
  "gift-gradient-4",
  "gift-gradient-5",
  "gift-gradient-6",
];

const GIFT_ICONS = [Gift, IceCream, Gamepad2, BookOpen, Music, Tv];

export default function GiftItem({ gift, onRedeem, isRedeeming }: GiftItemProps) {
  const lastChar = gift.id.slice(-1) || "0";
  const parsedIndex = parseInt(lastChar, 16);
  const gradientIndex = Number.isNaN(parsedIndex) ? 0 : parsedIndex % 6;
  const gradientClass = GIFT_GRADIENTS[gradientIndex];
  const IconComponent = GIFT_ICONS[gradientIndex];

  const getLimitText = () => {
    if (gift.limitStatus === "unlimited") {
      return null;
    }
    if (gift.limitStatus === "exhausted") {
      return (
        <span className="text-xs text-white/80 font-medium">
          本周已兑完
        </span>
      );
    }
    return (
      <span className="text-xs text-white/80 font-medium">
        本周可兑 {gift.weeklyRedeemed}/{gift.weeklyLimit}
      </span>
    );
  };

  const getButtonState = () => {
    if (gift.limitStatus === "exhausted") {
      return { disabled: true, text: "已兑完", className: "bg-gray-100 text-gray-400 border border-gray-200" };
    }
    if (!gift.canRedeem) {
      return { disabled: true, text: "积分不足", className: "bg-gray-100 text-gray-400 border border-gray-200" };
    }
    return { disabled: false, text: "兑换", className: "bg-white text-primary font-bold hover:bg-white/90" };
  };

  const buttonState = getButtonState();
  const limitText = getLimitText();

  return (
    <div className={`${gradientClass} rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1`}>
      {/* 上方彩色区域 */}
      <div className="p-4 pb-2">
        <div className="flex flex-col items-center justify-center">
          <IconComponent className="w-8 h-8 text-white mb-2" />
          <h3 className="font-bold text-white text-center">{gift.name}</h3>
        </div>
      </div>

      {/* 下方积分信息 */}
      <div className="bg-white/95 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-primary" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <span className="text-primary font-bold">{gift.points}</span>
            <span className="text-xs text-text-muted">积分</span>
          </div>
          {limitText}
        </div>

        <button
          disabled={buttonState.disabled || isRedeeming}
          onClick={() => onRedeem(gift)}
          className={`w-full mt-2 py-2 rounded-xl text-sm transition-all ${buttonState.className} disabled:cursor-not-allowed`}
        >
          {isRedeeming ? (
            <span className="animate-spin">⌛</span>
          ) : (
            buttonState.text
          )}
        </button>
      </div>
    </div>
  );
}
