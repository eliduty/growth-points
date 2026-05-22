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
 * 孩子端任务类型
 */
export interface ChildTask {
  id: string;
  name: string;
  points: number;
  description: string | null;
  categoryId: string;
  categoryName: string;
  categoryOrder: number;
  completed: boolean;
  completedAt: string | null;
}

/**
 * 孩子端礼物类型
 */
export interface ChildGift {
  id: string;
  name: string;
  points: number;
  description: string | null;
  color: string | null;
  weeklyLimit: number | null;
  weeklyRedeemed: number;
  limitStatus: "unlimited" | "available" | "exhausted";
  canRedeem: boolean;
}

/**
 * 兑换日信息类型
 */
export interface ExchangeDayInfo {
  days: number[];
  isExchangeDay: boolean;
  nextExchangeDay?: {
    dayOfWeek: number;
    daysUntil: number;
  } | null;
}

/**
 * 孩子端礼物页响应类型
 */
export interface ChildGiftsResponse {
  pointsOverview: {
    current: number;
    total: number;
    weekly: number;
  };
  exchangeDaysInfo: ExchangeDayInfo;
  gifts: ChildGift[];
  pendingRedemptions: {
    id: string;
    giftName: string;
    points: number;
    redeemedAt: string;
  }[];
}

/**
 * 孩子统计信息类型
 */
export interface ChildStats {
  id: string;
  username: string;
  currentPoints: number;
  totalPoints: number;
  weeklyCompleted: number;
  weeklyPoints: number;
  completions: CompletionRecord[];
}

/**
 * 本周统计响应类型
 */
export interface WeeklyStats {
  weekRange: {
    start: string;
    end: string;
  };
  children: ChildStats[];
}

/**
 * 任务类型（家长端）
 */
export interface ParentTask {
  id: string;
  name: string;
  points: number;
  description: string | null;
  categoryId: string;
  categoryName: string;
}

/**
 * 类别类型（含任务）
 */
export interface CategoryWithTasks {
  id: string;
  name: string;
  order: number;
  tasks: ParentTask[];
}

/**
 * 兑换记录类型（家长端）
 */
export interface ParentRedemption {
  id: string;
  giftName: string;
  giftColor: string | null;
  points: number;
  userId: string;
  username: string;
  redeemedAt: string;
  confirmedAt?: string | null;
  status: RedemptionStatus;
}

/**
 * 成员类型
 */
export interface Member {
  id: string;
  username: string;
  role: "PARENT" | "CHILD";
  isMe: boolean;
  currentPoints?: number;
  totalPoints?: number;
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