"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { statsApi, completionsApi } from "@/lib/api-parent";
import { toast } from "sonner";
import type { WeeklyStats } from "@/types";

interface UseParentStatsOptions {
  weekStart?: string;
}

export function useParentStats(options?: UseParentStatsOptions) {
  const queryClient = useQueryClient();

  // 获取本周统计数据
  const query = useQuery({
    queryKey: ["parent-stats", options?.weekStart],
    queryFn: async () => {
      const response = await statsApi.getWeekly(options?.weekStart);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data as WeeklyStats;
    },
  });

  // 撤销完成记录
  const revokeMutation = useMutation({
    mutationFn: async (completionId: string) => {
      const response = await completionsApi.revoke(completionId);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`撤销成功，扣除 ${data.pointsRevoked} 积分`);
      // 刷新统计数据
      queryClient.invalidateQueries({ queryKey: ["parent-stats"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "撤销失败");
    },
  });

  return {
    // 数据
    weeklyStats: query.data,
    weekRange: query.data?.weekRange,
    children: query.data?.children || [],
    // 加载状态
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    // 撤销
    revokeCompletion: revokeMutation.mutate,
    isRevoking: revokeMutation.isPending,
    // 刷新
    refetch: query.refetch,
  };
}