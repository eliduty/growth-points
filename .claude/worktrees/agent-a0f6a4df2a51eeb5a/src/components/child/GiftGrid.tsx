"use client";

import { ChildGift } from "@/types";
import GiftItem from "./GiftItem";

interface GiftGridProps {
  gifts: ChildGift[];
  onRedeem: (gift: ChildGift) => void;
  isRedeeming: boolean;
}

export default function GiftGrid({ gifts, onRedeem, isRedeeming }: GiftGridProps) {
  if (gifts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>还没有设置礼物</p>
        <p className="text-sm mt-1">请让家长添加礼物</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {gifts.map((gift) => (
        <GiftItem
          key={gift.id}
          gift={gift}
          onRedeem={onRedeem}
          isRedeeming={isRedeeming}
        />
      ))}
    </div>
  );
}
