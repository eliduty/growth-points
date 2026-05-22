/**
 * 礼物颜色池
 */
export const GIFT_COLORS = [
  { name: "活力橙", value: "#FF6B35" },
  { name: "薄荷绿", value: "#4ECDC4" },
  { name: "奶黄", value: "#FFD93D" },
  { name: "天蓝", value: "#60A5FA" },
  { name: "紫罗兰", value: "#A78BFA" },
  { name: "蜜橙", value: "#FB923C" },
];

/**
 * 随机获取礼物颜色
 */
export function getRandomGiftColor(): string {
  const index = Math.floor(Math.random() * GIFT_COLORS.length);
  return GIFT_COLORS[index].value;
}

/**
 * 用户角色枚举值
 */
export const ROLES = {
  PARENT: "PARENT",
  CHILD: "CHILD",
} as const;

/**
 * 兑换状态枚举值
 */
export const REDEMPTION_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
} as const;

/**
 * 星期几映射
 */
export const DAY_OF_WEEK_MAP: Record<number, string> = {
  0: "周日",
  1: "周一",
  2: "周二",
  3: "周三",
  4: "周四",
  5: "周五",
  6: "周六",
};

/**
 * Session 配置常量
 */
export const SESSION_CONFIG = {
  cookieName: "family_points_session",
  ttl: 7 * 24 * 60 * 60, // 7 天
  password: process.env.SESSION_PASSWORD || "complex_password_at_least_32_characters_long_for_security",
} as const;
