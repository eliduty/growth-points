"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Smile, UserCog, CheckCircle2, X } from "lucide-react";

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
    watch,
    formState: { errors },
  } = useForm<AddMemberFormData>({
    resolver: zodResolver(addMemberSchema),
    defaultValues: {
      username: "",
      password: "",
      role: defaultRole,
    },
  });

  const selectedRole = watch("role");

  const onSubmit = (data: AddMemberFormData) => {
    onAdd(data);
    reset();
    onClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* 遮罩层 */}
      <div
        className="absolute inset-0 bg-black/40 animate-fadeIn"
        onClick={handleClose}
      />

      {/* 弹窗容器 */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[400px] bg-white rounded-2xl shadow-2xl animate-popIn overflow-hidden">
        {/* 关闭按钮 */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 头部图标区域 */}
        <div className="flex flex-col items-center pt-8 pb-4 px-6">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center mb-4">
            {selectedRole === "CHILD" ? (
              <Smile className="w-8 h-8 text-[#5B7FFF]" />
            ) : (
              <UserCog className="w-8 h-8 text-[#5B7FFF]" />
            )}
          </div>
          <h2 className="text-xl font-semibold text-gray-900">添加成员</h2>
          <p className="text-sm text-gray-500 mt-1">邀请家庭成员加入</p>
        </div>

        {/* 表单内容 */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-8 space-y-5">
          {/* 用户名 */}
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              用户名
            </label>
            <input
              id="username"
              {...register("username")}
              placeholder="请输入用户名"
              disabled={isAdding}
              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#5B7FFF] focus:ring-2 focus:ring-[#5B7FFF]/20 transition-all disabled:bg-gray-50"
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>

          {/* 密码 */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              密码
            </label>
            <input
              id="password"
              type="password"
              {...register("password")}
              placeholder="请输入密码"
              disabled={isAdding}
              className="w-full h-11 px-4 rounded-xl border border-gray-200 bg-white text-base text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#5B7FFF] focus:ring-2 focus:ring-[#5B7FFF]/20 transition-all disabled:bg-gray-50"
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          {/* 角色 */}
          <div className="space-y-2">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              角色
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedRole === "CHILD"
                    ? "border-[#5B7FFF] bg-blue-50/50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  {...register("role")}
                  value="CHILD"
                  checked={selectedRole === "CHILD"}
                  disabled={isAdding}
                  className="sr-only"
                />
                <Smile
                  className={`w-5 h-5 ${
                    selectedRole === "CHILD" ? "text-[#5B7FFF]" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    selectedRole === "CHILD" ? "text-[#5B7FFF]" : "text-gray-600"
                  }`}
                >
                  孩子
                </span>
              </label>
              <label
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedRole === "PARENT"
                    ? "border-[#5B7FFF] bg-blue-50/50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  {...register("role")}
                  value="PARENT"
                  checked={selectedRole === "PARENT"}
                  disabled={isAdding}
                  className="sr-only"
                />
                <UserCog
                  className={`w-5 h-5 ${
                    selectedRole === "PARENT" ? "text-[#5B7FFF]" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-sm font-medium ${
                    selectedRole === "PARENT" ? "text-[#5B7FFF]" : "text-gray-600"
                  }`}
                >
                  家长
                </span>
              </label>
            </div>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            disabled={isAdding}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF] text-white font-medium text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAdding ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                添加中...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                添加成员
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}