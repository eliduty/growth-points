# Phase 4: 孩子端核心功能实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-step. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完成孩子端核心功能，包括任务页（积分概览 + 任务列表）、礼物页（礼物列表 + 兑换）、个人中心页（历史记录）。

**Architecture:** React Query 数据获取，React Hook Form 表单管理，Framer Motion 动画，底部导航三入口。

**Tech Stack:** TanStack React Query, React Hook Form, Zod, Framer Motion, Lucide React Icons

---

## 原型参考

**前端页面实现参考 `docs/prototypes/` 目录下的原型 HTML 文件：**

| 页面 | 原型文件 | 关键组件 |
|------|----------|----------|
| 任务页 | `child-tasks.html` | PointsOverview, TaskList, CategoryGroup |
| 礼物页 | `child-gifts.html` | ExchangeDayInfo, GiftGrid |
| 个人中心页 | `child-profile.html` | UserInfoCard, TabSwitch, WeekHistory |

**核心 CSS 样式映射（原型 → Tailwind）：**

| 原型样式 | Tailwind 类 |
|----------|-------------|
| 积分卡片渐变 `linear-gradient(135deg, #FF6B35, #FF8A50)` | `bg-gradient-to-br from-child-primary to-child-primaryLight` |
| 积分卡片圆角 `24px` + 阴影 | `rounded-[24px] shadow-lg shadow-child-primary/25` |
| 积分卡片旋转动画背景 | CSS `::before` + `animation: rotate 20s linear infinite` |
| 类别分组卡片 `border-radius: 16px` | `rounded-[16px] border border-child-primary/8` |
| 完成按钮渐变 | `bg-gradient-to-br from-child-primary to-child-primaryLight rounded-[12px]` |
| 确认弹窗动画 `popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)` | `scale(0.8) → scale(1)` |
| 成功 Toast `toastPop` 动画 | `scale(0) → scale(1.1) → scale(1)` |
| 礼物网格 `grid-template-columns: repeat(2, 1fr)` | `grid grid-cols-2 gap-[14px]` |
| 礼物颜色背景渐变 | `bg-gradient-to-br from-[color1] to-[color2]` |

---

## 文件结构规划

```
src/
├── app/
│   └── (child)/
│       ├── layout.tsx           # 已存在
│       ├── page.tsx             # 任务页（首页）
│       ├── gifts/
│       │   └── page.tsx         # 礼物页
│       └── profile/
│       │   └── page.tsx         # 个人中心页
│
├── app/api/
│   └── child/
│       ├── tasks/
│       │   ├── route.ts         # 获取任务列表
│       │   └── [id]/
│       │       └── complete/
│       │           └── route.ts # 完成任务
│       ├── gifts/
│       │   ├── route.ts         # 获取礼物列表
│       │   └── redeem/
│       │       └── route.ts     # 兑换礼物
│       └── history/
│           ├── completions/
│           │   └── route.ts     # 任务历史
│           └── redemptions/
│           │   └── route.ts     # 礼物历史
│
├── components/
│   └── child/
│       ├── PointsOverview.tsx   # 积分概览卡片
│       ├── TaskList.tsx         # 任务列表组件
│       ├── TaskItem.tsx         # 单个任务项
│       ├── CategoryGroup.tsx    # 类别分组
│       ├── GiftGrid.tsx         # 礼物网格
│       ├── GiftItem.tsx         # 单个礼物卡片
│       ├── ExchangeDayInfo.tsx  # 兑换日提示
│       ├── HistoryTab.tsx       # 历史记录标签切换
│       ├── WeekHistory.tsx      # 单周历史记录
│       ├── CompleteConfirmDialog.tsx  # 完成确认弹窗
│       └── RedeemConfirmDialog.tsx    # 兑换确认弹窗
│
├── hooks/
│   ├── use-child-tasks.ts       # 任务数据 hook
│   ├── use-child-gifts.ts       # 礼物数据 hook
│   └── use-child-history.ts     # 历史数据 hook
│
└── lib/
│   └── api-child.ts             # 孩子端 API 工具
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

## Task 1: 创建孩子端 API 工具函数

**Files:**
- Create: `src/lib/api-child.ts`
- Modify: `src/types/index.ts`

- [ ] **Step 1: 扩展类型定义**

在 `src/types/index.ts` 末尾添加：

```typescript
/**
 * 孩子端任务类型
 */
export interface ChildTask {
  id: string;
  name: string;
  points: number;
  description: string | null;
  categoryId: string;
  categoryName: string;
  categoryOrder: number;
  completed: boolean;
  completedAt: string | null;
}

/**
 * 孩子端礼物类型
 */
export interface ChildGift {
  id: string;
  name: string;
  points: number;
  description: string | null;
  color: string | null;
  weeklyLimit: number | null;
  weeklyRedeemed: number;
  limitStatus: "unlimited" | "available" | "exhausted";
  canRedeem: boolean;
}

/**
 * 兑换日信息类型
 */
export interface ExchangeDayInfo {
  days: number[];
  isExchangeDay: boolean;
  nextExchangeDay?: {
    dayOfWeek: number;
    daysUntil: number;
  } | null;
}

/**
 * 孩子端礼物页响应类型
 */
export interface ChildGiftsResponse {
  exchangeDaysInfo: ExchangeDayInfo;
  gifts: ChildGift[];
  pendingRedemptions: {
    id: string;
    giftName: string;
    points: number;
    redeemedAt: string;
  }[];
}
```

- [ ] **Step 2: 创建孩子端 API 工具函数**

```typescript
import { ApiResponse } from "@/types";

const API_BASE = "/api/child";

/**
 * 任务相关 API
 */
export const childTasksApi = {
  list: async (date?: string): Promise<ApiResponse<{
    pointsOverview: { current: number; total: number; weekly: number };
    categories: { id: string; name: string; order: number; tasks: import("@/types").ChildTask[] }[];
    completedTasks: { id: string; taskName: string; points: number; completedAt: string }[];
  }>> => {
    const url = date ? `${API_BASE}/tasks?date=${date}` : `${API_BASE}/tasks`;
    const res = await fetch(url);
    return res.json();
  },
  complete: async (taskId: string): Promise<ApiResponse<{ pointsEarned: number; currentPoints: number }>> => {
    const res = await fetch(`${API_BASE}/tasks/${taskId}/complete`, { method: "POST" });
    return res.json();
  },
};

/**
 * 礼物相关 API
 */
export const childGiftsApi = {
  list: async (): Promise<ApiResponse<import("@/types").ChildGiftsResponse>> => {
    const res = await fetch(`${API_BASE}/gifts`);
    return res.json();
  },
  redeem: async (giftId: string): Promise<ApiResponse<{
    redemptionId: string;
    pointsSpent: number;
    currentPoints: number;
    status: "PENDING";
  }>> => {
    const res = await fetch(`${API_BASE}/gifts/redeem`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ giftId }),
    });
    return res.json();
  },
};

/**
 * 历史记录相关 API
 */
export const childHistoryApi = {
  completions: async (weeks?: number): Promise<ApiResponse<{
    weekRange: { start: string; end: string };
    completions: { id: string; taskName: string; points: number; completedAt: string; revoked: boolean }[];
    summary: { completed: number; points: number };
  }[]>> => {
    const url = weeks ? `${API_BASE}/history/completions?weeks=${weeks}` : `${API_BASE}/history/completions`;
    const res = await fetch(url);
    return res.json();
  },
  redemptions: async (weeks?: number): Promise<ApiResponse<{
    weekRange: { start: string; end: string };
    redemptions: { id: string; giftName: string; giftColor: string | null; points: number; redeemedAt: string; status: "PENDING" | "CONFIRMED" | "CANCELLED"; confirmedAt?: string; cancelledAt?: string }[];
    summary: { confirmed: number; pointsSpent: number; pending: number };
  }[]>> => {
    const url = weeks ? `${API_BASE}/history/redemptions?weeks=${weeks}` : `${API_BASE}/history/redemptions`;
    const res = await fetch(url);
    return res.json();
  },
};
```

- [ ] **Step 3: 提交孩子端 API 工具函数**

```bash
git add src/types/index.ts src/lib/api-child.ts
git commit -m "feat: 创建孩子端 API 工具函数

- 扩展类型定义（ChildTask, ChildGift, ExchangeDayInfo）
- 任务、礼物、历史记录 API 封装

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 2: 创建孩子端任务 API

**Files:**
- Create: `src/app/api/child/tasks/route.ts`
- Create: `src/app/api/child/tasks/[id]/complete/route.ts`

- [ ] **Step 1: 创建获取任务列表 API**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireChild } from "@/lib/auth/guard";
import { handleAuthError } from "@/lib/auth/guard";
import { getWeekStart, getWeekEnd, formatBeijingTime, getBeijingNow } from "@/lib/date";

export async function GET(request: NextRequest) {
  try {
    const { userId, familyId } = await requireChild();

    // 获取日期参数（可选）
    const dateParam = request.nextUrl.searchParams.get("date");
    const targetDate = dateParam ? new Date(dateParam) : getBeijingNow().toDate();

    // 计算本周时间范围
    const weekStart = getWeekStart();
    const weekEnd = getWeekEnd();

    // 查询用户积分信息
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        currentPoints: true,
        totalPoints: true,
        taskCompletions: {
          where: {
            completedAt: { gte: weekStart, lte: weekEnd },
            revokedAt: null,
          },
          select: { points: true },
        },
      },
    });

    if (!user) {
      return NextResponse.json(
        { code: 4003, data: null, message: "用户不存在" },
        { status: 404 }
      );
    }

    // 本周获得积分
    const weeklyPoints = user.taskCompletions.reduce((sum, c) => sum + c.points, 0);

    // 查询家庭所有类别（按 order 排序）
    const categories = await prisma.category.findMany({
      where: { familyId },
      orderBy: { order: "asc" },
      select: {
        id: true,
        name: true,
        order: true,
        tasks: {
          where: { deletedAt: null },
          select: {
            id: true,
            name: true,
            points: true,
            description: true,
          },
        },
      },
    });

    // 查询用户当天完成的任务
    const todayStart = new Date(targetDate);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(targetDate);
    todayEnd.setHours(23, 59, 59, 999);

    const todayCompletions = await prisma.taskCompletion.findMany({
      where: {
        userId,
        completedAt: { gte: todayStart, lte: todayEnd },
        revokedAt: null,
      },
      select: {
        taskId: true,
        completedAt: true,
      },
    });

    const completedTaskIds = new Set(todayCompletions.map((c) => c.taskId));

    // 处理数据
    const categoriesWithTasks = categories.map((category) => ({
      id: category.id,
      name: category.name,
      order: category.order,
      tasks: category.tasks.map((task) => ({
        id: task.id,
        name: task.name,
        points: task.points,
        description: task.description,
        categoryId: category.id,
        categoryName: category.name,
        categoryOrder: category.order,
        completed: completedTaskIds.has(task.id),
        completedAt: completedTaskIds.has(task.id)
          ? formatBeijingTime(todayCompletions.find((c) => c.taskId === task.id)?.completedAt!)
          : null,
      })),
    }));

    // 已完成列表
    const completedTasks = categoriesWithTasks
      .flatMap((c) => c.tasks)
      .filter((t) => t.completed)
      .map((t) => ({
        id: t.id,
        taskName: t.name,
        points: t.points,
        completedAt: t.completedAt!,
      }));

    return NextResponse.json({
      code: 0,
      data: {
        pointsOverview: {
          current: user.currentPoints,
          total: user.totalPoints,
          weekly: weeklyPoints,
        },
        categories: categoriesWithTasks,
        completedTasks,
      },
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}
```

- [ ] **Step 2: 创建完成任务 API**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireChild } from "@/lib/auth/guard";
import { handleAuthError } from "@/lib/auth/guard";
import { getBeijingNow } from "@/lib/date";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await requireChild();
    const { id: taskId } = await params;

    // 查询任务
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: {
        id: true,
        points: true,
        deletedAt: true,
      },
    });

    if (!task || task.deletedAt) {
      return NextResponse.json(
        { code: 4003, data: null, message: "任务不存在" },
        { status: 404 }
      );
    }

    // 查询今天是否已完成该任务
    const now = getBeijingNow().toDate();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);

    const existingCompletion = await prisma.taskCompletion.findFirst({
      where: {
        userId,
        taskId,
        completedAt: { gte: todayStart, lte: todayEnd },
        revokedAt: null,
      },
    });

    if (existingCompletion) {
      return NextResponse.json(
        { code: 2002, data: null, message: "今日已完成该任务" },
        { status: 400 }
      );
    }

    // 创建完成记录并增加积分
    const result = await prisma.$transaction([
      prisma.taskCompletion.create({
        data: {
          taskId,
          userId,
          points: task.points,
        },
      }),
      prisma.user.update({
        where: { id: userId },
        data: {
          currentPoints: { increment: task.points },
          totalPoints: { increment: task.points },
        },
      }),
    ]);

    return NextResponse.json({
      code: 0,
      data: {
        pointsEarned: task.points,
        currentPoints: result[1].currentPoints,
      },
      message: "任务已完成",
    });
  } catch (error) {
    console.error("Complete task error:", error);
    return handleAuthError(error);
  }
}
```

- [ ] **Step 3: 提交任务 API**

```bash
git add src/app/api/child/tasks/route.ts src/app/api/child/tasks/\[id\]/complete/route.ts
git commit -m "feat: 创建孩子端任务 API

- GET /api/child/tasks: 获取任务列表和积分概览
- POST /api/child/tasks/:id/complete: 完成任务
- 同一任务每天只能完成一次

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 3: 创建积分概览组件

**原型参考：** `docs/prototypes/child-tasks.html` - `.points-card` 样式

**Files:**
- Create: `src/components/child/PointsOverview.tsx`

- [ ] **Step 1: 创建积分概览组件**

参考原型中的积分卡片样式，实现渐变背景和旋转动画：

```typescript
"use client";

import { motion } from "framer-motion";

interface PointsOverviewProps {
  current: number;
  total: number;
  weekly: number;
}

export default function PointsOverview({ current, total, weekly }: PointsOverviewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      // 原型 .points-card: linear-gradient(135deg, #FF6B35 0%, #FF8A50 100%)
      // border-radius: 24px, padding: 32px 28px
      className="relative overflow-hidden rounded-[24px] px-7 py-8 mb-5 text-center text-white
        bg-gradient-to-br from-child-primary to-child-primaryLight
        shadow-[0_8px_24px_rgba(255,107,53,0.25),0_4px_8px_rgba(255,107,53,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]"
    >
      {/* 旋转动画背景 - 原型 .points-card::before */}
      <div 
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] animate-spin-slow"
        style={{
          background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          animationDuration: '20s',
        }}
      />

      {/* 装饰星星 - 原型 .points-decoration */}
      <div className="absolute top-3 left-4 opacity-15">
        {/* Star icon */}
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </div>
      <div className="absolute bottom-3 right-4 opacity-15">
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </div>

      {/* 当前积分标签 */}
      <p className="relative text-sm opacity-90 mb-2">当前积分</p>

      {/* 当前积分（大字号突出） - 原型 .points-value: 56px font-weight: 700 */}
      <motion.p
        key={current}
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 0.3 }}
        className="relative text-[56px] font-bold leading-tight mb-5 drop-shadow-lg"
      >
        {current}
      </motion.p>

      {/* 累计和本周 - 原型 .points-stats */}
      <div className="relative flex justify-center gap-8 text-sm opacity-85">
        <span className="flex items-center gap-1">
          {/* TrendingUp icon */}
          <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
          </svg>
          累计 <span className="font-semibold">{total}</span>
        </span>
        <span className="flex items-center gap-1">
          {/* Calendar icon */}
          <svg className="w-4 h-4 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
            <line x1="16" y1="2" x2="16" y2="6"/>
            <line x1="8" y1="2" x2="8" y2="6"/>
            <line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          本周 <span className="font-semibold">{weekly}</span>
        </span>
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: 提交积分概览组件**

```bash
git add src/components/child/PointsOverview.tsx
git commit -m "feat: 创建积分概览组件

- 当前积分大字号突出显示
- 积分变化时放大动画
- 渐变背景卡片

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 4: 创建任务列表组件

**原型参考：** `docs/prototypes/child-tasks.html` - `.category-group`, `.task-item` 样式

**Files:**
- Create: `src/components/child/TaskItem.tsx`
- Create: `src/components/child/CategoryGroup.tsx`
- Create: `src/components/child/TaskList.tsx`

- [ ] **Step 1: 创建单个任务项组件**

参考原型中的 `.task-item` 和 `.task-btn` 样式：

```typescript
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ChildTask } from "@/types";

interface TaskItemProps {
  task: ChildTask;
  onComplete: (taskId: string) => void;
  isCompleting?: boolean;
}

export default function TaskItem({ task, onComplete, isCompleting }: TaskItemProps) {
  const handleComplete = () => {
    if (!task.completed && !isCompleting) {
      onComplete(task.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      // 原型 .task-item: flex, padding: 14px 0, border-bottom
      className={cn(
        "flex items-center justify-between py-[14px] border-b border-gray-200 last:border-b-0",
        task.completed && "bg-green-50 rounded-[14px] my-[10px] px-[14px] py-[14px] border-b-0"
      )}
    >
      {/* 任务信息 */}
      <div className="flex-1">
        <h4 className="text-base text-text-primary mb-1 flex items-center gap-2">
          {/* 任务图标 */}
          <svg className={cn("w-4 h-4", task.completed ? "text-child-secondary" : "text-child-primary")} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {task.completed 
              ? <polyline points="20 6 9 17 4 12"/>
              : <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
            }
          </svg>
          {task.name}
        </h4>
        {task.description && (
          <p className="text-sm text-text-secondary">{task.description}</p>
        )}
      </div>

      {/* 积分和按钮 */}
      <div className="flex items-center gap-3">
        <span className={cn(
          "text-sm font-semibold flex items-center gap-1",
          task.completed ? "text-child-secondary" : "text-child-primary"
        )}>
          {/* Star icon */}
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          +{task.points}
        </span>

        {task.completed ? (
          <span className="text-sm text-child-secondary bg-child-secondary/20 px-3 py-2 rounded-[12px] flex items-center gap-2">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            已完成
          </span>
        ) : (
          <button
            onClick={handleComplete}
            disabled={isCompleting}
            className={cn(
              // 原型 .task-btn: linear-gradient, border-radius: 12px, padding: 12px 18px
              "bg-gradient-to-br from-child-primary to-child-primaryLight rounded-[12px]",
              "px-[18px] py-3 text-white text-sm font-medium font-family-inherit",
              "shadow-[0_2px_8px_rgba(255,107,53,0.2)]",
              "transition-all duration-150 flex items-center gap-1.5",
              "hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(255,107,53,0.3)]",
              "active:scale-[0.95]",
              isCompleting && "opacity-50"
            )}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M9 12l2 2 4-4"/>
            </svg>
            {isCompleting ? "完成中..." : "完成"}
          </button>
        )}
      </div>
    </motion.div>
  );
}
```

- [ ] **Step 2: 创建类别分组组件**

参考原型中的 `.category-group` 和 `.category-header` 样式：

```typescript
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import TaskItem from "./TaskItem";
import { ChildTask } from "@/types";

interface CategoryGroupProps {
  id: string;
  name: string;
  order: number;
  tasks: ChildTask[];
  onComplete: (taskId: string) => void;
  isCompleting?: string | null;
  defaultExpanded?: boolean;
}

export default function CategoryGroup({
  name,
  tasks,
  onComplete,
  isCompleting,
  defaultExpanded = false,
}: CategoryGroupProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // 分离已完成和未完成任务
  const pendingTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <div className="mb-[14px]">
      {/* 类别标题（可折叠） - 原型 .category-group */}
      <div
        // 原型 .category-group: background: white, border-radius: 16px, padding: 18px
        // border: 1px solid rgba(255, 107, 53, 0.08)
        className="bg-white rounded-[16px] p-[18px] shadow-card border border-child-primary/8"
      >
        <button
          onClick={toggleExpand}
          // 原型 .category-header: flex, justify-between, cursor: pointer
          className="flex items-center justify-between w-full text-base text-text-primary font-medium"
        >
          <span className="flex items-center gap-2.5">
            {/* 类别图标 */}
            <svg className="w-[18px] h-[18px] text-child-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {name.includes("学习") 
                ? <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3 3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3 3h7z"/>
                : name.includes("家务")
                ? <path d="M12 3l1.912 5.813 6.088-1.913-3.5 3.5 3.5 3.5-6.088-1.913L12 21l-1.912-5.813L4 17l3.5-3.5L4 10l6.088 1.913L12 3z"/>
                : <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              }
            </svg>
            <span>【{name}】</span>
          </span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">{pendingTasks.length} 个待完成</span>
            {/* 折叠图标 - 原型 .category-icon */}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.15 }}
              className="w-5 h-5 text-text-muted"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points={isExpanded ? "6 9 12 15 18 9" : "9 18 15 12 9 6"}/>
              </svg>
            </motion.div>
          </div>
        </button>

        {/* 任务列表 - 原型 .task-list */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-[14px]"
            >
              {pendingTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onComplete={onComplete}
                  isCompleting={isCompleting === task.id}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: 创建任务列表组件**

```typescript
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CategoryGroup from "./CategoryGroup";
import { useConfirm } from "@/hooks/use-confirm";
import DeleteConfirmDialog from "@/components/parent/DeleteConfirmDialog";
import { ChildTask } from "@/types";

interface TaskListProps {
  categories: {
    id: string;
    name: string;
    order: number;
    tasks: ChildTask[];
  }[];
  completedTasks: {
    id: string;
    taskName: string;
    points: number;
    completedAt: string;
  }[];
  onComplete: (taskId: string) => Promise<void>;
}

export default function TaskList({ categories, completedTasks, onComplete }: TaskListProps) {
  const [completingTaskId, setCompletingTaskId] = useState<string | null>(null);
  const { confirmState, showConfirm } = useConfirm();

  const handleComplete = async (taskId: string) => {
    const task = categories
      .flatMap((c) => c.tasks)
      .find((t) => t.id === taskId);

    if (!task) return;

    const confirmed = await showConfirm({
      title: "确认完成这个任务？",
      content: `任务：${task.name}\n获得：${task.points} 积分`,
      confirmText: "确认完成",
    });

    if (confirmed) {
      setCompletingTaskId(taskId);
      await onComplete(taskId);
      setCompletingTaskId(null);
    }
  };

  // 第一个类别默认展开
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  return (
    <div>
      {/* 待完成区域 */}
      {sortedCategories.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-text-secondary mb-3">
            【待完成】（{categories.flatMap((c) => c.tasks.filter((t) => !t.completed)).length} 个）
          </h3>

          {sortedCategories.map((category, index) => (
            <CategoryGroup
              key={category.id}
              {...category}
              onComplete={handleComplete}
              isCompleting={completingTaskId}
              defaultExpanded={index === 0}
            />
          ))}
        </div>
      )}

      {/* 已完成区域 */}
      {completedTasks.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-text-secondary mb-3">
            【已完成】（{completedTasks.length} 个）
          </h3>

          {completedTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gray-50 rounded-card p-4 mb-3"
            >
              <p className="text-base text-text-primary">{task.taskName}</p>
              <p className="text-sm text-text-secondary mt-1">{task.completedAt}</p>
              <p className="text-sm text-child-primary mt-1">+{task.points} 积分 ✓已完成</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* 空状态 */}
      {categories.length === 0 && (
        <div className="text-center py-12 text-text-secondary">
          <p>等待家长添加任务</p>
        </div>
      )}

      {/* 确认弹窗 */}
      {confirmState && <DeleteConfirmDialog {...confirmState} />}
    </div>
  );
}
```

- [ ] **Step 4: 提交任务列表组件**

```bash
git add src/components/child/TaskItem.tsx src/components/child/CategoryGroup.tsx src/components/child/TaskList.tsx
git commit -m "feat: 创建任务列表组件

- 类别可折叠，第一个默认展开
- 分离待完成和已完成区域
- 完成按钮触发确认弹窗
- 完成后积分动画更新

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 5: 创建任务页和任务数据 hook

**Files:**
- Create: `src/hooks/use-child-tasks.ts`
- Modify: `src/app/(child)/page.tsx`

- [ ] **Step 1: 创建任务数据 hook**

```typescript
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { childTasksApi } from "@/lib/api-child";
import { toast } from "sonner";

export function useChildTasks(date?: string) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["child-tasks", date],
    queryFn: () => childTasksApi.list(date),
  });

  const completeMutation = useMutation({
    mutationFn: (taskId: string) => childTasksApi.complete(taskId),
    onSuccess: (result) => {
      if (result.code === 0) {
        toast.success(`获得 ${result.data.pointsEarned} 积分！`);
        queryClient.invalidateQueries({ queryKey: ["child-tasks"] });
        queryClient.invalidateQueries({ queryKey: ["child-gifts"] });
      } else {
        toast.error(result.message);
      }
    },
    onError: () => {
      toast.error("完成任务失败，请重试");
    },
  });

  return {
    taskData: data?.data,
    isLoading,
    error,
    completeTask: completeMutation.mutateAsync,
    isCompleting: completeMutation.isPending,
  };
}
```

- [ ] **Step 2: 创建任务页（首页）**

```typescript
"use client";

import { useChildTasks } from "@/hooks/use-child-tasks";
import PointsOverview from "@/components/child/PointsOverview";
import TaskList from "@/components/child/TaskList";

export default function ChildPage() {
  const { taskData, isLoading, error, completeTask } = useChildTasks();

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded-card" />
          <div className="h-8 bg-gray-200 rounded w-1/3" />
          <div className="h-16 bg-gray-200 rounded-card" />
        </div>
      </div>
    );
  }

  if (error || !taskData) {
    return (
      <div className="p-4 text-center text-text-secondary">
        加载失败，请刷新页面
      </div>
    );
  }

  return (
    <div className="p-4 pb-nav">
      {/* 积分概览 */}
      <PointsOverview
        current={taskData.pointsOverview.current}
        total={taskData.pointsOverview.total}
        weekly={taskData.pointsOverview.weekly}
      />

      {/* 任务列表 */}
      <TaskList
        categories={taskData.categories}
        completedTasks={taskData.completedTasks}
        onComplete={completeTask}
      />
    </div>
  );
}
```

- [ ] **Step 3: 提交任务页**

```bash
git add src/hooks/use-child-tasks.ts src/app/\(child\)/page.tsx
git commit -m "feat: 创建任务页（首页）

- 积分概览卡片
- 任务列表按类别分组
- 完成任务交互

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 6-8: 礼物页功能（摘要）

**说明：** 礼物页包含：
- Task 6: 礼物和兑换 API（GET `/api/child/gifts`, POST `/api/child/gifts/redeem`）
- Task 7: 礼物网格组件（`GiftGrid.tsx`, `GiftItem.tsx`, `ExchangeDayInfo.tsx`）
- Task 8: 礼物数据 hook 和礼物页

**关键实现要点：**
- 兑换日提示：非兑换日显示倒计时，兑换日显示"今日可兑换"
- 礼物两列网格布局，彩色背景卡片
- 礼物卡片显示 weeklyLimit 状态（本周可兑 X/Y）
- 兑换按钮：综合考虑积分、上限、兑换日
- 兑换前弹出确认框（礼物详情、消耗积分、当前积分）
- 兑换成功进入 PENDING 状态，等待家长确认
- 待确认兑换列表显示在礼物页底部

---

## Task 9-10: 个人中心页功能（摘要）

**说明：** 个人中心页包含：
- Task 9: 历史记录 API（GET `/api/child/history/completions`, GET `/api/child/history/redemptions`）
- Task 10: 历史记录组件和个人中心页

**关键实现要点：**
- 用户名居中展示
- Tab 切换：任务历史 / 礼物历史
- 按周组织（最近 4 周），本周默认展开
- 每周显示统计汇总
- 退出登录按钮在底部

---

## Self-Review

**1. Spec coverage:**

从孩子端日常使用流程设计 spec 检查：
- ✅ 任务页（积分概览 + 任务列表） - Task 3-5
- ✅ 完成任务确认弹窗 - Task 4
- ✅ 同一任务每天只能完成一次 - Task 2
- ✅ 类别可折叠 - Task 4
- ✅ 礼物页（兑换日提示 + 礼物网格） - Task 6-8
- ✅ 兑换礼物确认流程 - Task 6-8
- ✅ 个人中心页（历史记录） - Task 9-10
- ✅ 底部导航三入口 - Phase 1 已完成

从 API 设计 spec 检查：
- ✅ GET /api/child/tasks - Task 2
- ✅ POST /api/child/tasks/:id/complete - Task 2
- ✅ GET /api/child/gifts - Task 6
- ✅ POST /api/child/gifts/redeem - Task 6
- ✅ GET /api/child/history/completions - Task 9
- ✅ GET /api/child/history/redemptions - Task 9

**2. Placeholder scan:**
- Task 6-10 为摘要形式
- 核心结构已定义，实现时参考 Task 1-5 模式
- 无 TBD/TODO placeholder

**3. Type consistency:**
- ChildTask、ChildGift、ExchangeDayInfo 类型定义完整
- API 返回类型与组件使用一致

---

**计划完成。** Phase 4 孩子端核心功能完成后，项目将具备：
- 任务页：积分概览、任务列表、完成任务
- 礼物页：兑换日提示、礼物网格、兑换礼物
- 个人中心页：用户名、历史记录、退出登录

后续 Phase 5 将实现增量功能（每周兑换上限等），可在 Phase 3-4 基础上扩展。