"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GripVertical, Trash2, Plus, Check, X } from "lucide-react";
import { cn } from "@/lib/cn";

interface Category {
  id: string;
  name: string;
  order: number;
  taskCount?: number;
}

interface CategoryManageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onAddCategory: (name: string) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
  onUpdateCategory?: (id: string, name: string) => Promise<void>;
  onUpdateOrder: (orders: { id: string; order: number }[]) => Promise<void>;
}

export function CategoryManageDialog({
  isOpen,
  onClose,
  categories,
  onAddCategory,
  onDeleteCategory,
  onUpdateCategory,
  onUpdateOrder,
}: CategoryManageDialogProps) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [localCategories, setLocalCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // 编辑状态
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // 当 categories 变化时，同步本地状态
  useEffect(() => {
    setLocalCategories([...categories]);
  }, [categories]);

  // 编辑模式自动聚焦
  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingId]);

  const syncCategories = () => {
    setLocalCategories([...categories]);
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.warning("请输入类别名称");
      return;
    }

    setIsLoading(true);
    try {
      await onAddCategory(newCategoryName.trim());
      setNewCategoryName("");
      syncCategories();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "创建失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string, taskCount: number) => {
    if (taskCount > 0) {
      toast.warning("该类别下还有任务，无法删除");
      return;
    }

    setIsLoading(true);
    try {
      await onDeleteCategory(id);
      syncCategories();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "删除失败");
    } finally {
      setIsLoading(false);
    }
  };

  // 进入编辑模式
  const handleStartEdit = (category: Category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  // 保存编辑
  const handleSaveEdit = async () => {
    if (!editingId || !editingName.trim()) {
      cancelEdit();
      return;
    }

    // 检查名称是否有变化
    const originalCategory = categories.find((c) => c.id === editingId);
    if (originalCategory && originalCategory.name === editingName.trim()) {
      cancelEdit();
      return;
    }

    if (!onUpdateCategory) {
      toast.error("更新功能未启用");
      cancelEdit();
      return;
    }

    setIsLoading(true);
    try {
      await onUpdateCategory(editingId, editingName.trim());
      syncCategories();
      cancelEdit();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "更新失败");
    } finally {
      setIsLoading(false);
    }
  };

  // 取消编辑
  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  // 拖拽排序相关
  const handleDragStart = (index: number) => {
    // 编辑状态下禁用拖拽
    if (editingId) return;
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newCategories = [...localCategories];
    const draggedItem = newCategories[draggedIndex];
    newCategories.splice(draggedIndex, 1);
    newCategories.splice(targetIndex, 0, draggedItem);

    newCategories.forEach((cat, idx) => {
      cat.order = idx;
    });

    setLocalCategories(newCategories);
    setDraggedIndex(targetIndex);
  };

  const handleDragEnd = async () => {
    if (draggedIndex === null) return;

    setDraggedIndex(null);

    const orders = localCategories.map((cat) => ({
      id: cat.id,
      order: cat.order,
    }));

    setIsLoading(true);
    try {
      await onUpdateOrder(orders);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "更新失败");
      syncCategories();
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setNewCategoryName("");
    cancelEdit();
    syncCategories();
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === "Escape") {
      e.preventDefault();
      cancelEdit();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>管理类别</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 添加新类别 */}
          <div className="flex gap-2">
            <Input
              placeholder="输入新类别名称"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              disabled={isLoading}
              maxLength={20}
            />
            <Button
              onClick={handleAddCategory}
              disabled={isLoading || !newCategoryName.trim()}
              size="icon"
            >
              <Plus className="w-5 h-5" />
            </Button>
          </div>

          {/* 类别列表 */}
          <div className="space-y-2">
            <Label className="text-text-secondary">
              点击名称编辑，拖拽调整顺序
            </Label>

            {categories.length === 0 ? (
              <div className="text-center py-4 text-text-secondary">
                暂无类别
              </div>
            ) : (
              categories.map((category, index) => (
                <div
                  key={category.id}
                  draggable={!editingId}
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    "flex items-center gap-3 p-3 bg-card rounded-lg border border-border",
                    "transition-all",
                    editingId === category.id
                      ? "cursor-default border-primary"
                      : "cursor-move select-none",
                    draggedIndex === index && "opacity-50 scale-[0.98]"
                  )}
                >
                  {/* 拖拽图标（编辑时隐藏） */}
                  {editingId === category.id ? (
                    <div className="w-5 h-5 shrink-0" />
                  ) : (
                    <GripVertical className="w-5 h-5 text-text-muted shrink-0" />
                  )}

                  {/* 类别名称 */}
                  {editingId === category.id ? (
                    <Input
                      ref={inputRef}
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onBlur={handleSaveEdit}
                      disabled={isLoading}
                      maxLength={20}
                      className="flex-1 h-8"
                    />
                  ) : (
                    <span
                      onClick={() => handleStartEdit(category)}
                      className="flex-1 font-medium text-text cursor-pointer hover:text-primary transition-colors"
                      title="点击编辑名称"
                    >
                      {category.name}
                    </span>
                  )}

                  {/* 任务数量 */}
                  <span className="text-sm text-text-secondary">
                    {category.taskCount || 0} 任务
                  </span>

                  {/* 编辑时显示保存/取消按钮，否则显示删除按钮 */}
                  {editingId === category.id ? (
                    <div className="flex gap-1 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={handleSaveEdit}
                        disabled={isLoading}
                        className="text-primary hover:bg-primary/10"
                      >
                        <Check className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={cancelEdit}
                        disabled={isLoading}
                        className="text-text-muted hover:bg-gray-100"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        handleDeleteCategory(category.id, category.taskCount || 0)
                      }
                      disabled={isLoading || (category.taskCount || 0) > 0}
                      className="shrink-0 text-error hover:bg-error/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>

          {/* 提示 */}
          <p className="text-xs text-text-muted">
            类别下有任务时无法删除，请先删除或移动任务
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}