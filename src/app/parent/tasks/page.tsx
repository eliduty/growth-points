"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, RefreshCw, AlertCircle, Settings } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { useTopNavbar } from "@/providers/topnavbar-provider";
import { CategorySection } from "@/components/parent/CategorySection";
import { AddTaskDialog } from "@/components/parent/AddTaskDialog";
import { EditTaskDialog } from "@/components/parent/EditTaskDialog";
import { CategoryManageDialog } from "@/components/parent/CategoryManageDialog";
import { DeleteConfirmDialog } from "@/components/parent/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import type { CategoryWithTasks, ParentTask } from "@/types";

export default function ParentTasksPage() {
  const {
    categories,
    categoriesList,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    createTask,
    isCreatingTask,
    updateTask,
    deleteTask,
    createCategory,
    deleteCategory,
    updateCategory,
    updateCategoryOrder,
  } = useTasks();

  const { setConfig } = useTopNavbar();

  // 弹窗状态
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [editTaskDialogOpen, setEditTaskDialogOpen] = useState(false);
  const [categoryManageDialogOpen, setCategoryManageDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // 选中的任务
  const [selectedTask, setSelectedTask] = useState<ParentTask | null>(null);

  // 设置 TopNavbar 操作按钮
  useEffect(() => {
    setConfig({
      action: (
        <div className="flex items-center gap-1">
          {isFetching && <RefreshCw className="w-3 h-3 animate-spin text-text-muted" />}
          <button
            onClick={() => setCategoryManageDialogOpen(true)}
            className="flex items-center justify-center"
            title="管理分类"
          >
            <Settings className="w-5 h-5 stroke-text-secondary stroke-width-2" />
          </button>
          <button
            onClick={() => setAddTaskDialogOpen(true)}
            disabled={categories.length === 0 || isCreatingTask}
            className="flex items-center justify-center"
            title="添加任务"
          >
            <Plus className="w-5 h-5 stroke-primary stroke-width-2" />
          </button>
        </div>
      ),
    });
  }, [setConfig, categories.length, isCreatingTask, isFetching]);

  // 处理编辑任务
  const handleEditTask = (task: ParentTask) => {
    setSelectedTask(task);
    setEditTaskDialogOpen(true);
  };

  // 处理删除任务
  const handleDeleteTask = (task: ParentTask) => {
    setSelectedTask(task);
    setDeleteConfirmOpen(true);
  };

  // 确认删除任务
  const handleConfirmDelete = async () => {
    if (selectedTask) {
      await deleteTask(selectedTask.id);
    }
    setDeleteConfirmOpen(false);
    setSelectedTask(null);
  };

  // 加载状态
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-text-secondary">加载中...</p>
        </div>
      </div>
    );
  }

  // 错误状态
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-red-500 mb-4">{error?.message || "加载失败"}</p>
          <Button onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            重新加载
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* 任务列表 */}
      {categories.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className="text-text-secondary mb-2">暂无类别</p>
          <p className="text-text-secondary text-sm mb-4">请先创建类别</p>
          <Button onClick={() => setCategoryManageDialogOpen(true)}>
            创建类别
          </Button>
        </motion.div>
      ) : (
        categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CategorySection
              category={category}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onManageCategory={() => setCategoryManageDialogOpen(true)}
            />
          </motion.div>
        ))
      )}

      {/* 添加任务弹窗 */}
      <AddTaskDialog
        isOpen={addTaskDialogOpen}
        onClose={() => setAddTaskDialogOpen(false)}
        categories={categories.map((c) => ({ id: c.id, name: c.name, order: c.order }))}
        onAdd={async (data) => {
          await createTask(data);
        }}
      />

      {/* 编辑任务弹窗 */}
      <EditTaskDialog
        isOpen={editTaskDialogOpen}
        onClose={() => {
          setEditTaskDialogOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        categories={categories}
        onUpdate={async (id, data) => {
          await updateTask(id, data);
        }}
      />

      {/* 类别管理弹窗 */}
      <CategoryManageDialog
        isOpen={categoryManageDialogOpen}
        onClose={() => setCategoryManageDialogOpen(false)}
        categories={categoriesList}
        onAddCategory={async (name) => {
          await createCategory(name);
        }}
        onDeleteCategory={async (id) => {
          await deleteCategory(id);
        }}
        onUpdateCategory={async (id, name) => {
          await updateCategory(id, name);
        }}
        onUpdateOrder={async (orders) => {
          await updateCategoryOrder(orders);
        }}
      />

      {/* 删除确认弹窗 */}
      <DeleteConfirmDialog
        isOpen={deleteConfirmOpen}
        title="删除任务"
        content={selectedTask ? `确定要删除任务「${selectedTask.name}」吗？` : ""}
        destructive
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setSelectedTask(null);
        }}
      />
    </div>
  );
}