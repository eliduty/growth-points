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

const addGiftSchema = z.object({
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

type AddGiftFormData = z.infer<typeof addGiftSchema>;

interface AddGiftDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: AddGiftFormData) => Promise<void>;
}

export function AddGiftDialog({
  isOpen,
  onClose,
  onAdd,
}: AddGiftDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasWeeklyLimit, setHasWeeklyLimit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<AddGiftFormData>({
    resolver: zodResolver(addGiftSchema),
    defaultValues: {
      name: "",
      points: 1,
      description: "",
      weeklyLimit: null,
    },
  });

  const onSubmit = async (data: AddGiftFormData) => {
    setIsLoading(true);
    try {
      // 如果没有勾选每周上限，则传 null
      const submitData = {
        ...data,
        weeklyLimit: hasWeeklyLimit ? data.weeklyLimit : null,
      };
      await onAdd(submitData);
      toast.success("礼物创建成功");
      reset();
      setHasWeeklyLimit(false);
      onClose();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "创建失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setHasWeeklyLimit(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>添加礼物</DialogTitle>
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
                id="hasWeeklyLimit"
                checked={hasWeeklyLimit}
                onChange={(e) => {
                  setHasWeeklyLimit(e.target.checked);
                  setValue("weeklyLimit", e.target.checked ? 1 : null);
                }}
                disabled={isLoading}
                className="w-4 h-4 rounded border-input"
              />
              <Label htmlFor="hasWeeklyLimit">设置每周兑换上限</Label>
            </div>

            {hasWeeklyLimit && (
              <div className="mt-2">
                <Label htmlFor="weeklyLimit">每周上限次数</Label>
                <Input
                  id="weeklyLimit"
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
            {isLoading ? "创建中..." : "创建礼物"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}