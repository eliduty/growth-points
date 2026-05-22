"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { membersApi, exchangeDaysApi } from "@/lib/api-parent";
import { toast } from "sonner";
import type { Member } from "@/types";

export function useMembers() {
  const queryClient = useQueryClient();

  // 获取成员列表
  const membersQuery = useQuery({
    queryKey: ["parent-members"],
    queryFn: async () => {
      const response = await membersApi.list();
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data as { children: Member[]; parents: Member[] };
    },
  });

  // 添加成员
  const addMutation = useMutation({
    mutationFn: async (data: { username: string; password: string; role: "PARENT" | "CHILD" }) => {
      const response = await membersApi.add(data);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("成员添加成功");
      queryClient.invalidateQueries({ queryKey: ["parent-members"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "添加失败");
    },
  });

  // 删除成员
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await membersApi.delete(id);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("成员删除成功");
      queryClient.invalidateQueries({ queryKey: ["parent-members"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "删除失败");
    },
  });

  return {
    // 成员数据
    children: membersQuery.data?.children || [],
    parents: membersQuery.data?.parents || [],
    isLoading: membersQuery.isLoading,
    isFetching: membersQuery.isFetching,
    isError: membersQuery.isError,
    error: membersQuery.error,
    refetch: membersQuery.refetch,

    // 成员操作
    addMember: addMutation.mutate,
    isAddingMember: addMutation.isPending,
    deleteMember: deleteMutation.mutate,
    isDeletingMember: deleteMutation.isPending,
  };
}

export function useExchangeDays() {
  const queryClient = useQueryClient();

  // 获取兑换日设置
  const exchangeDaysQuery = useQuery({
    queryKey: ["parent-exchange-days"],
    queryFn: async () => {
      const response = await exchangeDaysApi.get();
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data as number[];
    },
  });

  // 更新兑换日设置
  const updateMutation = useMutation({
    mutationFn: async (days: number[]) => {
      const response = await exchangeDaysApi.update(days);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("兑换日设置成功");
      queryClient.invalidateQueries({ queryKey: ["parent-exchange-days"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "设置失败");
    },
  });

  return {
    // 兑换日数据
    exchangeDays: exchangeDaysQuery.data || [],
    isLoading: exchangeDaysQuery.isLoading,
    isError: exchangeDaysQuery.isError,
    error: exchangeDaysQuery.error,
    refetch: exchangeDaysQuery.refetch,

    // 兑换日操作
    updateExchangeDays: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
  };
}