"use client";

import { useQuery } from "@tanstack/react-query";
import { childHistoryApi } from "@/lib/api-child";

export function useChildHistory(weeks: number = 4) {
  const {
    data: completionsData,
    isLoading: isLoadingCompletions,
    error: completionsError,
  } = useQuery({
    queryKey: ["child-history-completions", weeks],
    queryFn: () => childHistoryApi.completions(weeks),
  });

  const {
    data: redemptionsData,
    isLoading: isLoadingRedemptions,
    error: redemptionsError,
  } = useQuery({
    queryKey: ["child-history-redemptions", weeks],
    queryFn: () => childHistoryApi.redemptions(weeks),
  });

  const {
    data: rewardsData,
    isLoading: isLoadingRewards,
    error: rewardsError,
  } = useQuery({
    queryKey: ["child-history-rewards", weeks],
    queryFn: () => childHistoryApi.rewards(weeks),
  });

  return {
    completions: completionsData?.data ?? [],
    redemptions: redemptionsData?.data ?? [],
    rewards: rewardsData?.data ?? [],
    isLoading: isLoadingCompletions || isLoadingRedemptions || isLoadingRewards,
    error: completionsError || redemptionsError || rewardsError,
  };
}
