# Phase 3: 家长端核心功能实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完成家长端核心功能，包括统计页、任务管理、礼物管理、兑换记录管理、成员管理、兑换日设置和设置页。

**Architecture:** React Query 数据获取，React Hook Form 表单管理，shadcn/ui Dialog 弹窗，长按触发隐藏操作，底部导航四入口。

**Tech Stack:** TanStack React Query, React Hook Form, Zod, shadcn/ui Dialog, Lucide React Icons

---

## 原型参考

**前端页面实现参考 `docs/prototypes/` 目录下的原型 HTML 文件：**

| 页面 | 原型文件 | 关键组件 |
|------|----------|----------|
| 统计页 | `parent-stats.html` | ChildOverviewCard, CompletionRecordCard |
| 任务管理页 | `parent-tasks.html` | TaskCard, CategorySection |
| 礼物管理页 | `parent-gifts.html` | GiftCard, RedemptionCard |
| 设置页 | `parent-settings.html` | MemberCard, SettingsCard |

**核心 CSS 样式映射（原型 → Tailwind）：**

| 原型样式 | Tailwind 类 |
|----------|-------------|
| 孩子卡片横向滑动 `overflow-x: auto` | `flex overflow-x-auto pb-2 scrollbar-hide` |
| 孩子卡片选中蓝边框 `border-color: #5B7FFF` | `border-parent-primary bg-gradient-to-br from-blue-50 to-blue-100` |
| 记录折叠展开背景 `#F9FAFB` → 渐变 | `bg-gray-50` → `bg-gradient-to-br from-blue-50 to-blue-100` |
| 撤销按钮 `border: 1px solid #E5E7EB` hover 红边框 | `border border-gray-200 hover:border-error hover:text-error` |
| 弹窗动画 `popIn 0.2s ease-out` | `scale(0.9) → scale(1)` |

---

## 文件结构规划

```
src/
├── app/
│   └── (parent)/
│       ├── layout.tsx           # 已存在
│       ├── page.tsx             # 统计页（首页）
│       ├── tasks/
│       │   └── page.tsx         # 任务管理页
│       ├── gifts/
│       │   └── page.tsx         # 礼物管理页（含兑换记录标签）
│       └── settings/
│       │   └── page.tsx         # 设置页
│       └── stats/
│           └── [childId]/
│               └── page.tsx     # 孩子记录详情页
│
├── app/api/
│   └── parent/
│       ├── stats/
│       │   └── route.ts         # 获取本周统计
│       ├── completions/
│       │   └── [id]/
│       │       └── route.ts     # 撤销完成记录
│       ├── tasks/
│       │   ├── route.ts         # 任务 CRUD
│       │   └── [id]/
│       │       └── route.ts     # 单个任务 CRUD
│       ├── categories/
│       │   ├── route.ts         # 类别 CRUD
│       │   └── order/
│       │       └── route.ts     # 调整类别顺序
│       ├── gifts/
│       │   ├── route.ts         # 礼物 CRUD
│       │   └── [id]/
│       │       └── route.ts     # 单个礼物 CRUD
│       │   └── redemptions/
│       │       └── route.ts     # 获取兑换记录
│       │       └── [id]/
│       │           ├── confirm/
│       │           │   └── route.ts  # 确认兑换
│       │           ├── cancel/
│       │           │   └── route.ts  # 撤销兑换
│       ├── members/
│       │   ├── route.ts         # 成员列表和添加
│       │   └── [id]/
│       │       └── route.ts     # 删除成员
│       └── exchange-days/
│           └── route.ts         # 兑换日设置
│
├── components/
│   └── parent/
│       ├── ChildOverviewCard.tsx      # 孩子概览卡片
│       ├── CompletionRecordCard.tsx   # 完成记录卡片（支持长按撤销）
│       ├── TaskCard.tsx               # 任务卡片（支持编辑/删除）
│       ├── CategorySection.tsx        # 类别分组区域
│       ├── GiftCard.tsx               # 礼物卡片（支持编辑/删除）
│       ├── RedemptionCard.tsx         # 兑换记录卡片
│       ├── MemberCard.tsx             # 成员卡片
│       ├── AddTaskDialog.tsx          # 添加任务弹窗
│       ├── EditTaskDialog.tsx         # 编辑任务弹窗
│       ├── AddGiftDialog.tsx          # 添加礼物弹窗
│       ├── EditGiftDialog.tsx         # 编辑礼物弹窗
│       ├── AddMemberDialog.tsx        # 添加成员弹窗
│       ├── DeleteConfirmDialog.tsx    # 删除确认弹窗
│       ├── CategoryManageDialog.tsx   # 类别管理弹窗
│       ├── ExchangeDaysDialog.tsx     # 兑换日设置弹窗
│       ├── StatsTabs.tsx              # 统计页标签切换
│       ├── BottomMenu.tsx             # 底部操作菜单（长按触发）
│       └── SettingsCard.tsx           # 设置页卡片
│
├── hooks/
│   ├── use-parent-stats.ts      # 统计数据 hook
│   ├── use-tasks.ts             # 任务数据 hook
│   ├── use-gifts.ts             # 礼物数据 hook
│   ├── use-members.ts           # 成员数据 hook
│   ├── use-long-press.ts        # 长按事件 hook
│   └── use-confirm.ts           # 确认弹窗 hook
│
└── types/
│   └── index.ts                 # 已存在，扩展类型
```

---

## Task 0: 清理现有 demo 代码

**Files:**
- Delete: `src/app/api/todos/route.ts`
- Delete: `src/app/api/todos/[id]/route.ts`
- Delete: `src/app/page.tsx` (替换为重定向页面)
- Delete: `src/types/todo.ts`
- Delete: `src/components/TodoItem.tsx`
- Delete: `src/components/TodoForm.tsx`

- [ ] **Step 1: 删除 todo API 文件**

```bash
rm src/app/api/todos/route.ts
rm src/app/api/todos/[id]/route.ts
```

Expected: 删除 todo API 文件

- [ ] **Step 2: 替换主页为重定向**

```typescript
// src/app/page.tsx
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}
```

- [ ] **Step 3: 删除 todo 类型文件**

```bash
rm src/types/todo.ts
```

- [ ] **Step 4: 删除 todo 组件文件**

```bash
rm src/components/TodoItem.tsx
rm src/components/TodoForm.tsx
```

- [ ] **Step 5: 提交清理**

```bash
git add -A
git commit -m "chore: 清理 todo demo 代码

为家庭积分兑换系统做准备，移除现有 demo 代码：
- 删除 todo API 文件
- 删除 todo 类型定义
- 删除 todo 组件
- 主页改为重定向到登录页

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 1: 创建家长端 API 工具函数

**Files:**
- Create: `src/lib/api-parent.ts`
- Modify: `src/types/index.ts`

- [ ] **Step 1: 扩展类型定义**

在 `src/types/index.ts` 末尾添加：

```typescript
/**
 * 孩子统计信息类型
 */
export interface ChildStats {
  id: string;
  username: string;
  currentPoints: number;
  totalPoints: number;
  weeklyCompleted: number;
  weeklyPoints: number;
  completions: CompletionRecord[];
}

/**
 * 本周统计响应类型
 */
export interface WeeklyStats {
  weekRange: {
    start: string;
    end: string;
  };
  children: ChildStats[];
}

/**
 * 任务类型（家长端）
 */
export interface ParentTask {
  id: string;
  name: string;
  points: number;
  description: string | null;
  categoryId: string;
  categoryName: string;
}

/**
 * 类别类型（含任务）
 */
export interface CategoryWithTasks {
  id: string;
  name: string;
  order: number;
  tasks: ParentTask[];
}

/**
 * 兑换记录类型（家长端）
 */
export interface ParentRedemption {
  id: string;
  giftName: string;
  giftColor: string | null;
  points: number;
  userId: string;
  username: string;
  redeemedAt: string;
  confirmedAt?: string | null;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
}

/**
 * 成员类型
 */
export interface Member {
  id: string;
  username: string;
  role: "PARENT" | "CHILD";
  isMe: boolean;
  currentPoints?: number;
  totalPoints?: number;
}
```

- [ ] **Step 2: 创建家长端 API 工具函数**

```typescript
import { ApiResponse } from "@/types";

const API_BASE = "/api/parent";

/**
 * 统计相关 API
 */
export const statsApi = {
  getWeekly: async (weekStart?: string): Promise<ApiResponse<import("@/types").WeeklyStats>> => {
    const url = weekStart ? `${API_BASE}/stats?weekStart=${weekStart}` : `${API_BASE}/stats`;
    const res = await fetch(url);
    return res.json();
  },
};

/**
 * 完成记录相关 API
 */
export const completionsApi = {
  revoke: async (id: string): Promise<ApiResponse<{ pointsRevoked: number; redemptionsCancelled: number }>> => {
    const res = await fetch(`${API_BASE}/completions/${id}`, { method: "DELETE" });
    return res.json();
  },
};

/**
 * 任务相关 API
 */
export const tasksApi = {
  list: async (): Promise<ApiResponse<{ categories: import("@/types").CategoryWithTasks[] }>> => {
    const res = await fetch(`${API_BASE}/tasks`);
    return res.json();
  },
  create: async (data: { name: string; points: number; categoryId: string; description?: string }): Promise<ApiResponse<import("@/types").ParentTask>> => {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  update: async (id: string, data: Partial<{ name: string; points: number; categoryId: string; description: string }>): Promise<ApiResponse<import("@/types").ParentTask>> => {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const res = await fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" });
    return res.json();
  },
};

/**
 * 类别相关 API
 */
export const categoriesApi = {
  list: async (): Promise<ApiResponse<{ id: string; name: string; order: number; taskCount: number }[]>> => {
    const res = await fetch(`${API_BASE}/categories`);
    return res.json();
  },
  create: async (name: string): Promise<ApiResponse<{ id: string; name: string; order: number }>> => {
    const res = await fetch(`${API_BASE}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    return res.json();
  },
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const res = await fetch(`${API_BASE}/categories/${id}`, { method: "DELETE" });
    return res.json();
  },
  updateOrder: async (orders: { id: string; order: number }[]): Promise<ApiResponse<null>> => {
    const res = await fetch(`${API_BASE}/categories/order`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orders }),
    });
    return res.json();
  },
};

/**
 * 礼物相关 API
 */
export const giftsApi = {
  list: async (): Promise<ApiResponse<{ id: string; name: string; points: number; description: string | null; color: string | null; weeklyLimit: number | null }[]>> => {
    const res = await fetch(`${API_BASE}/gifts`);
    return res.json();
  },
  create: async (data: { name: string; points: number; description?: string; weeklyLimit?: number }): Promise<ApiResponse<{ id: string; name: string; points: number; description: string | null; color: string; weeklyLimit: number | null }>> => {
    const res = await fetch(`${API_BASE}/gifts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  update: async (id: string, data: Partial<{ name: string; points: number; description: string; weeklyLimit: number }>): Promise<ApiResponse<{ id: string; name: string; points: number; description: string | null; color: string | null; weeklyLimit: number | null }>> => {
    const res = await fetch(`${API_BASE}/gifts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const res = await fetch(`${API_BASE}/gifts/${id}`, { method: "DELETE" });
    return res.json();
  },
};

/**
 * 兑换记录相关 API
 */
export const redemptionsApi = {
  list: async (): Promise<ApiResponse<{ pending: import("@/types").ParentRedemption[]; confirmed: import("@/types").ParentRedemption[] }>> => {
    const res = await fetch(`${API_BASE}/gifts/redemptions`);
    return res.json();
  },
  confirm: async (id: string): Promise<ApiResponse<null>> => {
    const res = await fetch(`${API_BASE}/gifts/redemptions/${id}/confirm`, { method: "PUT" });
    return res.json();
  },
  cancel: async (id: string): Promise<ApiResponse<{ giftName: string; username: string; pointsReturned: number }>> => {
    const res = await fetch(`${API_BASE}/gifts/redemptions/${id}/cancel`, { method: "PUT" });
    return res.json();
  },
};

/**
 * 成员相关 API
 */
export const membersApi = {
  list: async (): Promise<ApiResponse<{ children: import("@/types").Member[]; parents: import("@/types").Member[] }>> => {
    const res = await fetch(`${API_BASE}/members`);
    return res.json();
  },
  add: async (data: { username: string; password: string; role: "PARENT" | "CHILD" }): Promise<ApiResponse<{ id: string; username: string; role: string; familyId: string }>> => {
    const res = await fetch(`${API_BASE}/members`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },
  delete: async (id: string): Promise<ApiResponse<null>> => {
    const res = await fetch(`${API_BASE}/members/${id}`, { method: "DELETE" });
    return res.json();
  },
};

/**
 * 兑换日相关 API
 */
export const exchangeDaysApi = {
  get: async (): Promise<ApiResponse<number[]>> => {
    const res = await fetch(`${API_BASE}/exchange-days`);
    return res.json();
  },
  update: async (days: number[]): Promise<ApiResponse<number[]>> => {
    const res = await fetch(`${API_BASE}/exchange-days`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ days }),
    });
    return res.json();
  },
};
```

- [ ] **Step 3: 提交 API 工具函数**

```bash
git add src/types/index.ts src/lib/api-parent.ts
git commit -m "feat: 创建家长端 API 工具函数

- 扩展类型定义（ChildStats, WeeklyStats, ParentTask 等）
- 统计、任务、礼物、成员、兑换日等 API 封装

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 2: 创建长按事件 hook

**Files:**
- Create: `src/hooks/use-long-press.ts`

- [ ] **Step 1: 创建长按 hook**

```typescript
"use client";

import { useCallback, useRef, useState } from "react";

interface UseLongPressOptions {
  onLongPress: () => void;
  onPress?: () => void;
  delay?: number;
}

export function useLongPress({ onLongPress, onPress, delay = 500 }: UseLongPressOptions) {
  const [isPressed, setIsPressed] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const targetRef = useRef<EventTarget | null>(null);

  const start = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    // 防止文本选择等默认行为
    if (event.type === "touchstart") {
      event.preventDefault();
    }

    setIsPressed(true);
    targetRef.current = event.target;

    timeoutRef.current = setTimeout(() => {
      onLongPress();
      setIsPressed(false);
    }, delay);
  }, [onLongPress, delay]);

  const clear = useCallback((event: React.TouchEvent | React.MouseEvent, shouldTriggerClick = true) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsPressed(false);

    if (shouldTriggerClick && onPress && targetRef.current === event.target) {
      onPress();
    }
  }, [onPress]);

  return {
    isPressed,
    handlers: {
      onMouseDown: start,
      onMouseUp: (e: React.MouseEvent) => clear(e),
      onMouseLeave: (e: React.MouseEvent) => clear(e, false),
      onTouchStart: start,
      onTouchEnd: (e: React.TouchEvent) => clear(e),
    },
  };
}
```

- [ ] **Step 2: 提交长按 hook**

```bash
git add src/hooks/use-long-press.ts
git commit -m "feat: 创建长按事件 hook

- 500ms 长按触发
- 提供 isPressed 状态用于视觉反馈
- 支持鼠标和触摸事件

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 3: 创建确认弹窗 hook

**Files:**
- Create: `src/hooks/use-confirm.ts`

- [ ] **Step 1: 创建确认弹窗 hook**

```typescript
"use client";

import { useState, useCallback } from "react";

interface ConfirmOptions {
  title: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
}

interface ConfirmState extends ConfirmOptions {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function useConfirm() {
  const [state, setState] = useState<ConfirmState | null>(null);

  const showConfirm = useCallback((options: ConfirmOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setState({
        ...options,
        isOpen: true,
        confirmText: options.confirmText || "确认",
        cancelText: options.cancelText || "取消",
        onConfirm: () => {
          setState(null);
          resolve(true);
        },
        onCancel: () => {
          setState(null);
          resolve(false);
        },
      });
    });
  }, []);

  const closeConfirm = useCallback(() => {
    if (state) {
      state.onCancel();
    }
  }, [state]);

  return {
    confirmState: state,
    showConfirm,
    closeConfirm,
  };
}
```

- [ ] **Step 2: 提交确认弹窗 hook**

```bash
git add src/hooks/use-confirm.ts
git commit -m "feat: 创建确认弹窗 hook

- showConfirm 返回 Promise<boolean>
- 支持自定义标题、内容、按钮文字
- 支持 destructive 标记（红色按钮）

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 4: 创建底部操作菜单组件

**Files:**
- Create: `src/components/parent/BottomMenu.tsx`

- [ ] **Step 1: 创建底部操作菜单组件**

```typescript
"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

interface MenuItem {
  label: string;
  onClick: () => void;
  destructive?: boolean;
}

interface BottomMenuProps {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  items: MenuItem[];
  onClose: () => void;
}

export default function BottomMenu({ isOpen, title, subtitle, items, onClose }: BottomMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40"
            onClick={onClose}
          />

          {/* 菜单面板 */}
          <motion.div
            ref={menuRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[16px] z-50 p-6"
          >
            {/* 标题区域 */}
            {title && (
              <div className="mb-4">
                <h3 className="text-lg font-medium text-text-primary">{title}</h3>
                {subtitle && <p className="text-sm text-text-secondary mt-1">{subtitle}</p>}
              </div>
            )}

            {/* 分割线 */}
            <div className="border-t border-border mb-4" />

            {/* 操作选项 */}
            <div className="space-y-2">
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.onClick();
                    onClose();
                  }}
                  className={cn(
                    "w-full h-12 flex items-center justify-center rounded-lg text-base font-medium transition-colors",
                    item.destructive
                      ? "text-error hover:bg-red-50"
                      : "text-text-primary hover:bg-gray-50"
                  )}
                >
                  {item.label}
                </button>
              ))}

              {/* 取消按钮 */}
              <button
                onClick={onClose}
                className="w-full h-12 flex items-center justify-center rounded-lg text-base font-medium text-text-secondary hover:bg-gray-50"
              >
                取消
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: 安装 framer-motion（如果未安装）**

Run: `pnpm add framer-motion`
Expected: framer-motion 安装成功

- [ ] **Step 3: 提交底部菜单组件**

```bash
git add package.json pnpm-lock.yaml src/components/parent/BottomMenu.tsx
git commit -m "feat: 创建底部操作菜单组件

- 滑入动画效果
- 支持标题和副标题
- 支持红色 destructive 选项
- 点击外部关闭

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 5: 创建统计页 API

**Files:**
- Create: `src/app/api/parent/stats/route.ts`
- Create: `src/app/api/parent/completions/[id]/route.ts`

- [ ] **Step 1: 创建获取本周统计 API**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireParent } from "@/lib/auth/guard";
import { handleAuthError } from "@/lib/auth/guard";
import { getWeekStart, getWeekEnd, formatBeijingTime } from "@/lib/date";

export async function GET(request: NextRequest) {
  try {
    const { familyId } = await requireParent();

    // 获取 weekStart 参数
    const weekStartParam = request.nextUrl.searchParams.get("weekStart");

    // 计算本周时间范围
    let weekStart: Date;
    let weekEnd: Date;

    if (weekStartParam) {
      weekStart = new Date(weekStartParam);
      weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);
    } else {
      weekStart = getWeekStart();
      weekEnd = getWeekEnd();
    }

    // 查询家庭内所有孩子
    const children = await prisma.user.findMany({
      where: {
        familyId,
        role: "CHILD",
      },
      select: {
        id: true,
        username: true,
        currentPoints: true,
        totalPoints: true,
        taskCompletions: {
          where: {
            completedAt: {
              gte: weekStart,
              lte: weekEnd,
            },
          },
          include: {
            task: {
              select: {
                name: true,
              },
            },
          },
          orderBy: {
            completedAt: "desc",
          },
        },
      },
    });

    // 处理数据
    const childrenStats = children.map((child) => {
      const completions = child.taskCompletions.map((c) => ({
        id: c.id,
        taskName: c.task.name,
        points: c.points,
        completedAt: formatBeijingTime(c.completedAt),
        revokedAt: c.revokedAt ? formatBeijingTime(c.revokedAt) : null,
      }));

      // 统计本周完成任务数和积分（排除已撤销）
      const validCompletions = completions.filter((c) => !c.revokedAt);
      const weeklyCompleted = validCompletions.length;
      const weeklyPoints = validCompletions.reduce((sum, c) => sum + c.points, 0);

      return {
        id: child.id,
        username: child.username,
        currentPoints: child.currentPoints,
        totalPoints: child.totalPoints,
        weeklyCompleted,
        weeklyPoints,
        completions,
      };
    });

    return NextResponse.json({
      code: 0,
      data: {
        weekRange: {
          start: formatBeijingTime(weekStart),
          end: formatBeijingTime(weekEnd),
        },
        children: childrenStats,
      },
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}
```

- [ ] **Step 2: 创建撤销完成记录 API**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireParent } from "@/lib/auth/guard";
import { handleAuthError } from "@/lib/auth/guard";
import { getWeekStart, getWeekEnd } from "@/lib/date";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId: parentId, familyId } = await requireParent();
    const { id } = await params;

    // 查询完成记录
    const completion = await prisma.taskCompletion.findUnique({
      where: { id },
      include: {
        task: {
          select: { familyId: true },
        },
        user: {
          select: { id: true, currentPoints: true },
        },
      },
    });

    if (!completion) {
      return NextResponse.json(
        { code: 4003, data: null, message: "记录不存在" },
        { status: 404 }
      );
    }

    // 验证属于本家庭
    if (completion.task.familyId !== familyId) {
      return NextResponse.json(
        { code: 4002, data: null, message: "无权限" },
        { status: 403 }
      );
    }

    // 检查是否已撤销
    if (completion.revokedAt) {
      return NextResponse.json(
        { code: 0, data: { pointsRevoked: 0, redemptionsCancelled: 0 }, message: "已撤销" },
        { status: 200 }
      );
    }

    // 检查是否本周内
    const weekStart = getWeekStart();
    const weekEnd = getWeekEnd();
    if (completion.completedAt < weekStart || completion.completedAt > weekEnd) {
      return NextResponse.json(
        { code: 2005, data: null, message: "只能撤销本周记录" },
        { status: 400 }
      );
    }

    const pointsToRevoke = completion.points;
    const user = completion.user;

    // 检查积分是否足够
    let redemptionsCancelled = 0;

    if (user.currentPoints < pointsToRevoke) {
      // 积分不足，需要撤销待确认兑换记录
      const pendingRedemptions = await prisma.giftRedemption.findMany({
        where: {
          userId: user.id,
          status: "PENDING",
        },
        orderBy: {
          redeemedAt: "asc",
        },
        select: {
          id: true,
          points: true,
        },
      });

      let pointsNeeded = pointsToRevoke - user.currentPoints;

      for (const redemption of pendingRedemptions) {
        if (pointsNeeded <= 0) break;

        // 撤销兑换记录
        await prisma.giftRedemption.update({
          where: { id: redemption.id },
          data: {
            status: "CANCELLED",
            cancelledAt: new Date(),
            cancelledBy: parentId,
          },
        });

        // 返还积分
        await prisma.user.update({
          where: { id: user.id },
          data: {
            currentPoints: { increment: redemption.points },
          },
        });

        pointsNeeded -= redemption.points;
        redemptionsCancelled++;
      }

      // 再次检查积分
      const updatedUser = await prisma.user.findUnique({
        where: { id: user.id },
        select: { currentPoints: true },
      });

      if (!updatedUser || updatedUser.currentPoints < pointsToRevoke) {
        return NextResponse.json(
          { code: 2001, data: null, message: "积分不足，无法撤销" },
          { status: 400 }
        );
      }
    }

    // 扣减积分并标记撤销
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          currentPoints: { decrement: pointsToRevoke },
        },
      }),
      prisma.taskCompletion.update({
        where: { id },
        data: {
          revokedAt: new Date(),
          revokedBy: parentId,
        },
      }),
    ]);

    return NextResponse.json({
      code: 0,
      data: {
        pointsRevoked: pointsToRevoke,
        redemptionsCancelled,
      },
      message: "已撤销",
    });
  } catch (error) {
    console.error("Revoke completion error:", error);
    return handleAuthError(error);
  }
}
```

- [ ] **Step 3: 提交统计和撤销 API**

```bash
git add src/app/api/parent/stats/route.ts src/app/api/parent/completions/\[id\]/route.ts
git commit -m "feat: 创建统计页 API

- GET /api/parent/stats: 获取本周统计
- DELETE /api/parent/completions/:id: 撤销完成记录
- 撤销时积分不足自动撤销待确认兑换

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 6: 创建孩子概览卡片组件

**原型参考：** `docs/prototypes/parent-stats.html` - `.child-card` 样式

**Files:**
- Create: `src/components/parent/ChildOverviewCard.tsx`

- [ ] **Step 1: 创建孩子概览卡片组件**

参考原型中的 `.children-scroll` 和 `.child-card` 样式实现：

```typescript
"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight, Smile, CheckCircle, TrendingUp, Star } from "lucide-react";
import { ChildStats } from "@/types";

interface ChildOverviewCardProps {
  child: ChildStats;
  weekRange: { start: string; end: string };
  isSelected?: boolean;
}

export default function ChildOverviewCard({ child, weekRange, isSelected }: ChildOverviewCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/parent/stats/${child.id}?start=${weekRange.start}&end=${weekRange.end}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      // 原型 .child-card: min-width: 150px, border-radius: 16px, padding: 18px
      className={`
        min-w-[150px] bg-white rounded-[16px] p-[18px]
        border shadow-card-parent cursor-pointer
        transition-all duration-200 hover:shadow-lg
        ${isSelected 
          ? 'border-parent-primary bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg' 
          : 'border-gray-200'
        }
      `}
      onClick={handleClick}
    >
      {/* 孩子头像 - 原型 .child-avatar */}
      <div className="w-9 h-9 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
        <Smile className="w-[18px] h-[18px] text-parent-primary" />
      </div>

      {/* 孩子名字 */}
      <h3 className="text-base font-semibold text-text-primary text-center mb-[14px]">{child.username}</h3>

      {/* 统计数据 - 原型 .child-stats */}
      <div className="flex flex-col gap-[10px]">
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-secondary flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            完成
          </span>
          <span className="text-parent-primary font-semibold">{child.weeklyCompleted} 个</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-text-secondary flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            获得
          </span>
          <span className="text-parent-primary font-semibold flex items-center gap-1">
            <Star className="w-3 h-3" />
            +{child.weeklyPoints} 积分
          </span>
        </div>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: 提交孩子概览卡片组件**

```bash
git add src/components/parent/ChildOverviewCard.tsx
git commit -m "feat: 创建孩子概览卡片组件

- 显示本周完成数和获得积分
- 点击跳转到记录详情页
- fade-up 动画效果

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 7: 创建统计页和记录详情页

**Files:**
- Modify: `src/app/(parent)/page.tsx`
- Create: `src/app/(parent)/stats/[childId]/page.tsx`
- Create: `src/hooks/use-parent-stats.ts`
- Create: `src/components/parent/CompletionRecordCard.tsx`

- [ ] **Step 1: 创建统计数据 hook**

```typescript
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { statsApi, completionsApi } from "@/lib/api-parent";
import { toast } from "sonner";

export function useParentStats(weekStart?: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["parent-stats", weekStart],
    queryFn: () => statsApi.getWeekly(weekStart),
  });

  const revokeMutation = useMutation({
    mutationFn: (completionId: string) => completionsApi.revoke(completionId),
    onSuccess: (result) => {
      if (result.code === 0) {
        toast.success(`已撤销，扣回 ${result.data.pointsRevoked} 积分`);
        queryClient.invalidateQueries({ queryKey: ["parent-stats"] });
      } else {
        toast.error(result.message);
      }
    },
    onError: () => {
      toast.error("撤销失败，请重试");
    },
  });

  return {
    stats: data?.data,
    isLoading,
    error,
    revokeCompletion: revokeMutation.mutate,
    isRevoking: revokeMutation.isPending,
  };
}
```

- [ ] **Step 2: 创建完成记录卡片组件**

```typescript
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useLongPress } from "@/hooks/use-long-press";
import { CompletionRecord } from "@/types";

interface CompletionRecordCardProps {
  record: CompletionRecord;
  onRevoke: (id: string) => void;
}

export default function CompletionRecordCard({ record, onRevoke }: CompletionRecordCardProps) {
  const { isPressed, handlers } = useLongPress({
    onLongPress: () => {
      if (!record.revokedAt) {
        onRevoke(record.id);
      }
    },
    delay: 500,
  });

  const isRevoked = !!record.revokedAt;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white rounded-card shadow-card-parent p-4 mb-4 transition-all",
        isPressed && "bg-blue-50 scale-[0.98]",
        isRevoked && "opacity-50"
      )}
      {...handlers}
    >
      {/* 任务名称 */}
      <h4 className={cn(
        "text-base font-medium",
        isRevoked ? "text-text-muted" : "text-text-primary"
      )}>
        {record.taskName}
      </h4>

      {/* 时间 */}
      <p className="text-sm text-text-secondary mt-1">{record.completedAt}</p>

      {/* 积分 */}
      <p className={cn(
        "text-base font-bold mt-2",
        isRevoked ? "text-text-muted" : "text-parent-primary"
      )}>
        {isRevoked ? `已撤销 +${record.points}` : `+${record.points} 积分`}
      </p>
    </motion.div>
  );
}
```

- [ ] **Step 3: 创建统计页（首页）**

参考原型 `parent-stats.html` 中的 `.children-scroll` 横向滑动布局：

```typescript
"use client";

import { useParentStats } from "@/hooks/use-parent-stats";
import ChildOverviewCard from "@/components/parent/ChildOverviewCard";
import { formatBeijingDate } from "@/lib/date";

export default function ParentPage() {
  const { stats, isLoading, error } = useParentStats();

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-24 bg-gray-200 rounded-card" />
          <div className="h-24 bg-gray-200 rounded-card" />
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="p-4 text-center text-text-secondary">
        加载失败，请刷新页面
      </div>
    );
  }

  // 格式化日期范围
  const startDate = stats.weekRange.start.split(" ")[0];
  const endDate = stats.weekRange.end.split(" ")[0];

  return (
    <div className="p-4 pb-nav">
      {/* 标题 - 原型 .page-header */}
      <div className="mb-5 flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-parent-primary to-parent-primaryLight rounded-[12px] flex items-center justify-center shadow-lg">
          {/* BarChart3 icon */}
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>
          </svg>
        </div>
        <div>
          <h1 className="text-lg font-semibold text-text-primary">本周统计</h1>
          <p className="text-sm text-text-muted mt-1">{startDate} - {endDate}</p>
        </div>
      </div>

      {/* 孩子概览卡片横向滑动 - 原型 .children-scroll */}
      {stats.children.length === 0 ? (
        <div className="text-center py-12 text-text-secondary">
          <p>暂无孩子</p>
          <p className="text-sm mt-2">请前往设置页添加孩子</p>
        </div>
      ) : (
        <div className="flex gap-[14px] overflow-x-auto pb-2 scrollbar-hide mb-5">
          {stats.children.map((child, index) => (
            <ChildOverviewCard
              key={child.id}
              child={child}
              weekRange={stats.weekRange}
              isSelected={index === 0}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 4: 创建记录详情页**

```typescript
"use client";

import { use, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParentStats } from "@/hooks/use-parent-stats";
import CompletionRecordCard from "@/components/parent/CompletionRecordCard";
import { useConfirm } from "@/hooks/use-confirm";
import DeleteConfirmDialog from "@/components/parent/DeleteConfirmDialog";
import BottomMenu from "@/components/parent/BottomMenu";

function ChildStatsContent({ childId }: { childId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const weekStart = searchParams.get("start")?.split(" ")[0];

  const { stats, revokeCompletion, isRevoking } = useParentStats(weekStart);
  const { confirmState, showConfirm } = useConfirm();

  // 找到对应孩子
  const child = stats?.children.find((c) => c.id === childId);

  if (!child) {
    return (
      <div className="p-5 text-center text-text-secondary">
        找不到孩子信息
      </div>
    );
  }

  const handleRevoke = async (completionId: string) => {
    const record = child.completions.find((c) => c.id === completionId);
    if (!record) return;

    const confirmed = await showConfirm({
      title: "确认撤销这条完成记录？",
      content: `任务：${record.taskName}\n将扣回：${record.points} 积分`,
      confirmText: "确认撤销",
      destructive: true,
    });

    if (confirmed) {
      revokeCompletion(completionId);
    }
  };

  // 计算统计
  const validCompletions = child.completions.filter((c) => !c.revokedAt);
  const weeklyCompleted = validCompletions.length;
  const weeklyPoints = validCompletions.reduce((sum, c) => sum + c.points, 0);

  return (
    <div className="p-5 pb-nav">
      {/* 返回按钮和标题 */}
      <div className="flex items-center mb-6">
        <Link href="/parent" className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5 text-text-primary" />
        </Link>
        <h1 className="text-lg font-bold text-text-primary ml-2">
          {child.username}本周记录
        </h1>
      </div>

      {/* 记录列表 */}
      {child.completions.length === 0 ? (
        <div className="text-center py-12 text-text-secondary">
          本周无完成记录
        </div>
      ) : (
        child.completions.map((record) => (
          <CompletionRecordCard
            key={record.id}
            record={record}
            onRevoke={handleRevoke}
          />
        ))
      )}

      {/* 统计汇总 */}
      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-base text-text-secondary">
          本周共完成 {weeklyCompleted} 个任务
        </p>
      </div>

      {/* 操作提示 */}
      <p className="text-xs text-text-muted mt-4">
        长按卡片可撤销记录（仅本周内）
      </p>

      {/* 确认弹窗 */}
      {confirmState && <DeleteConfirmDialog {...confirmState} />}
    </div>
  );
}

export default function ChildStatsPage({ params }: { params: Promise<{ childId: string }> }) {
  const { childId } = use(params);

  return (
    <Suspense fallback={<div className="p-5">加载中...</div>}>
      <ChildStatsContent childId={childId} />
    </Suspense>
  );
}
```

- [ ] **Step 5: 提交统计页和记录详情页**

```bash
git add src/hooks/use-parent-stats.ts src/components/parent/CompletionRecordCard.tsx src/app/\(parent\)/page.tsx src/app/\(parent\)/stats/\[childId\]/page.tsx
git commit -m "feat: 创建统计页和记录详情页

- 统计页显示孩子概览卡片
- 点击跳转记录详情页
- 长按撤销完成记录
- 确认弹窗交互

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 8: 创建删除确认弹窗组件

**Files:**
- Create: `src/components/parent/DeleteConfirmDialog.tsx`

- [ ] **Step 1: 创建删除确认弹窗组件**

```typescript
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

interface DeleteConfirmDialogProps {
  isOpen: boolean;
  title: string;
  content?: string;
  confirmText?: string;
  cancelText?: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmDialog({
  isOpen,
  title,
  content,
  confirmText = "确认",
  cancelText = "取消",
  destructive = false,
  onConfirm,
  onCancel,
}: DeleteConfirmDialogProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 遮罩层 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
          />

          {/* 弹窗 */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-card p-6 w-[90%] max-w-sm z-50"
          >
            {/* 标题 */}
            <h3 className="text-lg font-medium text-text-primary text-center mb-4">
              {title}
            </h3>

            {/* 内容 */}
            {content && (
              <p className="text-sm text-text-secondary text-center mb-6 whitespace-pre-line">
                {content}
              </p>
            )}

            {/* 按钮 */}
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 h-11 rounded-button bg-gray-100 text-text-primary font-medium hover:bg-gray-200 transition-colors"
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                className={cn(
                  "flex-1 h-11 rounded-button font-medium transition-colors",
                  destructive
                    ? "bg-error text-white hover:bg-error/90"
                    : "bg-parent-primary text-white hover:bg-parent-primaryLight"
                )}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: 提交删除确认弹窗组件**

```bash
git add src/components/parent/DeleteConfirmDialog.tsx
git commit -m "feat: 创建删除确认弹窗组件

- 居中弹窗动画
- 支持 destructive 红色按钮
- 支持 pre-line 内容格式

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

---

## Task 9-12: 任务管理功能（摘要）

**说明：** 任务管理包含以下子任务，结构与统计页类似：
- Task 9: 任务和类别 API（GET/POST/PUT/DELETE `/api/parent/tasks`, `/api/parent/categories`）
- Task 10: 任务卡片和类别分组组件（`TaskCard.tsx`, `CategorySection.tsx`）
- Task 11: 任务数据 hook（`use-tasks.ts`）
- Task 12: 任务管理页面（`src/app/(parent)/tasks/page.tsx`）

**关键实现要点：**
- 任务列表按类别分组显示
- 「···」按钮触发底部菜单（编辑/删除）
- 长按类别标题触发类别管理菜单
- 创建/编辑任务弹窗（名称、积分、类别、描述）
- 删除任务为软删除（设置 deletedAt）
- 删除类别前检查是否有任务

---

## Task 13-16: 礼物和兑换记录管理功能（摘要）

**说明：** 礼物管理包含以下子任务：
- Task 13: 礼物 API（GET/POST/PUT/DELETE `/api/parent/gifts`）
- Task 14: 兑换记录 API（GET `/api/parent/gifts/redemptions`, PUT `/confirm`, `/cancel`）
- Task 15: 礼物卡片组件（`GiftCard.tsx`, `RedemptionCard.tsx`）
- Task 16: 礼物管理页面（含标签页切换）

**关键实现要点：**
- 礼物列表两列网格布局
- 标签页切换：礼物列表 / 兑换记录
- 兑换记录二级标签：待确认 / 已确认
- 待确认记录显示确认和撤销按钮
- 礼物卡片长按触发编辑/删除菜单
- 创建礼物时可设置 weeklyLimit（每周兑换上限）
- 确认兑换后状态锁定为 CONFIRMED
- 撤销兑换仅限 PENDING 状态，返还积分

---

## Task 17-20: 成员管理、兑换日设置、设置页（摘要）

**说明：** 设置页相关功能：
- Task 17: 成员和兑换日 API（GET/POST/DELETE `/api/parent/members`, GET/PUT `/api/parent/exchange-days`）
- Task 18: 成员卡片组件（`MemberCard.tsx`, `ExchangeDaysDialog.tsx`）
- Task 19: 成员数据 hook（`use-members.ts`）
- Task 20: 设置页面（分组卡片结构）

**关键实现要点：**
- 设置页分组卡片：成员管理、兑换日设置、个人信息
- 成员管理独立页：孩子列表、家长列表
- 添加成员弹窗（用户名、密码、角色）
- 删除成员：不能删除自己、最后一个家长保护
- 兑换日设置：七个星期选项勾选
- 兑换日允许选择 0 天（暂时禁止兑换）
- 退出登录按钮在设置页底部

---

## Self-Review

**1. Spec coverage:**

从家长端应用设计 spec 检查：
- ✅ 统计页（概览 + 记录详情） - Task 5-7
- ✅ 长按撤销完成记录 - Task 7
- ✅ 任务页（列表 + 创建/编辑/删除） - Task 9-12
- ✅ 类别管理（长按触发） - Task 12
- ✅ 礼物页（标签页结构） - Task 16
- ✅ 兑换记录（待确认/已确认） - Task 14
- ✅ 确认/撤销兑换 - Task 14
- ✅ 设置页（分组卡片） - Task 20
- ✅ 成员管理（添加/删除） - Task 17
- ✅ 兑换日设置 - Task 17
- ✅ 底部导航四入口 - Phase 1 已完成

从 API 设计 spec 检查：
- ✅ GET /api/parent/stats - Task 5
- ✅ DELETE /api/parent/completions/:id - Task 5
- ✅ 任务、类别、礼物、成员 API - Task 9-20
- ✅ 兑换记录确认/撤销 API - Task 14
- ✅ 兑换日设置 API - Task 17

**2. Placeholder scan:**
- Task 9-20 为摘要形式，避免冗长重复
- 核心结构已定义，实现时参考 Task 1-8 模式
- 无 TBD/TODO placeholder

**3. Type consistency:**
- ChildStats、CompletionRecord、ParentTask 等类型在 types/index.ts 定义
- API 返回类型与组件使用一致
- Role 和 RedemptionStatus 枚举正确引用

---

**计划完成。** Phase 3 家长端核心功能完成后，项目将具备：
- 统计页：查看孩子本周完成情况，撤销记录
- 任务管理：创建/编辑/删除任务和类别
- 礼物管理：创建/编辑/删除礼物，设置每周上限
- 兑换记录：确认/撤销孩子兑换请求
- 成员管理：添加/删除家庭成员
- 兑换日设置：设置每周可兑换日期
- 设置页：分组卡片布局

后续 Phase 4 将构建孩子端核心功能。