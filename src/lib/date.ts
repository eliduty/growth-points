import { format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const BEIJING_TZ = "Asia/Shanghai";

/**
 * 获取当前北京时间
 */
export function getBeijingNow(): Date {
  return toZonedTime(new Date(), BEIJING_TZ);
}

/**
 * 获取本周开始时间（周一 00:00:00）
 */
export function getWeekStart(date: Date = new Date()): Date {
  const beijingDate = toZonedTime(date, BEIJING_TZ);
  const day = beijingDate.getDay();
  const diff = beijingDate.getDate() - day + (day === 0 ? -6 : 1);
  const weekStart = new Date(beijingDate);
  weekStart.setDate(diff);
  weekStart.setHours(0, 0, 0, 0);
  return weekStart;
}

/**
 * 获取本周结束时间（周日 23:59:59）
 */
export function getWeekEnd(date: Date = new Date()): Date {
  const weekStart = getWeekStart(date);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  weekEnd.setHours(23, 59, 59, 999);
  return weekEnd;
}

/**
 * 格式化北京时间为字符串
 */
export function formatBeijingTime(date: Date | string, formatStr: string = "yyyy-MM-dd HH:mm:ss"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const zonedDate = toZonedTime(d, BEIJING_TZ);
  return format(zonedDate, formatStr);
}
