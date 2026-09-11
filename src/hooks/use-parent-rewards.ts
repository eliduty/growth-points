"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { rewardsApi } from "@/lib/api-parent";
import { toast } from "sonner";
import type { RewardRecord } from "@/types";

interface UseParentRewardsOptions {
  userId?: string;
  weekStart?: string;
}

export function useParentRewards(options?: UseParentRewardsOptions) {
  const queryClient = useQueryClient();

  // 获取奖励记录列表
  const query = useQuery({
    queryKey: ["parent-rewards", options?.userId, options?.weekStart],
    queryFn: async () => {
      const response = await rewardsApi.list(options?.userId, options?.weekStart);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data as RewardRecord[];
    },
  });

  // 创建奖励
  const createMutation = useMutation({
    mutationFn: async (data: { userId: string; points: number; reason: string }) => {
      const response = await rewardsApi.create(data);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(`奖励成功，${data.username} 获得 ${data.points} 积分`);
      // 刷新相关数据
      queryClient.invalidateQueries({ queryKey: ["parent-stats"] });
      queryClient.invalidateQueries({ queryKey: ["parent-rewards"] });
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "奖励失败");
    },
  });

  return {
    // 数据
    rewards: query.data || [],
    // 加载状态
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    // 创建奖励
    createReward: createMutation.mutate,
    isCreating: createMutation.isPending,
    // 刷新
    refetch: query.refetch,
  };
}