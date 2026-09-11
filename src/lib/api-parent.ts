import {
  ApiResponse,
  WeeklyStats,
  CategoryWithTasks,
  ParentTask,
  ParentRedemption,
  Member,
  RewardRecord,
} from "@/types";

const API_BASE = "/api/parent";

/**
 * 统计相关 API
 */
export const statsApi = {
  getWeekly: async (weekStart?: string): Promise<ApiResponse<WeeklyStats>> => {
    const url = weekStart ? `${API_BASE}/stats?weekStart=${weekStart}` : `${API_BASE}/stats`;
    const res = await fetch(url);
    return res.json();
  },
};

/**
 * 完成记录相关 API
 */
export const completionsApi = {
  revoke: async (id: string): Promise<ApiResponse<{ pointsRevoked: number; redemptionsCancelled: number }>> => {
    const res = await fetch(`${API_BASE}/completions/${id}`, { method: "DELETE" });
    return res.json();
  },
};

/**
 * 任务相关 API
 */
export const tasksApi = {
  list: async (): Promise<ApiResponse<{ categories: CategoryWithTasks[] }>> => {
    const res = await fetch(`${API_BASE}/tasks`);
    return res.json();
  },
  create: async (data: { name: string; points: number; categoryId: string; description?: string }): Promise<ApiResponse<ParentTask>> => {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  update: async (id: string, data: Partial<{ name: string; points: number; categoryId: string; description: string; availableDays: string | null }>): Promise<ApiResponse<ParentTask>> => {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
    return res.json();
  },
};

/**
 * 类别相关 API
 */
export const categoriesApi = {
  list: async (): Promise<ApiResponse<{ id: string; name: string; order: number; taskCount: number }[]>> => {
    const res = await fetch(`${API_BASE}/categories`);
    return res.json();
  },
  create: async (name: string): Promise<ApiResponse<{ id: string; name: string; order: number }>> => {
    const res = await fetch(`${API_BASE}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    return res.json();
  },
  update: async (id: string, name: string): Promise<ApiResponse<{ id: string; name: string; order: number }>> => {
    const res = await fetch(`${API_BASE}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    return res.json();
  },
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const res = await fetch(`${API_BASE}/categories/${id}`, { method: "DELETE" });
    return res.json();
  },
  updateOrder: async (orders: { id: string; order: number }[]): Promise<ApiResponse<null>> => {
    const res = await fetch(`${API_BASE}/categories/order`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orders }),
    });
    return res.json();
  },
};

/**
 * 礼物相关 API
 */
export const giftsApi = {
  list: async (): Promise<ApiResponse<{ id: string; name: string; points: number; description: string | null; color: string | null; weeklyLimit: number | null }[]>> => {
    const res = await fetch(`${API_BASE}/gifts`);
    return res.json();
  },
  create: async (data: { name: string; points: number; description?: string; weeklyLimit?: number | null }): Promise<ApiResponse<{ id: string; name: string; points: number; description: string | null; color: string; weeklyLimit: number | null }>> => {
    const res = await fetch(`${API_BASE}/gifts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  update: async (id: string, data: Partial<{ name: string; points: number; description: string; weeklyLimit: number | null }>): Promise<ApiResponse<{ id: string; name: string; points: number; description: string | null; color: string | null; weeklyLimit: number | null }>> => {
    const res = await fetch(`${API_BASE}/gifts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const res = await fetch(`${API_BASE}/gifts/${id}`, { method: "DELETE" });
    return res.json();
  },
};

/**
 * 兑换记录相关 API
 */
export const redemptionsApi = {
  list: async (): Promise<ApiResponse<{ pending: ParentRedemption[]; confirmed: ParentRedemption[] }>> => {
    const res = await fetch(`${API_BASE}/gifts/redemptions`);
    return res.json();
  },
  confirm: async (id: string): Promise<ApiResponse<null>> => {
    const res = await fetch(`${API_BASE}/gifts/redemptions/${id}/confirm`, { method: "PUT" });
    return res.json();
  },
  cancel: async (id: string): Promise<ApiResponse<{ giftName: string; username: string; pointsReturned: number }>> => {
    const res = await fetch(`${API_BASE}/gifts/redemptions/${id}/cancel`, { method: "PUT" });
    return res.json();
  },
};

/**
 * 成员相关 API
 */
export const membersApi = {
  list: async (): Promise<ApiResponse<{ children: Member[]; parents: Member[] }>> => {
    const res = await fetch(`${API_BASE}/members`);
    return res.json();
  },
  add: async (data: { username: string; password: string; role: "PARENT" | "CHILD" }): Promise<ApiResponse<{ id: string; username: string; role: string; familyId: string }>> => {
    const res = await fetch(`${API_BASE}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const res = await fetch(`${API_BASE}/members/${id}`, { method: "DELETE" });
    return res.json();
  },
};

/**
 * 兑换日相关 API
 */
export const exchangeDaysApi = {
  get: async (): Promise<ApiResponse<number[]>> => {
    const res = await fetch(`${API_BASE}/exchange-days`);
    return res.json();
  },
  update: async (days: number[]): Promise<ApiResponse<number[]>> => {
    const res = await fetch(`${API_BASE}/exchange-days`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ days }),
    });
    return res.json();
  },
};

/**
 * 奖励相关 API
 */
export const rewardsApi = {
  list: async (
    userId?: string,
    weekStart?: string
  ): Promise<ApiResponse<RewardRecord[]>> => {
    const params = new URLSearchParams();
    if (userId) params.set("userId", userId);
    if (weekStart) params.set("weekStart", weekStart);
    const query = params.toString();
    const url = query ? `${API_BASE}/rewards?${query}` : `${API_BASE}/rewards`;
    const res = await fetch(url);
    return res.json();
  },
  create: async (data: { userId: string; points: number; reason: string }): Promise<ApiResponse<RewardRecord>> => {
    const res = await fetch(`${API_BASE}/rewards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};