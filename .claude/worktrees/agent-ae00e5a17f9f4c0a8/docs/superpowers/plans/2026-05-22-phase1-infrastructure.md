# Phase 1: 项目基础设施实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完成项目基础设施搭建，包括数据库模型、依赖安装、目录结构、主题配置和基础工具函数。

**Architecture:** 基于 Next.js 14.2.0 App Router，使用 Prisma + Turso 数据库，shadcn/ui + Lucide React UI组件，React Query 状态管理，Zod 表单验证。

**Tech Stack:** Next.js 14.2.0, React 18.2.0, TypeScript 5.4.0, Tailwind CSS 3.4.4, Prisma 7.8.0, Turso, shadcn/ui, Lucide React, TanStack React Query, React Hook Form, Zod, Day.js, Sonner, bcryptjs

---

## 文件结构规划

```
src/
├── app/
│   ├── (auth)/             # 认证页面路由组
│   ├── (child)/            # 孩子端页面路由组
│   ├── (parent)/           # 家长端页面路由组
│   ├── api/                # API 路由
│   ├── globals.css         # 全局样式 + 动画
│   └── layout.tsx          # 根布局
│
├── components/
│   ├── ui/                 # shadcn/ui 基础组件
│   ├── child/              # 孩子端定制组件
│   ├── parent/             # 家长端定制组件
│   └── shared/             # 共享组件
│
├── lib/
│   ├── db.ts               # Prisma 客户端
│   ├── cn.ts               # 类名合并工具
│   ├── date.ts             # 北京时间处理
│   ├── auth.ts             # 认证相关
│   ├── constants.ts        # 常量定义
│   └── validators.ts       # Zod schemas
│
├── hooks/
│   └── use-user.ts         # 用户 Context Hook
│
├── providers/
│   ├── query-provider.tsx  # React Query Provider
│   └── user-provider.tsx   # 用户 Context Provider
│
├── types/
│   └── index.ts            # 全局类型定义
│
└── generated/
│   └── prisma/             # Prisma 生成的客户端
```

---

## Task 1: 更新 Prisma Schema

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Step 1: 替换 Prisma Schema 为完整的家庭积分系统数据模型**

```prisma
generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "sqlite"
}

// 用户模型
model User {
  id             String   @id @default(cuid())
  username       String
  password       String   // bcrypt 加密存储
  role           Role     // PARENT, CHILD
  familyId       String
  family         Family   @relation(fields: [familyId], references: [id])
  timezoneOffset Int?     // 时区偏移量（如 +8 = 8, -5 = -5）
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  
  // 孩子特有字段
  currentPoints   Int              @default(0)
  totalPoints     Int              @default(0)
  taskCompletions TaskCompletion[]
  giftRedemptions GiftRedemption[]

  @@unique([familyId, username])  // 家庭内用户名唯一
}

// 家庭模型
model Family {
  id           String        @id @default(cuid())
  members      User[]
  tasks        Task[]
  gifts        Gift[]
  categories   Category[]
  exchangeDays ExchangeDay[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

// 类别模型
model Category {
  id        String   @id @default(cuid())
  name      String
  familyId  String
  family    Family   @relation(fields: [familyId], references: [id])
  tasks     Task[]
  order     Int      @default(0)  // 排序顺序
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([familyId, name])  // 家庭内类别名称唯一
}

// 任务模型
model Task {
  id          String          @id @default(cuid())
  name        String
  points      Int
  description String?
  categoryId  String
  category    Category        @relation(fields: [categoryId], references: [id])
  familyId    String
  family      Family          @relation(fields: [familyId], references: [id])
  completions TaskCompletion[]
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
  deletedAt   DateTime?       // 软删除
}

// 任务完成记录
model TaskCompletion {
  id          String   @id @default(cuid())
  taskId      String
  task        Task     @relation(fields: [taskId], references: [id], onDelete: Cascade)
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  points      Int      // 完成时获得的积分（快照）
  completedAt DateTime @default(now())
  revokedAt   DateTime? // 撤销时间
  revokedBy   String?  // 撤销操作人 ID
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// 礼物模型
model Gift {
  id           String           @id @default(cuid())
  name         String
  points       Int
  description  String?          // 礼物描述（可选）
  color        String?          // 预设颜色池随机分配（可选）
  weeklyLimit  Int?             // 每周兑换上限，null 表示无限制
  familyId     String
  family       Family           @relation(fields: [familyId], references: [id])
  redemptions  GiftRedemption[]
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt
  deletedAt    DateTime?        // 软删除
}

// 礼物兑换记录
model GiftRedemption {
  id          String            @id @default(cuid())
  giftId      String
  gift        Gift              @relation(fields: [giftId], references: [id], onDelete: Cascade)
  userId      String
  user        User              @relation(fields: [userId], references: [id])
  points      Int               // 兑换时消耗的积分（快照）
  status      RedemptionStatus  @default(PENDING)
  redeemedAt  DateTime          @default(now())
  confirmedAt DateTime?         // 家长确认时间
  confirmedBy String?           // 确认操作人 ID
  cancelledAt DateTime?         // 撤销时间
  cancelledBy String?           // 撤销操作人 ID
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
}

// 兑换日设置
model ExchangeDay {
  id        String   @id @default(cuid())
  familyId  String
  family    Family   @relation(fields: [familyId], references: [id], onDelete: Cascade)
  dayOfWeek Int      // 0=周日, 1=周一, ..., 6=周六
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([familyId, dayOfWeek])  // 防止同一家庭重复设置同一天
}

// 角色枚举
enum Role {
  PARENT
  CHILD
}

// 兑换状态枚举
enum RedemptionStatus {
  PENDING    // 待确认
  CONFIRMED  // 已确认
  CANCELLED  // 已撤销
}
```

- [ ] **Step 2: 生成 Prisma 客户端**

Run: `pnpm run db:generate`
Expected: Prisma 客户端生成到 `src/generated/prisma`

- [ ] **Step 3: 推送数据库结构到本地 SQLite**

Run: `pnpm run db:push`
Expected: 本地 `dev.db` 文件创建，表结构同步

- [ ] **Step 4: 提交 Prima Schema 更新**

```bash
git add prisma/schema.prisma src/generated/
git commit -m "feat: 更新 Prisma Schema 为家庭积分系统数据模型

- 添加 User、Family、Category、Task、Gift 等核心模型
- 添加 TaskCompletion、GiftRedemption 记录模型
- 添加 ExchangeDay 兑换日设置模型
- 添加 Role 和 RedemptionStatus 枚举
- 配置积分快照字段和软删除字段

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 2: 安装必要依赖

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 安装 UI 相关依赖**

Run: `pnpm add lucide-react clsx tailwind-merge class-variance-authority @radix-ui/react-dialog @radix-ui/react-slot`
Expected: 依赖安装成功

- [ ] **Step 2: 安装状态管理依赖**

Run: `pnpm add @tanstack/react-query`
Expected: React Query 安装成功

- [ ] **Step 3: 安装表单验证依赖**

Run: `pnpm add react-hook-form @hookform/resolvers zod`
Expected: React Hook Form 和 Zod 安装成功

- [ ] **Step 4: 安装日期处理依赖**

Run: `pnpm add dayjs`
Expected: Day.js 安装成功

- [ ] **Step 5: 安装 Toast 通知依赖**

Run: `pnpm add sonner`
Expected: Sonner 安装成功

- [ ] **Step 6: 安装密码加密依赖**

Run: `pnpm add bcryptjs && pnpm add -D @types/bcryptjs`
Expected: bcryptjs 及类型定义安装成功

- [ ] **Step 7: 提交依赖更新**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: 安装项目必要依赖

- UI: lucide-react, clsx, tailwind-merge, class-variance-authority, radix-ui
- 状态管理: @tanstack/react-query
- 表单验证: react-hook-form, @hookform/resolvers, zod
- 日期处理: dayjs
- Toast通知: sonner
- 密码加密: bcryptjs

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 3: 配置 Tailwind 主题

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

- [ ] **Step 1: 更新 Tailwind 配置，添加主题变量和动画**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        //孩子端主色
        child: {
          primary: "#FF6B35",
          primaryLight: "#FF8A50",
          secondary: "#4ECDC4",
          accent: "#FFD93D",
        },
        // 家长端主色
        parent: {
          primary: "#5B7FFF",
          primaryLight: "#7B9FFF",
          secondary: "#34D399",
        },
        // 功能色
        success: "#4ECDC4",
        warning: "#FFD93D",
        error: "#FF6B6B",
        info: "#60A5FA",
        // 中性色
        text: {
          primary: "#1F2937",
          secondary: "#6B7280",
          muted: "#9CA3AF",
        },
        border: "#E5E7EB",
        background: "#F9FAFB",
      },
      fontFamily: {
        sans: [
          "Smiley Sans Oblique",
          "PingFang SC",
          "Microsoft YaHei",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      fontSize: {
        xs: ["12px", { lineHeight: "1.4" }],
        sm: ["14px", { lineHeight: "1.4" }],
        base: ["16px", { lineHeight: "1.5" }],
        lg: ["18px", { lineHeight: "1.5" }],
        xl: ["24px", { lineHeight: "1.3" }],
        "2xl": ["32px", { lineHeight: "1.2" }],
        "5xl": ["56px", { lineHeight: "1.1" }],
      },
      spacing: {
        "nav": "56px",
      },
      borderRadius: {
        card: "16px",
        button: "12px",
        input: "12px",
      },
      boxShadow: {
        card: "0 4px 12px rgba(255, 107, 53, 0.15)",
        "card-parent": "0 2px 8px rgba(0, 0, 0, 0.08)",
        nav: "0 -4px 16px rgba(0, 0, 0, 0.08)",
      },
      animation: {
        "pop-in": "popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "toast-pop": "toastPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        "fade-in": "fadeIn 0.6s ease-out",
        "fade-up": "fadeUp 0.5s ease-out",
        "spin-slow": "rotate 20s linear infinite",
      },
      keyframes: {
        popIn: {
          "0%": { transform: "translate(-50%, -50%) scale(0.8)", opacity: "0" },
          "100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "1" },
        },
        toastPop: {
          "0%": { transform: "translate(-50%, -50%) scale(0)", opacity: "0" },
          "60%": { transform: "translate(-50%, -50%) scale(1.1)" },
          "100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        rotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: 更新全局样式，添加 CSS 变量和基础样式**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 得意黑字体加载 */
@import url('https://cdn.jsdelivr.net/npm/smiley-sans@1.1.1/dist/SmileySans-Oblique.min.css');

:root {
  /* 孩子端变量 */
  --child-primary: #FF6B35;
  --child-primary-light: #FF8A50;
  --child-secondary: #4ECDC4;
  --child-accent: #FFD93D;
  
  /* 家长端变量 */
  --parent-primary: #5B7FFF;
  --parent-primary-light: #7B9FFF;
  --parent-secondary: #34D399;
  
  /* 功能色 */
  --color-success: #4ECDC4;
  --color-warning: #FFD93D;
  --color-error: #FF6B6B;
  --color-info: #60A5FA;
  
  /* 文字 */
  --text-primary: #1F2937;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;
  
  /* 边框和背景 */
  --border-color: #E5E7EB;
  --bg-card: #FFFFFF;
  --bg-page: #F9FAFB;
  
  /* 导航高度 */
  --nav-height: 56px;
}

/* 孩子端主题 */
[data-role="child"] {
  --color-primary: var(--child-primary);
  --bg-gradient: linear-gradient(135deg, #FFF8F0 0%, #FFEDD8 50%, #FFFBE8 100%);
}

/* 家长端主题 */
[data-role="parent"] {
  --color-primary: var(--parent-primary);
  --bg-gradient: linear-gradient(135deg, #F0F4FF 0%, #E8F0FE 50%, #F5F7FF 100%);
}

/* 基础样式 */
body {
  font-family: 'Smiley Sans Oblique', 'PingFang SC', 'Microsoft YaHei', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--text-primary);
  background: var(--bg-page);
  min-height: 100vh;
}

/* 积分卡片渐变背景 */
.points-card-child {
  background: linear-gradient(135deg, #FF6B35 0%, #FF8A50 100%);
}

.points-card-parent {
  background: linear-gradient(135deg, #5B7FFF 0%, #7B9FFF 100%);
}

/* 礼物颜色池 */
.gift-color-1 { background: #FF6B35; }
.gift-color-2 { background: #4ECDC4; }
.gift-color-3 { background: #FFD93D; }
.gift-color-4 { background: #60A5FA; }
.gift-color-5 { background: #A78BFA; }
.gift-color-6 { background: #FB923C; }

/* 卡片悬停效果 */
.card-hover {
  transition: all 0.15s ease-out;
}

.card-hover:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 107, 53, 0.2);
}

/* 按钮点击效果 */
.btn-press:active {
  transform: scale(0.95);
}

/* 隐藏滚动条 */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  scrollbar-width: none;
}
```

- [ ] **Step 3: 提交 Tailwind 配置更新**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: 配置 Tailwind 主题和全局样式

- 添加孩子端/家长端主题颜色变量
- 添加功能色和中性色
- 配置得意黑字体
- 定义动画 keyframes（popIn, toastPop, fadeUp）
- 添加积分卡片渐变背景类
- 添加礼物颜色池类

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 4: 创建 shadcn/ui 配置和基础组件

**Files:**
- Create: `components.json`
- Create: `src/lib/cn.ts`
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/dialog.tsx`
- Create: `src/components/ui/input.tsx`
- Create: `src/components/ui/label.tsx`
- Create: `src/components/ui/toast.tsx`

- [ ] **Step 1: 创建 components.json 配置文件**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

- [ ] **Step 2: 创建 cn 工具函数**

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 3: 创建 Button 组件**

```typescript
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-button text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-child-primary text-white shadow-md hover:bg-child-primaryLight",
        parent: "bg-parent-primary text-white shadow-md hover:bg-parent-primaryLight",
        destructive: "bg-error text-white shadow-sm hover:bg-error/90",
        outline: "border border-border bg-background hover:bg-background/80",
        secondary: "bg-child-secondary text-white shadow-sm hover:bg-child-secondary/80",
        ghost: "hover:bg-background/80",
        link: "text-child-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-14 px-8",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
```

- [ ] **Step 4: 创建 Input 组件**

```typescript
import * as React from "react";
import { cn } from "@/lib/cn";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-input border border-border bg-background px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-base file:font-medium file:text-text-primary placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-child-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
```

- [ ] **Step 5: 创建 Label 组件**

```typescript
import * as React from "react";
import { cn } from "@/lib/cn";

const Label = React.forwardRef<HTMLLabelElement, React.ComponentPropsWithoutRef<"label">>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none text-text-primary peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
          className
        )}
        {...props}
      />
    );
  }
);
Label.displayName = "Label";

export { Label };
```

- [ ] **Step 6: 创建 Dialog 组件（基于 Radix UI）**

```typescript
"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-card",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-child-primary focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-5 w-5" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-text-secondary", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};
```

- [ ] **Step 7: 创建 Toast 组件（基于 Sonner）**

```typescript
"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      toastOptions={{
        style: {
          background: "var(--bg-card)",
          border: "1px solid var(--border-color)",
          borderRadius: "16px",
          padding: "16px 24px",
        },
      }}
    />
  );
}
```

- [ ] **Step 8: 提交 shadcn/ui 基础组件**

```bash
git add components.json src/lib/cn.ts src/components/ui/
git commit -m "feat: 创建 shadcn/ui 配置和基础组件

- 创建 components.json 配置文件
- 创建 cn 工具函数
- 创建 Button、Input、Label、Dialog、Toast 组件
- 配置孩子端/家长端按钮样式变体

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 5: 创建基础工具函数

**Files:**
- Create: `src/lib/db.ts`
- Create: `src/lib/date.ts`
- Create: `src/lib/constants.ts`
- Create: `src/lib/validators.ts`

- [ ] **Step 1: 创建 Prisma 客户端单例**

```typescript
import { PrismaClient } from "@/generated/prisma";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
```

- [ ] **Step 2: 创建北京时间处理工具函数**

```typescript
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const BEIJING_TZ = "Asia/Shanghai";

/**
 * 获取当前北京时间
 */
export function getBeijingNow(): dayjs.Dayjs {
  return dayjs().tz(BEIJING_TZ);
}

/**
 * 获取北京时间格式的日期字符串
 */
export function formatBeijingDate(date: Date | string): string {
  return dayjs(date).tz(BEIJING_TZ).format("YYYY-MM-DD");
}

/**
 * 获取北京时间格式的时间字符串
 */
export function formatBeijingTime(date: Date | string): string {
  return dayjs(date).tz(BEIJING_TZ).format("YYYY-MM-DD HH:mm");
}

/**
 * 获取北京时间的星期几（0=周日，1=周一...6=周六）
 */
export function getBeijingDayOfWeek(): number {
  return getBeijingNow().day();
}

/**
 * 判断当前北京时间是否为兑换日
 */
export function isExchangeDayNow(exchangeDays: number[]): boolean {
  const dayOfWeek = getBeijingDayOfWeek();
  return exchangeDays.includes(dayOfWeek);
}

/**
 * 获取本周起始时间（周一 00:00:00，北京时间）
 */
export function getWeekStart(): Date {
  const now = getBeijingNow();
  const dayOfWeek = now.day();
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  return now.subtract(daysToMonday, "day").startOf("day").toDate();
}

/**
 * 获取本周结束时间（周日 23:59:59，北京时间）
 */
export function getWeekEnd(): Date {
  const weekStart = getWeekStart();
  return dayjs(weekStart).add(6, "day").endOf("day").toDate();
}

/**
 * 获取下一个兑换日信息
 */
export function getNextExchangeDayInfo(exchangeDays: number[]): {
  dayOfWeek: number;
  daysUntil: number;
} | null {
  if (exchangeDays.length === 0) return null;

  const now = getBeijingNow();
  const currentDayOfWeek = now.day();

  // 找下一个兑换日
  for (let i = 1; i <= 7; i++) {
    const nextDay = (currentDayOfWeek + i) % 7;
    if (exchangeDays.includes(nextDay)) {
      return {
        dayOfWeek: nextDay,
        daysUntil: i,
      };
    }
  }

  return null;
}

/**
 * 计算距离兑换日结束的倒计时（秒）
 */
export function getSecondsUntilExchangeEnd(): number {
  const now = getBeijingNow();
  const endOfDay = now.endOf("day");
  return endOfDay.diff(now, "second");
}

/**
 * 计算距离下一个兑换日开始的时间（秒）
 */
export function getSecondsUntilNextExchange(exchangeDays: number[]): number {
  const nextInfo = getNextExchangeDayInfo(exchangeDays);
  if (!nextInfo) return 0;

  const now = getBeijingNow();
  const nextExchangeDay = now.add(nextInfo.daysUntil, "day").startOf("day");
  return nextExchangeDay.diff(now, "second");
}
```

- [ ] **Step 3: 创建常量定义文件**

```typescript
/**
 * 礼物颜色池
 */
export const GIFT_COLORS = [
  { name: "活力橙", value: "#FF6B35" },
  { name: "薄荷绿", value: "#4ECDC4" },
  { name: "奶黄", value: "#FFD93D" },
  { name: "天蓝", value: "#60A5FA" },
  { name: "紫罗兰", value: "#A78BFA" },
  { name: "蜜橙", value: "#FB923C" },
];

/**
 * 随机获取礼物颜色
 */
export function getRandomGiftColor(): string {
  const index = Math.floor(Math.random() * GIFT_COLORS.length);
  return GIFT_COLORS[index].value;
}

/**
 * 用户角色枚举值
 */
export const ROLES = {
  PARENT: "PARENT",
  CHILD: "CHILD",
} as const;

/**
 * 兑换状态枚举值
 */
export const REDEMPTION_STATUS = {
  PENDING: "PENDING",
  CONFIRMED: "CONFIRMED",
  CANCELLED: "CANCELLED",
} as const;

/**
 * 星期几映射
 */
export const DAY_OF_WEEK_MAP: Record<number, string> = {
  0: "周日",
  1: "周一",
  2: "周二",
  3: "周三",
  4: "周四",
  5: "周五",
  6: "周六",
};
```

- [ ] **Step 4: 创建 Zod验证 schemas**

```typescript
import { z } from "zod";

/**
 * 用户名验证：2-20字符，仅中文、英文、数字
 */
export const usernameSchema = z
  .string()
  .min(2, "用户名至少2个字符")
  .max(20, "用户名最多20个字符")
  .regex(/^[一-龥a-zA-Z0-9]+$/, "用户名只能包含中文、英文、数字");

/**
 * 密码验证：6-32位
 */
export const passwordSchema = z
  .string()
  .min(6, "密码至少6位")
  .max(32, "密码最多32位");

/**
 * 注册表单 Schema
 */
export const registerSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  confirmPassword: passwordSchema,
  role: z.enum(["PARENT", "CHILD"], {
    required_error: "请选择角色",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "两次密码不一致",
  path: ["confirmPassword"],
});

/**
 * 登录表单 Schema
 */
export const loginSchema = z.object({
  username: z.string().min(1, "请输入用户名"),
  password: z.string().min(1, "请输入密码"),
});

/**
 * 创建任务 Schema
 */
export const createTaskSchema = z.object({
  name: z.string().min(1, "请输入任务名称").max(50, "任务名称最多50字符"),
  points: z.number().int().min(1, "积分至少为1").max(100, "积分最多100"),
  description: z.string().max(200, "描述最多200字符").optional(),
  categoryId: z.string().min(1, "请选择类别"),
});

/**
 * 创建礼物 Schema
 */
export const createGiftSchema = z.object({
  name: z.string().min(1, "请输入礼物名称").max(50, "礼物名称最多50字符"),
  points: z.number().int().min(1, "积分至少为1").max(1000, "积分最多1000"),
  description: z.string().max(200, "描述最多200字符").optional(),
  weeklyLimit: z.number().int().min(1, "每周上限至少为1").max(10, "每周上限最多10").optional().nullable(),
});

/**
 * 创建类别 Schema
 */
export const createCategorySchema = z.object({
  name: z.string().min(1, "请输入类别名称").max(20, "类别名称最多20字符"),
});

/**
 * 兑换日设置 Schema
 */
export const exchangeDaysSchema = z.object({
  days: z.array(z.number().int().min(0).max(6)),
});

/**
 * 从 Schema 推断类型
 */
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type CreateGiftInput = z.infer<typeof createGiftSchema>;
export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type ExchangeDaysInput = z.infer<typeof exchangeDaysSchema>;
```

- [ ] **Step 5: 提交基础工具函数**

```bash
git add src/lib/db.ts src/lib/date.ts src/lib/constants.ts src/lib/validators.ts
git commit -m "feat: 创建基础工具函数

- Prisma 客户端单例（db.ts）
- 北京时间处理函数（date.ts）
- 常量定义（颜色池、角色枚举等）
- Zod验证 schemas（注册、登录、任务、礼物等）

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 6: 创建 Providers 和类型定义

**Files:**
- Create: `src/types/index.ts`
- Create: `src/providers/query-provider.tsx`
- Create: `src/providers/user-provider.tsx`
- Create: `src/hooks/use-user.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: 创建全局类型定义**

```typescript
import { Role, RedemptionStatus } from "@/generated/prisma";

/**
 * 用户信息类型（前端使用）
 */
export interface UserInfo {
  id: string;
  username: string;
  role: Role;
  familyId: string;
  timezoneOffset?: number | null;
  currentPoints?: number;
  totalPoints?: number;
}

/**
 * 任务类型（前端展示）
 */
export interface TaskItem {
  id: string;
  name: string;
  points: number;
  description?: string | null;
  categoryId: string;
  categoryName?: string;
  completed?: boolean;
  completedAt?: string | null;
}

/**
 * 礼物类型（前端展示）
 */
export interface GiftItem {
  id: string;
  name: string;
  points: number;
  description?: string | null;
  color?: string | null;
  weeklyLimit?: number | null;
  weeklyRedeemed?: number;
  canRedeem?: boolean;
}

/**
 * 完成记录类型
 */
export interface CompletionRecord {
  id: string;
  taskName: string;
  points: number;
  completedAt: string;
  revokedAt?: string | null;
}

/**
 * 兑换记录类型
 */
export interface RedemptionRecord {
  id: string;
  giftName: string;
  giftColor?: string | null;
  points: number;
  status: RedemptionStatus;
  redeemedAt: string;
  confirmedAt?: string | null;
}

/**
 * API 响应类型
 */
export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

/**
 * 积分概览类型
 */
export interface PointsOverview {
  current: number;
  total: number;
  weekly: number;
}

/**
 * 兑换日信息类型
 */
export interface ExchangeDaysInfo {
  days: number[];
  isExchangeDay: boolean;
  nextExchangeDay?: {
    dayOfWeek: number;
    daysUntil: number;
  } | null;
}
```

- [ ] **Step 2: 创建 React Query Provider**

```typescript
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1分钟
            refetchOnWindowFocus: true,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

- [ ] **Step 3: 创建用户 Context Provider**

```typescript
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { UserInfo } from "@/types";

interface UserContextType {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 页面加载时获取当前用户
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.data);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
```

- [ ] **Step 4: 创建 use-user hook（导出封装）**

```typescript
export { useUser } from "@/providers/user-provider";
```

- [ ] **Step 5: 更新根布局，集成 Providers**

```typescript
import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { UserProvider } from "@/providers/user-provider";
import { Toaster } from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "家庭积分兑换系统",
  description: "通过积分机制激励孩子完成日常任务",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <QueryProvider>
          <UserProvider>
            {children}
            <Toaster />
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 6: 提交 Providers 和类型定义**

```bash
git add src/types/index.ts src/providers/ src/hooks/use-user.ts src/app/layout.tsx
git commit -m "feat: 创建 Providers 和全局类型定义

- 创建全局类型定义（UserInfo, TaskItem, GiftItem等）
- 创建 React Query Provider
- 创建用户 Context Provider
- 创建 useUser hook
- 更新根布局集成所有 Providers

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 7: 创建目录结构（路由分组）

**Files:**
- Create: `src/app/(auth)/layout.tsx`
- Create: `src/app/(child)/layout.tsx`
- Create: `src/app/(parent)/layout.tsx`
- Create: `src/components/shared/BottomNav.tsx`

- [ ] **Step 1: 创建认证路由组布局**

```typescript
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {children}
    </div>
  );
}
```

- [ ] **Step 2: 创建孩子端路由组布局**

```typescript
"use client";

import BottomNav from "@/components/shared/BottomNav";

export default function ChildLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-cream-50 pb-[56px]" data-role="child">
      {children}
      <BottomNav role="child" />
    </div>
  );
}
```

- [ ] **Step 3: 创建家长端路由组布局**

```typescript
"use client";

import BottomNav from "@/components/shared/BottomNav";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-50 pb-[56px]" data-role="parent">
      {children}
      <BottomNav role="parent" />
    </div>
  );
}
```

- [ ] **Step 4: 创建共享底部导航组件**

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import {
  ListTodo,
  Gift,
  User,
  BarChart3,
  Settings,
} from "lucide-react";

interface BottomNavProps {
  role: "child" | "parent";
}

const childNavItems = [
  { href: "/child", label: "任务", icon: ListTodo },
  { href: "/child/gifts", label: "礼物", icon: Gift },
  { href: "/child/profile", label: "我的", icon: User },
];

const parentNavItems = [
  { href: "/parent", label: "统计", icon: BarChart3 },
  { href: "/parent/tasks", label: "任务", icon: ListTodo },
  { href: "/parent/gifts", label: "礼物", icon: Gift },
  { href: "/parent/settings", label: "设置", icon: Settings },
];

export default function BottomNav({ role }: BottomNavProps) {
  const pathname = usePathname();
  const navItems = role === "child" ? childNavItems : parentNavItems;
  const primaryColor = role === "child" ? "text-child-primary" : "text-parent-primary";

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[56px] bg-white border-t border-border shadow-nav z-50">
      <div className="flex justify-around items-center h-full">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 px-4 py-2 transition-colors",
                isActive ? primaryColor : "text-text-muted"
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
```

- [ ] **Step 5: 创建临时占位页面（确保路由可访问）**

创建孩子端首页:
```typescript
// src/app/(child)/page.tsx
export default function ChildPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">孩子端 - 任务页</h1>
      <p className="text-text-secondary">功能开发中...</p>
    </div>
  );
}
```

创建家长端首页:
```typescript
// src/app/(parent)/page.tsx
export default function ParentPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">家长端 - 统计页</h1>
      <p className="text-text-secondary">功能开发中...</p>
    </div>
  );
}
```

创建登录页占位:
```typescript
// src/app/(auth)/login/page.tsx
export default function LoginPage() {
  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">登录</h1>
      <p className="text-text-secondary">功能开发中...</p>
    </div>
  );
}
```

- [ ] **Step 6: 提交路由结构和底部导航**

```bash
git add src/app/\(auth\)/ src/app/\(child\)/ src/app/\(parent\)/ src/components/shared/
git commit -m "feat: 创建路由分组结构和底部导航组件

- 创建认证路由组布局
- 创建孩子端路由组布局
- 创建家长端路由组布局
- 创建共享底部导航组件
- 创建临时占位页面

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 8: 验证基础设施

**Files:**
- 无新增文件，验证现有配置

- [ ] **Step 1: 验证 Prisma 客户端可正常使用**

Run: `pnpm run db:generate`
Expected: Prisma 客户端成功生成

- [ ] **Step 2: 验证开发服务器可启动**

Run: `pnpm run dev`
Expected: Next.js 开发服务器在 http://localhost:3000 启动成功

- [ ] **Step 3: 验证页面可访问**

手动访问:
- http://localhost:3000 (根页面)
- http://localhost:3000/child (孩子端)
- http://localhost:3000/parent (家长端)
- http://localhost:3000/login (登录页)

Expected: 所有页面正常显示，底部导航正确渲染

- [ ] **Step 4: 停止开发服务器并提交最终状态**

停止服务器后:
```bash
git status
```

如果有未提交的更改，提交它们:
```bash
git add -A && git commit -m "chore: 基础设施验证完成
Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Self-Review

**1. Spec coverage:**
- Prisma Schema: ✓ Task 1
- 依赖安装: ✓ Task 2
- Tailwind 主题: ✓ Task 3
- shadcn/ui 组件: ✓ Task 4
- 工具函数: ✓ Task 5
- Providers: ✓ Task 6
- 目录结构: ✓ Task 7
- 验证: ✓ Task 8

**2. Placeholder scan:**
- 无 TBD/TODO
- 所有代码块完整
- 无 "类似 Task N" 描述

**3. Type consistency:**
- UserInfo 类型在 types/index.ts 定义，providers/user-provider.tsx 使用一致
- Role 枚举从 Prisma 导入，类型定义中正确引用
- ApiResponse 类型定义完整

---

**计划完成。** Phase 1 基础设施搭建完成后，项目将具备：
- 完整的数据模型
- 基础 UI 组件库
- 主题和样式系统
- 状态管理框架
- 路由结构
- 工具函数和验证

后续 Phase 2-5 将在此基础上构建具体功能模块。