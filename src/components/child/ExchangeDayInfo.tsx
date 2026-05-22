"use client";

import { Sparkles, Clock } from "lucide-react";
import { ExchangeDayInfo as ExchangeDayInfoType } from "@/types";

interface ExchangeDayInfoProps {
  exchangeDaysInfo: ExchangeDayInfoType;
}

const dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export default function ExchangeDayInfo({ exchangeDaysInfo }: ExchangeDayInfoProps) {
  const { isExchangeDay, nextExchangeDay } = exchangeDaysInfo;

  if (isExchangeDay) {
    return (
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-bold text-amber-800">✨ 今日是兑换日！</p>
          <p className="text-sm text-amber-600">快去兑换你喜欢的礼物吧</p>
        </div>
      </div>
    );
  }

  if (nextExchangeDay) {
    return (
      <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <Clock className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-medium text-gray-700">
            距离兑换日还有 <span className="font-bold text-gray-900">{nextExchangeDay.daysUntil}</span> 天
          </p>
          <p className="text-sm text-gray-500">
            下次兑换日：{dayNames[nextExchangeDay.dayOfWeek]}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 rounded-xl p-4 flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
        <Clock className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="font-medium text-gray-700">暂无兑换日设置</p>
        <p className="text-sm text-gray-500">请让家长配置兑换日</p>
      </div>
    </div>
  );
}
