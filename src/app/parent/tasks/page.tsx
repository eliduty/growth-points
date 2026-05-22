"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, RefreshCw, AlertCircle } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { CategorySection } from "@/components/parent/CategorySection";
import { AddTaskDialog } from "@/components/parent/AddTaskDialog";
import { EditTaskDialog } from "@/components/parent/EditTaskDialog";
import { CategoryManageDialog } from "@/components/parent/CategoryManageDialog";
import { BottomMenu, MenuItem } from "@/components/parent/BottomMenu";
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
    isUpdatingTask,
    deleteTask,
    isDeletingTask,
    createCategory,
    deleteCategory,
    updateCategoryOrder,
  } = useTasks();

  // 弹窗状态
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [editTaskDialogOpen, setEditTaskDialogOpen] = useState(false);
  const [categoryManageDialogOpen, setCategoryManageDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // 选中的任务和类别
  const [selectedTask, setSelectedTask] = useState<ParentTask | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryWithTasks | null>(null);

  // 底部菜单状态
  const [taskMenuOpen, setTaskMenuOpen] = useState(false);
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);

  // 任务长按处理
  const handleTaskLongPress = (task: ParentTask) => {
    setSelectedTask(task);
    setTaskMenuOpen(true);
  };

  // 类别长按处理
  const handleCategoryLongPress = (category: CategoryWithTasks) => {
    setSelectedCategory(category);
    setCategoryMenuOpen(true);
  };

  // 任务菜单项
  const taskMenuItems: MenuItem[] = [
    {
      label: "编辑任务",
      onClick: () => {
        setEditTaskDialogOpen(true);
      },
    },
    {
      label: "删除任务",
      destructive: true,
      onClick: () => {
        setDeleteConfirmOpen(true);
      },
    },
  ];

  // 类别菜单项
  const categoryMenuItems: MenuItem[] = [
    {
      label: "管理类别",
      onClick: () => {
        setCategoryManageDialogOpen(true);
      },
    },
  ];

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
      {/* 头部 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <h1 className="text-xl font-bold text-text">任务管理</h1>
        <div className="flex items-center gap-2">
          {isFetching && (
            <div className="flex items-center gap-1 text-xs text-text-secondary">
              <RefreshCw className="w-3 h-3 animate-spin" />
              <span>刷新中...</span>
            </div>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCategoryManageDialogOpen(true)}
          >
            管理类别
          </Button>
        </div>
      </motion.div>

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
        <>
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <CategorySection
                category={category}
                onTaskLongPress={handleTaskLongPress}
                onCategoryLongPress={handleCategoryLongPress}
              />
            </motion.div>
          ))}

          {/* 添加任务按钮 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center pt-4"
          >
            <Button
              onClick={() => setAddTaskDialogOpen(true)}
              disabled={categories.length === 0 || isCreatingTask}
            >
              <Plus className="w-5 h-5 mr-2" />
              添加任务
            </Button>
          </motion.div>
        </>
      )}

      {/* 底部菜单 - 任务 */}
      <BottomMenu
        open={taskMenuOpen}
        onClose={() => {
          setTaskMenuOpen(false);
          setSelectedTask(null);
        }}
        title={selectedTask?.name || ""}
        subtitle={selectedTask ? `${selectedTask.points} 积分` : ""}
        items={taskMenuItems}
      />

      {/* 底部菜单 - 类别 */}
      <BottomMenu
        open={categoryMenuOpen}
        onClose={() => {
          setCategoryMenuOpen(false);
          setSelectedCategory(null);
        }}
        title={selectedCategory?.name || ""}
        subtitle={selectedCategory ? `${selectedCategory.tasks.length} 个任务` : ""}
        items={categoryMenuItems}
      />

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