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
  exchangeDaysInfo: ExchangeDayInfo;
  gifts: ChildGift[];
  pendingRedemptions: {
    id: string;
    giftName: string;
    points: number;
    redeemedAt: string;
  }[];
}
