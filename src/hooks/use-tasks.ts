"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tasksApi, categoriesApi } from "@/lib/api-parent";
import { toast } from "sonner";
import type { CategoryWithTasks, ParentTask } from "@/types";

export function useTasks() {
  const queryClient = useQueryClient();

  // 获取任务列表（按类别分组）
  const tasksQuery = useQuery({
    queryKey: ["parent-tasks"],
    queryFn: async () => {
      const response = await tasksApi.list();
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data as { categories: CategoryWithTasks[] };
    },
  });

  // 获取类别列表
  const categoriesQuery = useQuery({
    queryKey: ["parent-categories"],
    queryFn: async () => {
      const response = await categoriesApi.list();
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data as { id: string; name: string; order: number; taskCount: number }[];
    },
  });

  // 创建任务
  const createMutation = useMutation({
    mutationFn: async (data: { name: string; points: number; categoryId: string; description?: string }) => {
      const response = await tasksApi.create(data);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data as ParentTask;
    },
    onSuccess: () => {
      toast.success("任务创建成功");
      queryClient.invalidateQueries({ queryKey: ["parent-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["parent-categories"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "创建失败");
    },
  });

  // 更新任务
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<{ name: string; points: number; categoryId: string; description: string; availableDays: string | null }> }) => {
      const response = await tasksApi.update(id, data);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data as ParentTask;
    },
    onSuccess: () => {
      toast.success("任务更新成功");
      queryClient.invalidateQueries({ queryKey: ["parent-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["parent-categories"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "更新失败");
    },
  });

  // 删除任务
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await tasksApi.delete(id);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("任务删除成功");
      queryClient.invalidateQueries({ queryKey: ["parent-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["parent-categories"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "删除失败");
    },
  });

  // 创建类别
  const createCategoryMutation = useMutation({
    mutationFn: async (name: string) => {
      const response = await categoriesApi.create(name);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data as { id: string; name: string; order: number };
    },
    onSuccess: () => {
      toast.success("类别创建成功");
      queryClient.invalidateQueries({ queryKey: ["parent-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["parent-categories"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "创建失败");
    },
  });

  // 删除类别
  const deleteCategoryMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await categoriesApi.delete(id);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: () => {
      toast.success("类别删除成功");
      queryClient.invalidateQueries({ queryKey: ["parent-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["parent-categories"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "删除失败");
    },
  });

  // 更新类别名称
  const updateCategoryMutation = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const response = await categoriesApi.update(id, name);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data as { id: string; name: string; order: number };
    },
    onSuccess: () => {
      toast.success("类别名称已更新");
      queryClient.invalidateQueries({ queryKey: ["parent-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["parent-categories"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "更新失败");
    },
  });

  // 更新类别顺序
  const updateCategoryOrderMutation = useMutation({
    mutationFn: async (orders: { id: string; order: number }[]) => {
      const response = await categoriesApi.updateOrder(orders);
      if (response.code !== 0) {
        throw new Error(response.message);
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["parent-tasks"] });
      queryClient.invalidateQueries({ queryKey: ["parent-categories"] });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : "更新顺序失败");
    },
  });

  return {
    // 任务数据
    categories: tasksQuery.data?.categories || [],
    categoriesList: categoriesQuery.data || [],
    isLoading: tasksQuery.isLoading || categoriesQuery.isLoading,
    isFetching: tasksQuery.isFetching || categoriesQuery.isFetching,
    isError: tasksQuery.isError || categoriesQuery.isError,
    error: tasksQuery.error || categoriesQuery.error,
    refetch: () => {
      tasksQuery.refetch();
      categoriesQuery.refetch();
    },

    // 任务操作
    createTask: createMutation.mutate,
    isCreatingTask: createMutation.isPending,
    updateTask: (id: string, data: Partial<{ name: string; points: number; categoryId: string; description: string; availableDays: string | null }>) => updateMutation.mutate({ id, data }),
    isUpdatingTask: updateMutation.isPending,
    deleteTask: deleteMutation.mutate,
    isDeletingTask: deleteMutation.isPending,

    // 类别操作
    createCategory: createCategoryMutation.mutate,
    isCreatingCategory: createCategoryMutation.isPending,
    deleteCategory: deleteCategoryMutation.mutate,
    isDeletingCategory: deleteCategoryMutation.isPending,
    updateCategory: (id: string, name: string) => updateCategoryMutation.mutate({ id, name }),
    isUpdatingCategory: updateCategoryMutation.isPending,
    updateCategoryOrder: updateCategoryOrderMutation.mutate,
    isUpdatingCategoryOrder: updateCategoryOrderMutation.isPending,
  };
}