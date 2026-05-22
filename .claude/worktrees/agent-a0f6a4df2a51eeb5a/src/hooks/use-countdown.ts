"use client";

import { useState, useEffect, useCallback } from "react";

interface CountdownResult {
  seconds: number;
  formatted: string;
  isExpired: boolean;
}

/**
 * 倒计时 Hook
 * @param targetSeconds 目标秒数（从现在开始计算）
 * @param intervalMs 更新间隔（毫秒），默认 1000
 */
export function useCountdown(
  targetSeconds: number,
  intervalMs: number = 1000
): CountdownResult {
  const [remainingSeconds, setRemainingSeconds] = useState(Math.max(0, targetSeconds));

  useEffect(() => {
    if (targetSeconds <= 0) {
      setRemainingSeconds(0);
      return;
    }

    setRemainingSeconds(targetSeconds);

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => Math.max(0, prev - 1));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [targetSeconds, intervalMs]);

  const formatTime = useCallback((secs: number): string => {
    if (secs <= 0) return "00:00:00";
    const hours = Math.floor(secs / 3600);
    const minutes = Math.floor((secs % 3600) / 60);
    const seconds = Math.floor(secs % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  return {
    seconds: remainingSeconds,
    formatted: formatTime(remainingSeconds),
    isExpired: remainingSeconds <= 0,
  };
}