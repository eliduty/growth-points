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

interface Gift {
  id: string;
  name: string;
  points: number;
  description: string | null;
  color: string | null;
  weeklyLimit: number | null;
}

const editGiftSchema = z.object({
  name: z.string().min(1, "请输入礼物名称").max(50, "礼物名称最多50字符"),
  points: z.number().int().min(1, "积分至少为1").max(1000, "积分最多1000"),
  description: z.string().max(200, "描述最多200字符").optional(),
  weeklyLimit: z
    .number()
    .int()
    .min(1, "每周上限至少为1")
    .max(10, "每周上限最多10")
    .optional()
    .nullable(),
});

type EditGiftFormData = z.infer<typeof editGiftSchema>;

interface EditGiftDialogProps {
  isOpen: boolean;
  onClose: () => void;
  gift: Gift | null;
  onUpdate: (id: string, data: Partial<EditGiftFormData>) => Promise<void>;
}

export function EditGiftDialog({
  isOpen,
  onClose,
  gift,
  onUpdate,
}: EditGiftDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasWeeklyLimit, setHasWeeklyLimit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EditGiftFormData>({
    resolver: zodResolver(editGiftSchema),
    values: gift
      ? {
          name: gift.name,
          points: gift.points,
          description: gift.description || "",
          weeklyLimit: gift.weeklyLimit,
        }
      : {
          name: "",
          points: 1,
          description: "",
          weeklyLimit: null,
        },
  });

  // 初始化时根据 gift 设置 hasWeeklyLimit
  useState(() => {
    if (gift) {
      setHasWeeklyLimit(gift.weeklyLimit !== null);
    }
  });

  const onSubmit = async (data: EditGiftFormData) => {
    if (!gift) return;

    setIsLoading(true);
    try {
      const submitData = {
        ...data,
        weeklyLimit: hasWeeklyLimit ? data.weeklyLimit : null,
      };
      await onUpdate(gift.id, submitData);
      toast.success("礼物更新成功");
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "更新失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!gift) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>编辑礼物</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 礼物名称 */}
          <div className="space-y-2">
            <Label htmlFor="name">礼物名称</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="请输入礼物名称"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-sm text-error">{errors.name.message}</p>
            )}
          </div>

          {/* 积分 */}
          <div className="space-y-2">
            <Label htmlFor="points">所需积分</Label>
            <Input
              id="points"
              type="number"
              {...register("points", { valueAsNumber: true })}
              placeholder="请输入所需积分"
              disabled={isLoading}
              min={1}
              max={1000}
            />
            {errors.points && (
              <p className="text-sm text-error">{errors.points.message}</p>
            )}
          </div>

          {/* 描述 */}
          <div className="space-y-2">
            <Label htmlFor="description">描述（可选）</Label>
            <Input
              id="description"
              {...register("description")}
              placeholder="请输入礼物描述"
              disabled={isLoading}
            />
            {errors.description && (
              <p className="text-sm text-error">{errors.description.message}</p>
            )}
          </div>

          {/* 每周上限 */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hasWeeklyLimitEdit"
                checked={hasWeeklyLimit}
                onChange={(e) => {
                  setHasWeeklyLimit(e.target.checked);
                  setValue("weeklyLimit", e.target.checked ? 1 : null);
                }}
                disabled={isLoading}
                className="w-4 h-4 rounded border-input"
              />
              <Label htmlFor="hasWeeklyLimitEdit">设置每周兑换上限</Label>
            </div>

            {hasWeeklyLimit && (
              <div className="mt-2">
                <Label htmlFor="weeklyLimitEdit">每周上限次数</Label>
                <Input
                  id="weeklyLimitEdit"
                  type="number"
                  {...register("weeklyLimit", { valueAsNumber: true })}
                  placeholder="请输入每周上限次数"
                  disabled={isLoading}
                  min={1}
                  max={10}
                />
                {errors.weeklyLimit && (
                  <p className="text-sm text-error">{errors.weeklyLimit.message}</p>
                )}
              </div>
            )}
          </div>

          {/* 提交按钮 */}
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "保存中..." : "保存"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}