"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const addMemberSchema = z.object({
  username: z.string().min(2, "用户名至少2个字符").max(20, "用户名最多20个字符"),
  password: z.string().min(6, "密码至少6位").max(32, "密码最多32位"),
  role: z.enum(["PARENT", "CHILD"], "请选择角色"),
});

type AddMemberFormData = z.infer<typeof addMemberSchema>;

interface AddMemberDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: AddMemberFormData) => void;
  isAdding?: boolean;
  defaultRole?: "PARENT" | "CHILD";
}

export function AddMemberDialog({
  isOpen,
  onClose,
  onAdd,
  isAdding = false,
  defaultRole = "CHILD",
}: AddMemberDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddMemberFormData>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      username: "",
      password: "",
      role: defaultRole,
    },
  });

  const onSubmit = (data: AddMemberFormData) => {
    onAdd(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[400px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>添加成员</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* 用户名 */}
          <div className="space-y-2">
            <Label htmlFor="username">用户名</Label>
            <Input
              id="username"
              {...register("username")}
              placeholder="请输入用户名"
              disabled={isAdding}
            />
            {errors.username && (
              <p className="text-sm text-error">{errors.username.message}</p>
            )}
          </div>

          {/* 密码 */}
          <div className="space-y-2">
            <Label htmlFor="password">密码</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="请输入密码"
              disabled={isAdding}
            />
            {errors.password && (
              <p className="text-sm text-error">{errors.password.message}</p>
            )}
          </div>

          {/* 角色 */}
          <div className="space-y-2">
            <Label htmlFor="role">角色</Label>
            <select
              id="role"
              {...register("role")}
              disabled={isAdding}
              className="w-full h-11 px-3 rounded-button border border-input bg-background text-base focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="CHILD">孩子</option>
              <option value="PARENT">家长</option>
            </select>
            {errors.role && (
              <p className="text-sm text-error">{errors.role.message}</p>
            )}
          </div>

          {/* 提交按钮 */}
          <Button type="submit" className="w-full" disabled={isAdding}>
            {isAdding ? "添加中..." : "添加成员"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}