import { Role, RedemptionStatus } from "@/generated/prisma";
export { Role, RedemptionStatus };

/**
 * 用户信息类型（前端使用）
 */
export interface UserInfo {
  id: string;
  username: string;
  role: Role;
  familyId: string;
  timezoneOffset?: number | null;
  currentPoints?: number;
  totalPoints?: number;
}

/**
 * 任务类型（前端展示）
 */
export interface TaskItem {
  id: string;
  name: string;
  points: number;
  description?: string | null;
  categoryId: string;
  categoryName?: string;
  completed?: boolean;
  completedAt?: string | null;
}

/**
 * 礼物类型（前端展示）
 */
export interface GiftItem {
  id: string;
  name: string;
  points: number;
  description?: string | null;
  color?: string | null;
  weeklyLimit?: number | null;
  weeklyRedeemed?: number;
  canRedeem?: boolean;
}

/**
 * 完成记录类型
 */
export interface CompletionRecord {
  id: string;
  taskName: string;
  points: number;
  completedAt: string;
  revokedAt?: string | null;
}

/**
 * 兑换记录类型
 */
export interface RedemptionRecord {
  id: string;
  giftName: string;
  giftColor?: string | null;
  points: number;
  status: RedemptionStatus;
  redeemedAt: string;
  confirmedAt?: string | null;
}

/**
 * API 响应类型
 */
export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

/**
 * 积分概览类型
 */
export interface PointsOverview {
  current: number;
  total: number;
  weekly: number;
}

/**
 * 兑换日信息类型
 */
export interface ExchangeDaysInfo {
  days: number[];
  isExchangeDay: boolean;
  nextExchangeDay?: {
    dayOfWeek: number;
    daysUntil: number;
  } | null;
}

/**
 * Session 数据类型
 */
export interface SessionData {
  userId: string;
  role: Role;
  familyId: string;
}

/**
 * Iron-session 配置类型
 */
export interface IronSession {
  session: SessionData;
}
