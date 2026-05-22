"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { childGiftsApi } from "@/lib/api-child";
import { toast } from "sonner";

export function useChildGifts() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["child-gifts"],
    queryFn: () => childGiftsApi.list(),
  });

  const redeemMutation = useMutation({
    mutationFn: (giftId: string) => childGiftsApi.redeem(giftId),
    onSuccess: (result) => {
      if (result.code === 0) {
        toast.success(`兑换成功！消耗 ${result.data.pointsSpent} 积分`);
        queryClient.invalidateQueries({ queryKey: ["child-gifts"] });
        queryClient.invalidateQueries({ queryKey: ["child-tasks"] });
      } else {
        toast.error(result.message);
      }
    },
    onError: () => {
      toast.error("兑换失败，请重试");
    },
  });

  return {
    giftsData: data?.data,
    isLoading,
    error,
    redeemGift: async (giftId: string) => {
      await redeemMutation.mutateAsync(giftId);
    },
    isRedeeming: redeemMutation.isPending,
  };
}
