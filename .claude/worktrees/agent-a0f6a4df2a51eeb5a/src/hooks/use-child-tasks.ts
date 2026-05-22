"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { childTasksApi } from "@/lib/api-child";
import { toast } from "sonner";

export function useChildTasks(date?: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["child-tasks", date],
    queryFn: () => childTasksApi.list(date),
  });

  const completeMutation = useMutation({
    mutationFn: (taskId: string) => childTasksApi.complete(taskId),
    onSuccess: (result) => {
      if (result.code === 0) {
        toast.success(`获得 ${result.data.pointsEarned} 积分！`);
        queryClient.invalidateQueries({ queryKey: ["child-tasks"] });
        queryClient.invalidateQueries({ queryKey: ["child-gifts"] });
      } else {
        toast.error(result.message);
      }
    },
    onError: () => {
      toast.error("完成任务失败，请重试");
    },
  });

  return {
    taskData: data?.data,
    isLoading,
    error,
    completeTask: async (taskId: string) => {
      await completeMutation.mutateAsync(taskId);
    },
    isCompleting: completeMutation.isPending,
  };
}
