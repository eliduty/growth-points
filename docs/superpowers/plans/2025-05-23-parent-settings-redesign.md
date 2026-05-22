# 家长端设置页样式重构实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按照设计稿重构家长端设置页，统一成员管理区块、改为列表布局、优化按钮和弹窗样式。

**Architecture:** 
- 新增 MemberListItem 组件替换 MemberCard，实现列表行布局
- 新增 MemberGroup 组件实现统一区块内的分组展示
- 更新现有弹窗组件样式以匹配设计稿
- 重构主页面整合成员管理区块并优化其他区块样式

**Tech Stack:** React, Tailwind CSS, Framer Motion, Lucide React

---

## 文件结构

```
src/components/parent/
├── SettingsCard.tsx              # 修改：添加渐变头部样式
├── MemberListItem.tsx            # 新增：列表项成员组件
├── MemberGroup.tsx               # 新增：成员分组组件
├── AddMemberDialog.tsx           # 修改：样式和图标
├── ExchangeDaysDialog.tsx        # 修改：4列网格布局
├── DeleteConfirmDialog.tsx       # 修改：删除确认样式
└── MemberCard.tsx                # 保留但不再使用（或删除）

src/app/parent/settings/page.tsx  # 修改：重构主页面布局
```

---

## Task 1: 创建 MemberListItem 组件

**Files:**
- Create: `src/components/parent/MemberListItem.tsx`

- [ ] **Step 1: 创建 MemberListItem 组件**

```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { Smile, User, Trash2 } from "lucide-react";
import type { Member } from "@/types";

interface MemberListItemProps {
  member: Member;
  onDelete?: (id: string) => void;
}

export function MemberListItem({ member, onDelete }: MemberListItemProps) {
  const isChild = member.role === "CHILD";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex items-center justify-between py-2.5 border-b border-[#E5E7EB] last:border-b-0"
    >
      {/* 成员信息 */}
      <div className="flex items-center gap-2.5">
        {/* 头像 */}
        <div
          className={cn(
            "w-8 h-8 rounded-lg flex items-center justify-center",
            isChild
              ? "bg-gradient-to-br from-[#FFF0E8] to-[#FFE8DC]"
              : "bg-gradient-to-br from-[#E8F0FE] to-[#F0F4FF]"
          )}
        >
          {isChild ? (
            <Smile className="w-[18px] h-[18px] text-[#FF6B35]" />
          ) : (
            <User className="w-[18px] h-[18px] text-[#5B7FFF]" />
          )}
        </div>

        {/* 用户名 */}
        <div className="text-sm text-[#1F2937]">
          {member.username}
          {member.isMe && (
            <span className="text-xs text-[#9CA3AF] ml-1">(你)</span>
          )}
        </div>
      </div>

      {/* 删除按钮 */}
      <button
        onClick={() => onDelete?.(member.id)}
        className={cn(
          "flex items-center gap-1 px-3 py-1.5 rounded-md text-xs",
          "border border-[#E5E7EB] bg-white text-[#6B7280]",
          "transition-all duration-150 ease-out",
          "hover:border-[#EF4444] hover:text-[#EF4444]",
          member.isMe && "invisible"
        )}
      >
        <Trash2 className="w-3.5 h-3.5" />
        删除
      </button>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/parent/MemberListItem.tsx
git commit -m "feat: add MemberListItem component for list layout"
```

---

## Task 2: 创建 MemberGroup 组件

**Files:**
- Create: `src/components/parent/MemberGroup.tsx`

- [ ] **Step 1: 创建 MemberGroup 组件**

```tsx
"use client";

import { Smile, UserCog, UserPlus } from "lucide-react";
import { MemberListItem } from "./MemberListItem";
import type { Member } from "@/types";

interface MemberGroupProps {
  title: string;
  members: Member[];
  onAdd: () => void;
  onDelete: (id: string) => void;
  isAdding?: boolean;
}

export function MemberGroup({
  title,
  members,
  onAdd,
  onDelete,
  isAdding = false,
}: MemberGroupProps) {
  const isChild = title === "孩子";

  return (
    <div className="mb-4 last:mb-0">
      {/* 分组标签 */}
      <div className="flex items-center gap-1.5 text-sm text-[#9CA3AF] mb-2">
        {isChild ? (
          <Smile className="w-3.5 h-3.5" />
        ) : (
          <UserCog className="w-3.5 h-3.5" />
        )}
        <span>{title}</span>
      </div>

      {/* 成员列表 */}
      <div className="space-y-0">
        {members.map((member) => (
          <MemberListItem
            key={member.id}
            member={member}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* 添加按钮 */}
      <button
        onClick={onAdd}
        disabled={isAdding}
        className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm text-white font-medium
          bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF]
          shadow-[0_4px_12px_rgba(91,127,255,0.2)]
          transition-all duration-150 ease-out
          hover:shadow-[0_6px_16px_rgba(91,127,255,0.25)] hover:-translate-y-[1px]
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <UserPlus className="w-[18px] h-[18px]" />
        添加{title}
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/parent/MemberGroup.tsx
git commit -m "feat: add MemberGroup component for unified member section"
```

---

## Task 3: 更新 SettingsCard 组件

**Files:**
- Modify: `src/components/parent/SettingsCard.tsx`

- [ ] **Step 1: 更新 SettingsCard 支持头部图标和渐变背景**

```tsx
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { LucideIcon } from "lucide-react";

interface SettingsCardProps {
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function SettingsCard({
  title,
  icon: Icon,
  children,
  className,
  delay = 0,
}: SettingsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut", delay }}
      className={cn(
        "bg-white rounded-xl border border-[rgba(91,127,255,0.08)] shadow-[0_2px_8px_rgba(91,127,255,0.08),0_1px_2px_rgba(91,127,255,0.04)] overflow-hidden",
        className
      )}
    >
      {/* 标题栏 - 渐变背景 */}
      <div
        className="px-4 py-3 bg-gradient-to-r from-[#F9FAFB] to-[#F5F7FF] border-b border-[rgba(91,127,255,0.08)]
          flex items-center gap-2 text-[15px] font-semibold text-[#1F2937]"
      >
        {Icon && <Icon className="w-[18px] h-[18px] text-[#5B7FFF]" strokeWidth={2} />}
        {title}
      </div>

      {/* 内容 */}
      <div className="p-4">{children}</div>
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/parent/SettingsCard.tsx
git commit -m "style: update SettingsCard with gradient header and icon support"
```

---

## Task 4: 更新 AddMemberDialog 组件

**Files:**
- Modify: `src/components/parent/AddMemberDialog.tsx`

- [ ] **Step 1: 更新弹窗样式（添加图标、自定义按钮样式）**

```tsx
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Smile, UserCog, CheckCircle2, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

  const currentRole = watch("role");

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

  const TitleIcon: LucideIcon = currentRole === "CHILD" ? Smile : UserCog;
  const title = currentRole === "CHILD" ? "添加孩子" : "添加家长";

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm animate-fadeIn"
        onClick={handleClose}
      />

      {/* 弹窗 */}
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[340px] bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2),0_4px_16px_rgba(91,127,255,0.1)] animate-popIn">
        {/* 头部 */}
        <div className="px-4 py-4 border-b border-[#E5E7EB] flex items-center justify-center gap-2">
          <TitleIcon className="w-5 h-5 text-[#5B7FFF]" strokeWidth={2} />
          <span className="text-base font-semibold text-[#1F2937]">{title}</span>
        </div>

        {/* 表单内容 */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          {/* 用户名 */}
          <div>
            <label className="block text-sm text-[#1F2937] mb-2">用户名</label>
            <input
              type="text"
              {...register("username")}
              placeholder="请输入用户名"
              disabled={isAdding}
              className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[15px]
                focus:outline-none focus:border-[#5B7FFF] focus:bg-white focus:ring-3 focus:ring-[rgba(91,127,255,0.1)]
                transition-all duration-150"
            />
            {errors.username && (
              <p className="text-sm text-[#EF4444] mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* 密码 */}
          <div>
            <label className="block text-sm text-[#1F2937] mb-2">密码</label>
            <input
              type="password"
              {...register("password")}
              placeholder="请输入密码"
              disabled={isAdding}
              className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[15px]
                focus:outline-none focus:border-[#5B7FFF] focus:bg-white focus:ring-3 focus:ring-[rgba(91,127,255,0.1)]
                transition-all duration-150"
            />
            {errors.password && (
              <p className="text-sm text-[#EF4444] mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* 角色选择（仅在未指定时显示）*/}
          {defaultRole !== "CHILD" && defaultRole !== "PARENT" && (
            <div>
              <label className="block text-sm text-[#1F2937] mb-2">角色</label>
              <select
                {...register("role")}
                disabled={isAdding}
                className="w-full h-11 px-4 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] text-[15px]
                  focus:outline-none focus:border-[#5B7FFF] focus:bg-white
                  transition-all duration-150"
              >
                <option value="CHILD">孩子</option>
                <option value="PARENT">家长</option>
              </select>
            </div>
          )}

          {/* 按钮区域 */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 h-11 rounded-lg text-[15px] font-medium
                border border-[#E5E7EB] bg-white text-[#6B7280]
                hover:bg-[#F9FAFB] transition-all duration-150"
            >
              取消
            </button>
            <button
              type="submit"
              disabled={isAdding}
              className="flex-1 h-11 rounded-lg text-[15px] font-medium text-white
                bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF]
                shadow-[0_4px_12px_rgba(91,127,255,0.2)]
                flex items-center justify-center gap-1.5
                hover:shadow-[0_6px_16px_rgba(91,127,255,0.25)] hover:-translate-y-[1px]
                transition-all duration-150 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              {isAdding ? "添加中..." : "确认添加"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
```

- [ ] **Step 2: 在 globals.css 添加弹窗动画**

```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes popIn {
  0% { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
}

.animate-fadeIn {
  animation: fadeIn 200ms ease-out;
}

.animate-popIn {
  animation: popIn 200ms ease-out;
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/parent/AddMemberDialog.tsx src/app/globals.css
git commit -m "style: update AddMemberDialog with design styles and custom icons"
```

---

## Task 5: 更新 ExchangeDaysDialog 组件

**Files:**
- Modify: `src/components/parent/ExchangeDaysDialog.tsx`

- [ ] **Step 1: 更新为4列网格布局**

```tsx
"use client";

import { useState, useEffect } from "react";
import { Calendar, CheckCircle2, X } from "lucide-react";

const WEEKDAY_NAMES = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

interface ExchangeDaysDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentDays: number[];
  onUpdate: (days: number[]) => void;
  isUpdating?: boolean;
}

export function ExchangeDaysDialog({
  isOpen,
  onClose,
  currentDays,
  onUpdate,
  isUpdating = false,
}: ExchangeDaysDialogProps) {
  const [selectedDays, setSelectedDays] = useState<number[]>(currentDays);

  useEffect(() => {
    if (isOpen) {
      setSelectedDays(currentDays);
    }
  }, [isOpen, currentDays]);

  const toggleDay = (day: number) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleSubmit = () => {
    onUpdate(selectedDays);
    onClose();
  };

  const handleClose = () => {
    setSelectedDays(currentDays);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm animate-fadeIn"
        onClick={handleClose}
      />

      {/* 弹窗 */}
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[340px] bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2),0_4px_16px_rgba(91,127,255,0.1)] animate-popIn">
        {/* 头部 */}
        <div className="px-4 py-4 border-b border-[#E5E7EB] flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5 text-[#5B7FFF]" strokeWidth={2} />
          <span className="text-base font-semibold text-[#1F2937]">设置兑换日</span>
        </div>

        {/* 内容 */}
        <div className="p-4">
          <p className="text-sm text-[#1F2937] mb-4">选择每周可兑换礼物的日期：</p>

          {/* 星期选择 - 4列网格 */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {WEEKDAY_NAMES.map((name, index) => {
              const isSelected = selectedDays.includes(index);
              return (
                <button
                  key={index}
                  onClick={() => toggleDay(index)}
                  disabled={isUpdating}
                  className={`
                    py-3 rounded-lg text-sm text-center transition-all duration-150
                    ${isSelected
                      ? "bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF] text-white shadow-[0_4px_12px_rgba(91,127,255,0.2)] border border-[#5B7FFF]"
                      : "bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280] hover:border-[#5B7FFF] hover:bg-[#F0F4FF]"
                    }
                  `}
                >
                  {name}
                </button>
              );
            })}
          </div>

          {/* 按钮区域 */}
          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="flex-1 h-11 rounded-lg text-[15px] font-medium
                border border-[#E5E7EB] bg-white text-[#6B7280]
                hover:bg-[#F9FAFB] transition-all duration-150"
            >
              取消
            </button>
            <button
              onClick={handleSubmit}
              disabled={isUpdating}
              className="flex-1 h-11 rounded-lg text-[15px] font-medium text-white
                bg-gradient-to-r from-[#5B7FFF] to-[#7B9FFF]
                shadow-[0_4px_12px_rgba(91,127,255,0.2)]
                flex items-center justify-center gap-1.5
                hover:shadow-[0_6px_16px_rgba(91,127,255,0.25)] hover:-translate-y-[1px]
                transition-all duration-150 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              {isUpdating ? "保存中..." : "确认保存"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/parent/ExchangeDaysDialog.tsx
git commit -m "style: update ExchangeDaysDialog with 4-column grid and design styles"
```

---

## Task 6: 更新 DeleteConfirmDialog 组件

**Files:**
- Modify: `src/components/parent/DeleteConfirmDialog.tsx`

- [ ] **Step 1: 更新为设计稿样式（警告图标、特定布局）**

```tsx
"use client";

import { AlertTriangle, Info, Trash2, X } from "lucide-react";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  title: string;
  content?: string;
  subContent?: string;
  warningText?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteConfirmDialog({
  isOpen,
  title,
  content,
  subContent,
  warningText = "此操作不可恢复",
  confirmText = "确认删除",
  cancelText = "取消",
  destructive = true,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm animate-fadeIn"
        onClick={onCancel}
      />

      {/* 弹窗 */}
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[340px] bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2),0_4px_16px_rgba(91,127,255,0.1)] animate-popIn overflow-hidden">
        {/* 删除确认内容 */}
        <div className="p-6 text-center">
          {/* 警告图标 */}
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FEE2E2] to-[#FECACA] flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-6 h-6 text-[#EF4444]" strokeWidth={2} />
          </div>

          {/* 标题 */}
          <h3 className="text-base font-semibold text-[#1F2937] mb-4">{title}</h3>

          {/* 内容 */}
          {content && (
            <p className="text-sm text-[#6B7280] mb-1">{content}</p>
          )}

          {/* 子内容 */}
          {subContent && (
            <p className="text-sm text-[#6B7280] mb-3">{subContent}</p>
          )}

          {/* 警告提示 */}
          <div className="flex items-center justify-center gap-1 text-sm text-[#EF4444] mb-5">
            <Info className="w-3.5 h-3.5" />
            <span>{warningText}</span>
          </div>

          {/* 按钮区域 */}
          <div className="flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 h-11 rounded-lg text-[15px] font-medium
                border border-[#E5E7EB] bg-white text-[#6B7280]
                hover:bg-[#F9FAFB] transition-all duration-150"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 h-11 rounded-lg text-[15px] font-medium text-white
                bg-[#EF4444] shadow-[0_4px_12px_rgba(239,68,68,0.2)]
                flex items-center justify-center gap-1.5
                hover:shadow-[0_6px_16px_rgba(239,68,68,0.25)] hover:-translate-y-[1px]
                transition-all duration-150"
            >
              <Trash2 className="w-4 h-4" />
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/parent/DeleteConfirmDialog.tsx
git commit -m "style: update DeleteConfirmDialog with warning icon and design styles"
```

---

## Task 7: 重构主页面 (settings/page.tsx)

**Files:**
- Modify: `src/app/parent/settings/page.tsx`

- [ ] **Step 1: 重构主页面布局和样式**

```tsx
"use client";

import { useState } from "react";
import { Users, Clock, Settings as SettingsIcon, User, LogOut, RefreshCw, AlertCircle } from "lucide-react";
import { useMembers, useExchangeDays } from "@/hooks/use-members";
import { useUser } from "@/hooks/use-user";
import { useAuth } from "@/hooks/use-auth";
import { SettingsCard } from "@/components/parent/SettingsCard";
import { MemberGroup } from "@/components/parent/MemberGroup";
import { AddMemberDialog } from "@/components/parent/AddMemberDialog";
import { ExchangeDaysDialog } from "@/components/parent/ExchangeDaysDialog";
import { DeleteConfirmDialog } from "@/components/parent/DeleteConfirmDialog";

const WEEKDAY_NAMES = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

export default function ParentSettingsPage() {
  const { children, parents, isLoading, isError, error, refetch, isFetching, addMember, isAddingMember, deleteMember, isDeletingMember } = useMembers();
  const { exchangeDays, updateExchangeDays, isUpdating } = useExchangeDays();
  const { user } = useUser();
  const { logout } = useAuth();

  // 弹窗状态
  const [addChildDialogOpen, setAddChildDialogOpen] = useState(false);
  const [addParentDialogOpen, setAddParentDialogOpen] = useState(false);
  const [exchangeDaysDialogOpen, setExchangeDaysDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);

  // 删除成员状态
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; username: string; role: "CHILD" | "PARENT" } | null>(null);

  // 处理删除成员
  const handleDeleteMember = (id: string) => {
    const member = [...children, ...parents].find((m) => m.id === id);
    if (member) {
      setDeleteTarget({ id, username: member.username, role: member.role });
      setDeleteConfirmOpen(true);
    }
  };

  // 确认删除
  const confirmDelete = async () => {
    if (deleteTarget) {
      deleteMember(deleteTarget.id);
    }
    setDeleteConfirmOpen(false);
    setDeleteTarget(null);
  };

  // 取消删除
  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setDeleteTarget(null);
  };

  // 确认退出登录
  const confirmLogout = async () => {
    await logout();
    setLogoutConfirmOpen(false);
  };

  // 取消退出登录
  const cancelLogout = () => {
    setLogoutConfirmOpen(false);
  };

  // 加载状态
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-[#5B7FFF] border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-[#6B7280]">加载中...</p>
        </div>
      </div>
    );
  }

  // 错误状态
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-[#EF4444] mx-auto mb-3" />
          <p className="text-[#EF4444] mb-4">{error?.message || "加载失败"}</p>
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 bg-[#5B7FFF] text-white rounded-lg"
          >
            <RefreshCw className="w-4 h-4" />
            重新加载
          </button>
        </div>
      </div>
    );
  }

  // 获取兑换日显示文本
  const exchangeDaysText = exchangeDays.length > 0
    ? exchangeDays.map((d) => WEEKDAY_NAMES[d]).join("、")
    : "未设置";

  return (
    <div className="p-4 pb-20">
      {/* 成员管理 - 统一区块 */}
      <SettingsCard title="成员管理" icon={Users} className="mb-4" delay={0.1}>
        {/* 孩子分组 */}
        <MemberGroup
          title="孩子"
          members={children}
          onAdd={() => setAddChildDialogOpen(true)}
          onDelete={handleDeleteMember}
          isAdding={isAddingMember}
        />

        {/* 分割线 */}
        {parents.length > 0 && children.length > 0 && (
          <div className="border-t border-[#E5E7EB] my-4" />
        )}

        {/* 家长分组 */}
        <MemberGroup
          title="家长"
          members={parents}
          onAdd={() => setAddParentDialogOpen(true)}
          onDelete={handleDeleteMember}
          isAdding={isAddingMember}
        />
      </SettingsCard>

      {/* 兑换日设置 */}
      <SettingsCard title="兑换日设置" icon={Clock} className="mb-4" delay={0.2}>
        <div className="flex items-center justify-between py-3 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
            <Clock className="w-4 h-4" />
            <span>当前设置</span>
          </div>
          <div className="text-sm text-[#1F2937] font-medium">{exchangeDaysText}</div>
        </div>

        <button
          onClick={() => setExchangeDaysDialogOpen(true)}
          disabled={isUpdating}
          className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm text-[#5B7FFF]
            border border-[#E5E7EB] bg-white
            hover:bg-[#5B7FFF] hover:text-white hover:border-[#5B7FFF]
            transition-all duration-150 group"
        >
          <SettingsIcon className="w-[18px] h-[18px] group-hover:text-white" />
          修改设置
        </button>
      </SettingsCard>

      {/* 个人信息 */}
      <SettingsCard title="个人信息" icon={User} className="mb-4" delay={0.3}>
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
            <User className="w-4 h-4" />
            <span>用户名</span>
          </div>
          <div className="text-sm text-[#1F2937]">{user?.username}</div>
        </div>
      </SettingsCard>

      {/* 退出登录 */}
      <button
        onClick={() => setLogoutConfirmOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl
          bg-white border border-[#E5E7EB] text-[#6B7280] text-base
          shadow-[0_2px_8px_rgba(91,127,255,0.08),0_1px_2px_rgba(91,127,255,0.04)]
          hover:border-[#EF4444] hover:text-[#EF4444]
          transition-all duration-150 group"
      >
        <LogOut className="w-5 h-5 group-hover:text-[#EF4444]" />
        退出登录
      </button>

      {/* 添加孩子弹窗 */}
      <AddMemberDialog
        isOpen={addChildDialogOpen}
        onClose={() => setAddChildDialogOpen(false)}
        onAdd={(data) => addMember(data)}
        isAdding={isAddingMember}
        defaultRole="CHILD"
      />

      {/* 添加家长弹窗 */}
      <AddMemberDialog
        isOpen={addParentDialogOpen}
        onClose={() => setAddParentDialogOpen(false)}
        onAdd={(data) => addMember(data)}
        isAdding={isAddingMember}
        defaultRole="PARENT"
      />

      {/* 兑换日设置弹窗 */}
      <ExchangeDaysDialog
        isOpen={exchangeDaysDialogOpen}
        onClose={() => setExchangeDaysDialogOpen(false)}
        currentDays={exchangeDays}
        onUpdate={(days) => updateExchangeDays(days)}
        isUpdating={isUpdating}
      />

      {/* 删除成员确认弹窗 */}
      <DeleteConfirmDialog
        isOpen={deleteConfirmOpen}
        title={`确认删除${deleteTarget?.role === "CHILD" ? "孩子" : "家长"}账号？`}
        content={deleteTarget ? `将删除：${deleteTarget.username} 的账号` : ""}
        subContent="包括：所有完成记录、兑换记录"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      {/* 退出登录确认弹窗 */}
      <DeleteConfirmDialog
        isOpen={logoutConfirmOpen}
        title="退出登录"
        content="确定要退出登录吗？"
        warningText=""
        confirmText="确认退出"
        destructive={false}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/parent/settings/page.tsx
git commit -m "refactor: redesign settings page with unified member section and list layout"
```

---

## Task 8: 清理未使用的组件（可选）

**Files:**
- Delete: `src/components/parent/MemberCard.tsx`（如确认不再使用）

- [ ] **Step 1: 删除旧 MemberCard 组件**

```bash
git rm src/components/parent/MemberCard.tsx
git commit -m "chore: remove unused MemberCard component"
```

---

## 自审检查

**Spec 覆盖检查：**
- [x] 成员管理统一为一个区块，内部按孩子/家长分组 → Task 7
- [x] 成员展示为单列列表，每项包含方形头像+用户名+删除按钮 → Task 1, Task 2
- [x] 删除按钮点击触发确认弹窗（非长按）→ Task 1, Task 6
- [x] 兑换日设置改为"当前设置"标签+值左右布局 → Task 7
- [x] 个人信息仅显示用户名一行 → Task 7
- [x] 退出登录按钮样式为白色背景带边框，hover变红 → Task 7
- [x] 所有动画效果与设计稿一致 → Task 3, Task 4
- [x] 弹窗样式与设计稿一致 → Task 4, Task 5, Task 6

**占位符扫描：** 无 TBD/TODO/placeholder

**类型一致性检查：**
- MemberListItemProps 使用 Member 类型，与现有 hooks 一致
- MemberGroup 参数命名与父组件一致
- DeleteConfirmDialog 新增可选参数保持向后兼容

---

## 执行交接

**计划已完成并保存至 `docs/superpowers/plans/2025-05-23-parent-settings-redesign.md`**

两种执行选项：

**1. Subagent-Driven（推荐）** - 为每个 Task 分派独立子代理，任务间审查，快速迭代

**2. Inline Execution** - 在本会话中使用 executing-plans 执行任务，批量执行带检查点

**请选择执行方式？**
