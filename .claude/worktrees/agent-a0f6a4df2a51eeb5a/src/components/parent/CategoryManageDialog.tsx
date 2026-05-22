"use client";

import { useState } from "react";
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
import { GripVertical, Trash2, Plus } from "lucide-react";
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
  onUpdateOrder: (orders: { id: string; order: number }[]) => Promise<void>;
}

export function CategoryManageDialog({
  isOpen,
  onClose,
  categories,
  onAddCategory,
  onDeleteCategory,
  onUpdateOrder,
}: CategoryManageDialogProps) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [localCategories, setLocalCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // 当 categories 变化时，同步本地状态
  useState(() => {
    setLocalCategories([...categories]);
  });

  // 同步外部 categories 到本地
  const syncCategories = () => {
    setLocalCategories([...categories]);
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("请输入类别名称");
      return;
    }

    setIsLoading(true);
    try {
      await onAddCategory(newCategoryName.trim());
      setNewCategoryName("");
      syncCategories();
      toast.success("类别创建成功");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "创建失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string, taskCount: number) => {
    if (taskCount > 0) {
      toast.error("该类别下还有任务，无法删除");
      return;
    }

    setIsLoading(true);
    try {
      await onDeleteCategory(id);
      syncCategories();
      toast.success("类别删除成功");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "删除失败");
    } finally {
      setIsLoading(false);
    }
  };

  // 拖拽排序相关
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const newCategories = [...localCategories];
    const draggedItem = newCategories[draggedIndex];
    newCategories.splice(draggedIndex, 1);
    newCategories.splice(targetIndex, 0, draggedItem);

    // 更新 order 值
    newCategories.forEach((cat, idx) => {
      cat.order = idx;
    });

    setLocalCategories(newCategories);
    setDraggedIndex(targetIndex);
  };

  const handleDragEnd = async () => {
    if (draggedIndex === null) return;

    setDraggedIndex(null);

    // 保存顺序到服务器
    const orders = localCategories.map((cat) => ({
      id: cat.id,
      order: cat.order,
    }));

    setIsLoading(true);
    try {
      await onUpdateOrder(orders);
      toast.success("类别顺序已更新");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "更新失败");
      syncCategories(); // 恢复原顺序
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setNewCategoryName("");
    syncCategories();
    onClose();
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

          {/* 类别列表（可拖拽排序） */}
          <div className="space-y-2">
            <Label className="text-text-secondary">
              拖拽调整顺序，点击删除按钮删除类别
            </Label>

            {categories.length === 0 ? (
              <div className="text-center py-4 text-text-secondary">
                暂无类别
              </div>
            ) : (
              categories.map((category, index) => (
                <div
                  key={category.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  className={cn(
                    "flex items-center gap-3 p-3 bg-card rounded-lg border border-border",
                    "transition-all cursor-move select-none",
                    draggedIndex === index && "opacity-50 scale-[0.98]"
                  )}
                >
                  {/* 拖拽图标 */}
                  <GripVertical className="w-5 h-5 text-text-muted shrink-0" />

                  {/* 类别名称 */}
                  <span className="flex-1 font-medium text-text">
                    {category.name}
                  </span>

                  {/* 任务数量 */}
                  <span className="text-sm text-text-secondary">
                    {category.taskCount || 0} 任务
                  </span>

                  {/* 删除按钮 */}
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