"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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

const addTaskSchema = z.object({
  name: z.string().min(1, "请输入任务名称").max(50, "任务名称最多50字符"),
  points: z.number().int().min(1, "积分至少为1").max(100, "积分最多100"),
  description: z.string().max(200, "描述最多200字符").optional(),
  categoryId: z.string().min(1, "请选择类别"),
});

type AddTaskFormData = z.infer<typeof addTaskSchema>;

interface Category {
  id: string;
  name: string;
  order: number;
}

interface AddTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onAdd: (data: AddTaskFormData) => Promise<void>;
}

export function AddTaskDialog({
  isOpen,
  onClose,
  categories,
  onAdd,
}: AddTaskDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddTaskFormData>({
    resolver: zodResolver(addTaskSchema),
    defaultValues: {
      name: "",
      points: 1,
      description: "",
      categoryId: categories[0]?.id || "",
    },
  });

  // 当 categories 变化时，更新默认 categoryId
  useState(() => {
    if (categories.length > 0) {
      reset((prev) => ({
        ...prev,
        categoryId: categories[0].id,
      }));
    }
  });

  const onSubmit = async (data: AddTaskFormData) => {
    setIsLoading(true);
    try {
      await onAdd(data);
      toast.success("任务创建成功");
      reset();
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "创建失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>添加任务</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 任务名称 */}
          <div className="space-y-2">
            <Label htmlFor="name">任务名称</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="请输入任务名称"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-sm text-error">{errors.name.message}</p>
            )}
          </div>

          {/* 积分 */}
          <div className="space-y-2">
            <Label htmlFor="points">积分</Label>
            <Input
              id="points"
              type="number"
              {...register("points", { valueAsNumber: true })}
              placeholder="请输入积分"
              disabled={isLoading}
              min={1}
              max={100}
            />
            {errors.points && (
              <p className="text-sm text-error">{errors.points.message}</p>
            )}
          </div>

          {/* 类别 */}
          <div className="space-y-2">
            <Label htmlFor="categoryId">类别</Label>
            <select
              id="categoryId"
              {...register("categoryId")}
              disabled={isLoading || categories.length === 0}
              className="w-full h-11 px-3 rounded-button border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.length === 0 ? (
                <option value="">暂无类别</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
            {errors.categoryId && (
              <p className="text-sm text-error">{errors.categoryId.message}</p>
            )}
          </div>

          {/* 描述 */}
          <div className="space-y-2">
            <Label htmlFor="description">描述（可选）</Label>
            <Input
              id="description"
              {...register("description")}
              placeholder="请输入任务描述"
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-sm text-error">{errors.description.message}</p>
            )}
          </div>

          {/* 提交按钮 */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || categories.length === 0}
          >
            {isLoading ? "创建中..." : "创建任务"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}