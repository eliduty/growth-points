import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const BEIJING_TZ = "Asia/Shanghai";

/**
 * 获取当前北京时间
 */
export function getBeijingNow(): dayjs.Dayjs {
  return dayjs().tz(BEIJING_TZ);
}

/**
 * 获取北京时间格式的日期字符串
 */
export function formatBeijingDate(date: Date | string): string {
  return dayjs(date).tz(BEIJING_TZ).format("YYYY-MM-DD");
}

/**
 * 获取北京时间格式的时间字符串
 */
export function formatBeijingTime(date: Date | string): string {
  return dayjs(date).tz(BEIJING_TZ).format("YYYY-MM-DD HH:mm");
}

/**
 * 获取北京时间的星期几（0=周日，1=周一...6=周六）
 */
export function getBeijingDayOfWeek(): number {
  return getBeijingNow().day();
}

/**
 * 判断当前北京时间是否为兑换日
 */
export function isExchangeDayNow(exchangeDays: number[]): boolean {
  const dayOfWeek = getBeijingDayOfWeek();
  return exchangeDays.includes(dayOfWeek);
}

/**
 * 获取指定日期所在周的起始时间（周一 00:00:00，北京时间）
 * @param date 可选，默认为当前时间
 */
export function getWeekStart(date?: Date): Date {
  const base = date ? dayjs(date).tz(BEIJING_TZ) : getBeijingNow();
  const dayOfWeek = base.day();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  return base.subtract(daysToMonday, "day").startOf("day").toDate();
}

/**
 * 获取指定日期所在周的结束时间（周日 23:59:59，北京时间）
 * @param date 可选，默认为当前时间
 */
export function getWeekEnd(date?: Date): Date {
  const weekStart = getWeekStart(date);
  return dayjs(weekStart).add(6, "day").endOf("day").toDate();
}

/**
 * 获取下一个兑换日信息
 */
export function getNextExchangeDayInfo(exchangeDays: number[]): {
  dayOfWeek: number;
  daysUntil: number;
} | null {
  if (exchangeDays.length === 0) return null;

  const now = getBeijingNow();
  const currentDayOfWeek = now.day();

  // 找下一个兑换日
  for (let i = 1; i <= 7; i++) {
    const nextDay = (currentDayOfWeek + i) % 7;
    if (exchangeDays.includes(nextDay)) {
      return {
        dayOfWeek: nextDay,
        daysUntil: i,
      };
    }
  }

  return null;
}

/**
 * 计算距离兑换日结束的倒计时（秒）
 */
export function getSecondsUntilExchangeEnd(): number {
  const now = getBeijingNow();
  const endOfDay = now.endOf("day");
  return endOfDay.diff(now, "second");
}

/**
 * 计算距离下一个兑换日开始的时间（秒）
 */
export function getSecondsUntilNextExchange(exchangeDays: number[]): number {
  const nextInfo = getNextExchangeDayInfo(exchangeDays);
  if (!nextInfo) return 0;

  const now = getBeijingNow();
  const nextExchangeDay = now.add(nextInfo.daysUntil, "day").startOf("day");
  return nextExchangeDay.diff(now, "second");
}

/**
 * 格式化相对时间（如 "3分钟前"、"2小时前"）
 */
export function formatRelativeTime(date: Date | string): string {
  const now = getBeijingNow();
  const target = dayjs(date).tz(BEIJING_TZ);
  const diffMinutes = now.diff(target, "minute");
  const diffHours = now.diff(target, "hour");
  const diffDays = now.diff(target, "day");

  if (diffMinutes < 1) {
    return "刚刚";
  } else if (diffMinutes < 60) {
    return `${diffMinutes}分钟前`;
  } else if (diffHours < 24) {
    return `${diffHours}小时前`;
  } else if (diffDays < 7) {
    return `${diffDays}天前`;
  } else {
    return target.format("YYYY-MM-DD HH:mm");
  }
}