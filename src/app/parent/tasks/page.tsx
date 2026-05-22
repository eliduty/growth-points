"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Settings, RefreshCw, AlertCircle } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
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
    updateCategoryOrder,
  } = useTasks();

  // 弹窗状态
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [editTaskDialogOpen, setEditTaskDialogOpen] = useState(false);
  const [categoryManageDialogOpen, setCategoryManageDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // 选中的任务
  const [selectedTask, setSelectedTask] = useState<ParentTask | null>(null);

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
      {/* 顶部操作栏 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4"
      >
        <Button
          variant="outline"
          onClick={() => setCategoryManageDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          管理类别
        </Button>

        <Button
          onClick={() => setAddTaskDialogOpen(true)}
          disabled={categories.length === 0 || isCreatingTask}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          添加任务
        </Button>

        {isFetching && (
          <RefreshCw className="w-4 h-4 animate-spin text-text-muted absolute right-4" />
        )}
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