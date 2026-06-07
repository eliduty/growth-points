import { ApiResponse } from "@/types";
import { edgeFetch } from "@/lib/edge-fetch";

const API_BASE = "/api/child";

/**
 * 任务相关 API
 */
export const childTasksApi = {
  list: async (date?: string): Promise<ApiResponse<{
    pointsOverview: { current: number; total: number; weekly: number };
    categories: { id: string; name: string; order: number; tasks: import("@/types").ChildTask[] }[];
    completedTasks: { id: string; taskName: string; points: number; completedAt: string }[];
  }>> => {
    const url = date ? `${API_BASE}/tasks?date=${date}` : `${API_BASE}/tasks`;
    const res = await edgeFetch(url);
    return res.json();
  },
  complete: async (taskId: string): Promise<ApiResponse<{ pointsEarned: number; currentPoints: number }>> => {
    const res = await edgeFetch(`${API_BASE}/tasks/${taskId}/complete`, { method: "POST" });
    return res.json();
  },
};

/**
 * 礼物相关 API
 */
export const childGiftsApi = {
  list: async (): Promise<ApiResponse<import("@/types").ChildGiftsResponse>> => {
    const res = await edgeFetch(`${API_BASE}/gifts`);
    return res.json();
  },
  redeem: async (giftId: string): Promise<ApiResponse<{
    redemptionId: string;
    pointsSpent: number;
    currentPoints: number;
    status: "PENDING";
  }>> => {
    const res = await edgeFetch(`${API_BASE}/gifts/redeem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ giftId }),
    });
    return res.json();
  },
};

/**
 * 历史记录相关 API
 */
export const childHistoryApi = {
  completions: async (weeks?: number): Promise<ApiResponse<{
    weekRange: { start: string; end: string };
    completions: { id: string; taskName: string; points: number; completedAt: string; revoked: boolean }[];
    summary: { completed: number; points: number };
  }[]>> => {
    const url = weeks ? `${API_BASE}/history/completions?weeks=${weeks}` : `${API_BASE}/history/completions`;
    const res = await edgeFetch(url);
    return res.json();
  },
  redemptions: async (weeks?: number): Promise<ApiResponse<{
    weekRange: { start: string; end: string };
    redemptions: { id: string; giftName: string; giftColor: string | null; points: number; redeemedAt: string; status: "PENDING" | "CONFIRMED" | "CANCELLED"; confirmedAt?: string; cancelledAt?: string }[];
    summary: { confirmed: number; pointsSpent: number; pending: number };
  }[]>> => {
    const url = weeks ? `${API_BASE}/history/redemptions?weeks=${weeks}` : `${API_BASE}/history/redemptions`;
    const res = await edgeFetch(url);
    return res.json();
  },
  rewards: async (weeks?: number): Promise<ApiResponse<{
    weekRange: { start: string; end: string };
    rewards: { id: string; points: number; reason: string; createdAt: string }[];
    summary: { rewards: number; points: number };
  }[]>> => {
    const url = weeks ? `${API_BASE}/history/rewards?weeks=${weeks}` : `${API_BASE}/history/rewards`;
    const res = await edgeFetch(url);
    return res.json();
  },
};
