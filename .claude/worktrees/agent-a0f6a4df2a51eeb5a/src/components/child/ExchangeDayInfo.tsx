"use client";

import { Sparkles, Clock } from "lucide-react";
import { ExchangeDayInfo as ExchangeDayInfoType } from "@/types";
import { useCountdown } from "@/hooks/use-countdown";
import {
  getSecondsUntilExchangeEnd,
  getSecondsUntilNextExchange,
} from "@/lib/date";

interface ExchangeDayInfoProps {
  exchangeDaysInfo: ExchangeDayInfoType;
}

const dayNames = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export default function ExchangeDayInfo({
  exchangeDaysInfo,
}: ExchangeDayInfoProps) {
  const { days, isExchangeDay, nextExchangeDay } = exchangeDaysInfo;

  // 计算倒计时秒数
  const countdownSeconds = isExchangeDay
    ? getSecondsUntilExchangeEnd()
    : getSecondsUntilNextExchange(days);

  const { formatted: countdownFormatted } = useCountdown(countdownSeconds);

  // 兑换日当天显示
  if (isExchangeDay) {
    return (
      <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl p-4 flex items-center gap-3">
        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center animate-pulse">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div className="flex-1">
          <p className="font-bold text-amber-800">今日可兑换礼物！</p>
          <p className="text-sm text-amber-600 flex items-center gap-1">
            <Clock className="w-3 h-3" />
            距离结束:
            <span className="font-mono font-semibold">{countdownFormatted}</span>
          </p>
        </div>
      </div>
    );
  }

  // 非兑换日显示
  if (nextExchangeDay && days.length > 0) {
    // 构建本周兑换日列表文本
    const exchangeDayNames = days.sort((a, b) => a - b).map((d) => dayNames[d]).join("、");

    return (
      <div className="bg-gray-100 rounded-xl p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-gray-700">
              本周兑换日:
              <span className="font-semibold text-gray-900"> {exchangeDayNames}</span>
            </p>
          </div>
        </div>
        <div className="ml-13 text-sm pl-13">
          <p className="text-gray-600 flex items-center gap-2">
            下次兑换:
            <span className="font-semibold">{dayNames[nextExchangeDay.dayOfWeek]}</span>
            <span className="text-gray-400">|</span>
            <span className="font-medium">
              {nextExchangeDay.daysUntil}天 {countdownFormatted}
            </span>
          </p>
        </div>
      </div>
    );
  }

  // 无兑换日设置
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