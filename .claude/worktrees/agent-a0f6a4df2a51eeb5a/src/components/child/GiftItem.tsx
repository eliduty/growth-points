"use client";

import { Gift } from "lucide-react";
import { ChildGift } from "@/types";

interface GiftItemProps {
  gift: ChildGift;
  onRedeem: (gift: ChildGift) => void;
  isRedeeming: boolean;
}

export default function GiftItem({ gift, onRedeem, isRedeeming }: GiftItemProps) {
  const getLimitText = () => {
    if (gift.limitStatus === "unlimited") {
      return null;
    }
    if (gift.limitStatus === "exhausted") {
      return (
        <span className="text-xs text-red-500 font-medium">
          本周已兑完 {gift.weeklyLimit}/{gift.weeklyLimit}
        </span>
      );
    }
    return (
      <span className="text-xs text-amber-600 font-medium">
        本周可兑 {gift.weeklyRedeemed}/{gift.weeklyLimit}
      </span>
    );
  };

  const getButtonState = () => {
    if (gift.limitStatus === "exhausted") {
      return { disabled: true, text: "已兑完", className: "bg-gray-100 text-gray-400 border border-gray-200" };
    }
    if (!gift.canRedeem) {
      return { disabled: true, text: "不可兑换", className: "bg-gray-100 text-gray-400 border border-gray-200" };
    }
    return { disabled: false, text: "兑换", className: "bg-amber-500 text-white hover:bg-amber-600" };
  };

  const buttonState = getButtonState();
  const limitText = getLimitText();

  return (
    <div
      className="rounded-2xl p-4 transition-shadow hover:shadow-md"
      style={{ backgroundColor: gift.color || "#F3F4F6" }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-gray-700" />
            <h3 className="font-bold text-gray-900">{gift.name}</h3>
          </div>
          {gift.description && (
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {gift.description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-1 bg-white/70 px-2 py-1 rounded-full">
          <span className="text-amber-500 font-bold">{gift.points}</span>
          <span className="text-xs text-gray-500">积分</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {limitText}
        </div>
        <button
          disabled={buttonState.disabled || isRedeeming}
          onClick={() => onRedeem(gift)}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${buttonState.className} disabled:cursor-not-allowed min-w-[60px]`}
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
