"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { giftsApi, redemptionsApi } from "@/lib/api-parent";
import { toast } from "sonner";
import type { ParentRedemption } from "@/types";

interface Gift {
  id: string;
  name: string;
  points: number;
  description: string | null;
  color: string | null;
  weeklyLimit: number | null;
}

export function useGifts() {
  const queryClient = useQueryClient();

  // 获取礼物列表
  const giftsQuery = useQuery({
    queryKey: ["parent-gifts"],
    queryFn: async () => {
      const response = await giftsApi.list();
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data as Gift[];
    },
  });

  // 获取兑换记录
  const redemptionsQuery = useQuery({
    queryKey: ["parent-redemptions"],
    queryFn: async () => {
      const response = await redemptionsApi.list();
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data as { pending: ParentRedemption[]; confirmed: ParentRedemption[] };
    },
  });

  // 创建礼物
  const createMutation = useMutation({
    mutationFn: async (data: { name: string; points: number; description?: string; weeklyLimit?: number | null }) => {
      const response = await giftsApi.create(data);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data as Gift;
    },
    onSuccess: () => {
      toast.success("礼物创建成功");
      queryClient.invalidateQueries({ queryKey: ["parent-gifts"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "创建失败");
    },
  });

  // 更新礼物
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<{ name: string; points: number; description: string; weeklyLimit: number | null }> }) => {
      const response = await giftsApi.update(id, data);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data as Gift;
    },
    onSuccess: () => {
      toast.success("礼物更新成功");
      queryClient.invalidateQueries({ queryKey: ["parent-gifts"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "更新失败");
    },
  });

  // 删除礼物
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await giftsApi.delete(id);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("礼物删除成功");
      queryClient.invalidateQueries({ queryKey: ["parent-gifts"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "删除失败");
    },
  });

  // 确认兑换
  const confirmMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await redemptionsApi.confirm(id);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("兑换确认成功");
      queryClient.invalidateQueries({ queryKey: ["parent-redemptions"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "确认失败");
    },
  });

  // 撤销兑换
  const cancelMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await redemptionsApi.cancel(id);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data as { giftName: string; username: string; pointsReturned: number };
    },
    onSuccess: (data) => {
      toast.success(`已撤销「${data.giftName}」的兑换，返还 ${data.pointsReturned} 积分给 ${data.username}`);
      queryClient.invalidateQueries({ queryKey: ["parent-redemptions"] });
      queryClient.invalidateQueries({ queryKey: ["parent-stats"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "撤销失败");
    },
  });

  return {
    // 礼物数据
    gifts: giftsQuery.data || [],
    isLoadingGifts: giftsQuery.isLoading,
    isFetchingGifts: giftsQuery.isFetching,
    isGiftsError: giftsQuery.isError,
    giftsError: giftsQuery.error,
    refetchGifts: giftsQuery.refetch,

    // 兑换记录数据
    pendingRedemptions: redemptionsQuery.data?.pending || [],
    confirmedRedemptions: redemptionsQuery.data?.confirmed || [],
    isLoadingRedemptions: redemptionsQuery.isLoading,
    isFetchingRedemptions: redemptionsQuery.isFetching,
    isRedemptionsError: redemptionsQuery.isError,
    redemptionsError: redemptionsQuery.error,
    refetchRedemptions: redemptionsQuery.refetch,

    // 礼物操作
    createGift: createMutation.mutate,
    isCreatingGift: createMutation.isPending,
    updateGift: (id: string, data: Partial<{ name: string; points: number; description: string; weeklyLimit: number | null }>) => updateMutation.mutate({ id, data }),
    isUpdatingGift: updateMutation.isPending,
    deleteGift: deleteMutation.mutate,
    isDeletingGift: deleteMutation.isPending,

    // 兑换操作
    confirmRedemption: confirmMutation.mutate,
    isConfirmingRedemption: confirmMutation.isPending,
    cancelRedemption: cancelMutation.mutate,
    isCancellingRedemption: cancelMutation.isPending,

    // 加载状态汇总
    isLoading: giftsQuery.isLoading || redemptionsQuery.isLoading,
    isFetching: giftsQuery.isFetching || redemptionsQuery.isFetching,
    isError: giftsQuery.isError || redemptionsQuery.isError,
    error: giftsQuery.error || redemptionsQuery.error,
    refetch: () => {
      giftsQuery.refetch();
      redemptionsQuery.refetch();
    },
  };
}