"use client";

import { useState } from "react";
import { useChildGifts } from "@/hooks/use-child-gifts";
import PointsOverview from "@/components/child/PointsOverview";
import ExchangeDayInfo from "@/components/child/ExchangeDayInfo";
import GiftGrid from "@/components/child/GiftGrid";
import { ChildGift } from "@/types";
import { Gift, Clock, X } from "lucide-react";

export default function GiftsPage() {
  const { giftsData, isLoading, error, redeemGift, isRedeeming } = useChildGifts();
  const [selectedGift, setSelectedGift] = useState<ChildGift | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleRedeem = (gift: ChildGift) => {
    setSelectedGift(gift);
    setConfirmOpen(true);
  };

  const confirmRedeem = async () => {
    if (selectedGift) {
      await redeemGift(selectedGift.id);
      setConfirmOpen(false);
      setSelectedGift(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded-2xl" />
          <div className="h-20 bg-gray-200 rounded-xl" />
          <div className="h-32 bg-gray-200 rounded-2xl" />
          <div className="h-32 bg-gray-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (error || !giftsData) {
    return (
      <div className="p-4 text-center text-gray-500">
        加载失败，请刷新页面
      </div>
    );
  }

  return (
    <div className="p-4 pb-20">
      {/* 积分概览 */}
      <PointsOverview
        current={giftsData.pointsOverview.current}
        total={giftsData.pointsOverview.total}
        weekly={giftsData.pointsOverview.weekly}
      />

      {/* 兑换日提示 */}
      <div className="mb-4">
        <ExchangeDayInfo exchangeDaysInfo={giftsData.exchangeDaysInfo} />
      </div>

      {/* 礼物网格 */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          <Gift className="w-5 h-5 text-amber-500" />
          可兑换礼物
        </h2>
        <GiftGrid
          gifts={giftsData.gifts}
          onRedeem={handleRedeem}
          isRedeeming={isRedeeming}
        />
      </div>

      {/* 待确认兑换列表 */}
      {giftsData.pendingRedemptions.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            待确认兑换
          </h2>
          <div className="bg-amber-50 rounded-xl p-4 space-y-3">
            {giftsData.pendingRedemptions.map((redemption) => (
              <div
                key={redemption.id}
                className="flex items-center justify-between bg-white rounded-lg p-3"
              >
                <div>
                  <p className="font-medium text-gray-900">{redemption.giftName}</p>
                  <p className="text-sm text-gray-500">{redemption.redeemedAt}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-amber-500 font-bold">{redemption.points}</span>
                  <span className="text-xs text-gray-500">积分</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 兑换确认对话框 */}
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">确认兑换</h3>
              <button
                onClick={() => {
                  setConfirmOpen(false);
                  setSelectedGift(null);
                }}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              确定要兑换 <strong>{selectedGift?.name}</strong> 吗？
              <br />
              将消耗 <span className="text-amber-500 font-bold">{selectedGift?.points}</span> 积分
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setConfirmOpen(false);
                  setSelectedGift(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50"
              >
                取消
              </button>
              <button
                onClick={confirmRedeem}
                disabled={isRedeeming}
                className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-xl font-medium hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRedeeming ? "兑换中..." : "确认兑换"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
