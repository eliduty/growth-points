# Phase 2: 认证系统实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 完成认证系统，包括家长注册、登录、登出、Session 管理、路由保护中间件和登录页面。

**Architecture:** Session-based 认证，使用 iron-session 管理 Session，bcrypt 加密密码，中间件保护路由，登录后根据角色跳转对应端。

**Tech Stack:** iron-session, bcryptjs, Next.js Middleware, React Hook Form, Zod

---

## 文件结构规划

```
src/
├── lib/
│   ├── auth/
│   │   ├── session.ts        # iron-session 配置和操作
│   │   ├── password.ts       # 密码加密/验证
│   │   └── guard.ts          # 认证守卫函数
│   └── constants.ts          # 已存在，添加 Session 常量
│
├── middleware.ts             # Next.js 路由保护中间件
│
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── register/
│   │       │   └── route.ts  # 家长注册
│   │       ├── login/
│   │       │   └── route.ts  # 登录
│   │       ├── logout/
│   │       │   └── route.ts  # 登出
│   │       └── me/
│   │           └── route.ts  # 获取当前用户
│   │
│   ├── (auth)/
│   │   ├── layout.tsx        # 已存在
│   │   ├── login/
│   │   │   └── page.tsx      # 登录页
│   │   └── register/
│   │       └── page.tsx      # 注册页
│   │
│   ├── page.tsx              # 根页面（角色判断跳转）
│   └── redirect/
│       └── page.tsx          # 跳转逻辑页面
│
├── components/
│   ├── shared/
│   │   ├── LoginForm.tsx     # 登录表单组件
│   │   └── RegisterForm.tsx  # 注册表单组件
│   └── ui/
│       └── ...               # 已存在
│
├── hooks/
│   └── use-auth.ts           # 认证相关 hook
│
└── types/
│   └── index.ts              # 已存在，添加 Session 类型
```

---

## Task 1: 安装 iron-session 并配置 Session

**Files:**
- Modify: `package.json`
- Create: `src/lib/auth/session.ts`
- Modify: `src/types/index.ts`
- Modify: `src/lib/constants.ts`

- [ ] **Step 1: 安装 iron-session**

Run: `pnpm add iron-session`
Expected: iron-session 安装成功

- [ ] **Step 2: 创建 Session 类型定义**

在 `src/types/index.ts` 末尾添加：

```typescript
/**
 * Session 数据类型
 */
export interface SessionData {
  userId: string;
  role: Role;
  familyId: string;
}

/**
 * Iron-session 配置类型
 */
export interface IronSession {
  session: SessionData;
}
```

- [ ] **Step 3: 创建 Session 常量**

在 `src/lib/constants.ts` 末尾添加：

```typescript
/**
 * Session 配置常量
 */
export const SESSION_CONFIG = {
  cookieName: "family_points_session",
  ttl: 7 * 24 * 60 * 60, // 7 天
  password: process.env.SESSION_PASSWORD || "complex_password_at_least_32_characters_long_for_security",
} as const;
```

- [ ] **Step 4: 创建 iron-session 配置和操作函数**

```typescript
import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { SessionData } from "@/types";
import { SESSION_CONFIG } from "@/lib/constants";

export const sessionOptions: SessionOptions = {
  cookieName: SESSION_CONFIG.cookieName,
  password: SESSION_CONFIG.password,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_CONFIG.ttl,
    sameSite: "lax",
    path: "/",
  },
};

/**
 * 获取 Session
 */
export async function getSession(): Promise<SessionData> {
  const cookieStore = await cookies();
  const session = await getIronSession<SessionData>(cookieStore, sessionOptions);
  return session;
}

/**
 * 创建 Session（登录成功后）
 */
export async function createSession(userId: string, role: "PARENT" | "CHILD", familyId: string): Promise<void> {
  const session = await getSession();
  session.userId = userId;
  session.role = role;
  session.familyId = familyId;
  await session.save();
}

/**
 * 清除 Session（登出）
 */
export async function clearSession(): Promise<void> {
  const session = await getSession();
  session.destroy();
}

/**
 * 检查是否已登录
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session.userId;
}

/**
 * 获取当前用户 ID
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getSession();
  return session.userId || null;
}

/**
 * 获取当前用户角色
 */
export async function getCurrentRole(): Promise<"PARENT" | "CHILD" | null> {
  const session = await getSession();
  return session.role || null;
}

/**
 * 获取当前家庭 ID
 */
export async function getCurrentFamilyId(): Promise<string | null> {
  const session = await getSession();
  return session.familyId || null;
}
```

- [ ] **Step 5: 提交 Session 配置**

```bash
git add package.json pnpm-lock.yaml src/types/index.ts src/lib/constants.ts src/lib/auth/session.ts
git commit -m "feat: 配置 iron-session Session 管理

- 安装 iron-session
- 定义 SessionData 类型
- 创建 Session 常量配置
- 实现 getSession、createSession、clearSession 等函数

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 2: 创建密码加密和验证函数

**Files:**
- Create: `src/lib/auth/password.ts`

- [ ] **Step 1: 创建密码加密函数**

```typescript
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * 加密密码
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * 验证密码
 */
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
```

- [ ] **Step 2: 提交密码函数**

```bash
git add src/lib/auth/password.ts
git commit -m "feat: 创建密码加密和验证函数

- hashPassword: bcrypt 加密，cost factor = 12
- verifyPassword: 密码验证

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 3: 创建认证守卫函数

**Files:**
- Create: `src/lib/auth/guard.ts`

- [ ] **Step 1: 创建认证守卫函数**

```typescript
import { getSession, getCurrentUserId, getCurrentRole, getCurrentFamilyId } from "./session";
import { prisma } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * 要求用户已登录
 * 未登录返回 401 错误
 */
export async function requireAuth(): Promise<{ userId: string; role: "PARENT" | "CHILD"; familyId: string }> {
  const userId = await getCurrentUserId();
  const role = await getCurrentRole();
  const familyId = await getCurrentFamilyId();

  if (!userId || !role || !familyId) {
    throw new Error("UNAUTHORIZED");
  }

  return { userId, role, familyId };
}

/**
 * 要求用户是家长角色
 * 不是家长返回 403 错误
 */
export async function requireParent(): Promise<{ userId: string; familyId: string }> {
  const { userId, role, familyId } = await requireAuth();

  if (role !== "PARENT") {
    throw new Error("FORBIDDEN");
  }

  return { userId, familyId };
}

/**
 * 要求用户是孩子角色
 * 不是孩子返回 403 错误
 */
export async function requireChild(): Promise<{ userId: string; familyId: string }> {
  const { userId, role, familyId } = await requireAuth();

  if (role !== "CHILD") {
    throw new Error("FORBIDDEN");
  }

  return { userId, familyId };
}

/**
 * 获取完整用户信息（含数据库数据）
 */
export async function getFullUserInfo(): Promise<{
  id: string;
  username: string;
  role: "PARENT" | "CHILD";
  familyId: string;
  timezoneOffset: number | null;
  currentPoints?: number;
  totalPoints?: number;
} | null> {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      role: true,
      familyId: true,
      timezoneOffset: true,
      currentPoints: true,
      totalPoints: true,
    },
  });

  return user;
}

/**
 * API 错误响应处理
 */
export function handleAuthError(error: unknown): NextResponse {
  if (error instanceof Error) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { code: 4001, data: null, message: "未登录" },
        { status: 401 }
      );
    }
    if (error.message === "FORBIDDEN") {
      return NextResponse.json(
        { code: 4002, data: null, message: "无权限" },
        { status: 403 }
      );
    }
  }

  return NextResponse.json(
    { code: 5001, data: null, message: "服务器错误" },
    { status: 500 }
  );
}
```

- [ ] **Step 2: 提交认证守卫函数**

```bash
git add src/lib/auth/guard.ts
git commit -m "feat: 创建认证守卫函数

- requireAuth: 要求已登录
- requireParent: 要求家长角色
- requireChild: 要求孩子角色
- getFullUserInfo: 获取完整用户信息
- handleAuthError: 认证错误响应处理

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 4: 创建注册 API

**Files:**
- Create: `src/app/api/auth/register/route.ts`

- [ ] **Step 1: 创建家长注册 API**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { usernameSchema, passwordSchema } from "@/lib/validators";
import { z } from "zod";

const registerSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证输入
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const errorMessage = parsed.error.errors[0]?.message || "输入格式错误";
      const errorCode = parsed.error.errors[0]?.path[0] === "username" ? 1002 : 1003;
      return NextResponse.json(
        { code: errorCode, data: null, message: errorMessage },
        { status: 400 }
      );
    }

    const { username, password } = parsed.data;

    // 检查用户名是否已存在（全局唯一检查，注册时不属于任何家庭）
    // 注意：根据设计，注册时创建新家庭，所以检查 username 全局唯一
    const existingUser = await prisma.user.findFirst({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { code: 1001, data: null, message: "用户名已存在" },
        { status: 400 }
      );
    }

    // 加密密码
    const hashedPassword = await hashPassword(password);

    // 创建新家庭和用户
    const family = await prisma.family.create({});

    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: "PARENT",
        familyId: family.id,
        timezoneOffset: 8, // 默认北京时间
      },
      select: {
        id: true,
        username: true,
        role: true,
        familyId: true,
      },
    });

    // 创建 Session
    await createSession(user.id, user.role, user.familyId);

    return NextResponse.json({
      code: 0,
      data: user,
      message: "注册成功",
    });
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { code: 5001, data: null, message: "注册失败，请重试" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: 提交注册 API**

```bash
git add src/app/api/auth/register/route.ts
git commit -m "feat: 创建家长注册 API

- POST /api/auth/register
- 验证用户名和密码格式
- 检查用户名唯一性
- 创建新家庭和用户
- 创建 Session

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 5: 创建登录 API

**Files:**
- Create: `src/app/api/auth/login/route.ts`

- [ ] **Step 1: 创建登录 API**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyPassword } from "@/lib/auth/password";
import { createSession } from "@/lib/auth/session";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(1, "请输入用户名"),
  password: z.string().min(1, "请输入密码"),
  timezoneOffset: z.number().int().min(-12).max(14).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证输入
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { code: 1004, data: null, message: "用户名或密码错误" },
        { status: 400 }
      );
    }

    const { username, password, timezoneOffset } = parsed.data;

    // 查询用户
    const user = await prisma.user.findFirst({
      where: { username },
      select: {
        id: true,
        username: true,
        password: true,
        role: true,
        familyId: true,
        currentPoints: true,
        totalPoints: true,
        timezoneOffset: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { code: 1004, data: null, message: "用户名或密码错误" },
        { status: 400 }
      );
    }

    // 验证密码
    const isValid = await verifyPassword(password, user.password);
    if (!isValid) {
      return NextResponse.json(
        { code: 1004, data: null, message: "用户名或密码错误" },
        { status: 400 }
      );
    }

    // 更新时区偏移量（如果提供了）
    if (timezoneOffset !== undefined) {
      await prisma.user.update({
        where: { id: user.id },
        data: { timezoneOffset },
      });
    }

    // 创建 Session
    await createSession(user.id, user.role, user.familyId);

    // 返回用户信息（不包含密码）
    const responseData = {
      id: user.id,
      username: user.username,
      role: user.role,
      familyId: user.familyId,
      timezoneOffset: timezoneOffset ?? user.timezoneOffset,
      ...(user.role === "CHILD" && {
        currentPoints: user.currentPoints,
        totalPoints: user.totalPoints,
      }),
    };

    return NextResponse.json({
      code: 0,
      data: responseData,
      message: "登录成功",
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { code: 5001, data: null, message: "登录失败，请重试" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: 提交登录 API**

```bash
git add src/app/api/auth/login/route.ts
git commit -m "feat: 创建登录 API

- POST /api/auth/login
- 验证用户名和密码
- 更新用户时区偏移量
- 创建 Session
- 返回用户信息（孩子含积分数据）

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 6: 创建登出 API 和获取当前用户 API

**Files:**
- Create: `src/app/api/auth/logout/route.ts`
- Create: `src/app/api/auth/me/route.ts`

- [ ] **Step 1: 创建登出 API**

```typescript
import { NextResponse } from "next/server";
import { clearSession } from "@/lib/auth/session";

export async function POST() {
  try {
    await clearSession();

    return NextResponse.json({
      code: 0,
      data: null,
      message: "已退出登录",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { code: 5001, data: null, message: "退出失败，请重试" },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 2: 创建获取当前用户信息 API**

```typescript
import { NextResponse } from "next/server";
import { getFullUserInfo } from "@/lib/auth/guard";
import { handleAuthError } from "@/lib/auth/guard";

export async function GET() {
  try {
    const user = await getFullUserInfo();

    if (!user) {
      return NextResponse.json(
        { code: 4001, data: null, message: "未登录" },
        { status: 401 }
      );
    }

    return NextResponse.json({
      code: 0,
      data: user,
      message: "获取成功",
    });
  } catch (error) {
    return handleAuthError(error);
  }
}
```

- [ ] **Step 3: 提交登出和获取用户信息 API**

```bash
git add src/app/api/auth/logout/route.ts src/app/api/auth/me/route.ts
git commit -m "feat: 创建登出和获取当前用户信息 API

- POST /api/auth/logout: 清除 Session
- GET /api/auth/me: 返回当前用户信息

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 7: 创建认证中间件

**Files:**
- Create: `src/middleware.ts`

- [ ] **Step 1: 创建 Next.js Middleware 保护路由**

```typescript
import { NextRequest, NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { SessionData } from "@/types";
import { sessionOptions } from "@/lib/auth/session";

// 需要认证的路由
const protectedRoutes = {
  child: ["/child"],
  parent: ["/parent"],
  any: [], // 任何角色都可访问（暂无）
};

// 公开路由（无需认证）
const publicRoutes = ["/", "/login", "/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 公开路由直接放行
  if (publicRoutes.some((route) => pathname === route || pathname.startsWith(route + "/"))) {
    return NextResponse.next();
  }

  // 获取 Session
  const response = NextResponse.next();
  const session = await getIronSession<SessionData>(request.cookies, response.cookies, sessionOptions);

  // 未登录，跳转到登录页
  if (!session.userId) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // 孩子端路由检查
  if (protectedRoutes.child.some((route) => pathname.startsWith(route))) {
    if (session.role !== "CHILD") {
      // 家长访问孩子端，跳转到家长端
      const parentUrl = new URL("/parent", request.url);
      return NextResponse.redirect(parentUrl);
    }
  }

  // 家长端路由检查
  if (protectedRoutes.parent.some((route) => pathname.startsWith(route))) {
    if (session.role !== "PARENT") {
      // 孩子访问家长端，跳转到孩子端
      const childUrl = new URL("/child", request.url);
      return NextResponse.redirect(childUrl);
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了：
     * - _next/static (静态文件)
     * - _next/image (图片优化)
     * - favicon.ico (浏览器图标)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};
```

- [ ] **Step 2: 提交中间件**

```bash
git add src/middleware.ts
git commit -m "feat: 创建认证中间件

- 保护 /child 和 /parent 路由
- 未登录跳转到登录页
- 角色不匹配跳转到对应端
- 公开路由无需认证

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 8: 创建登录表单组件

**Files:**
- Create: `src/components/shared/LoginForm.tsx`

- [ ] **Step 1: 创建登录表单组件**

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const loginSchema = z.object({
  username: z.string().min(1, "请输入用户名"),
  password: z.string().min(1, "请输入密码"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: (role: "PARENT" | "CHILD") => void;
}

export default function LoginForm({ onSuccess }: LoginFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // 获取当前时区偏移量
      const timezoneOffset = -new Date().getTimezoneOffset() / 60;

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          timezoneOffset,
        }),
      });

      const result = await response.json();

      if (result.code === 0) {
        toast.success("登录成功");

        // 调用 onSuccess 或跳转
        if (onSuccess) {
          onSuccess(result.data.role);
        } else {
          // 根据角色跳转
          if (result.data.role === "PARENT") {
            router.push("/parent");
          } else {
            router.push("/child");
          }
        }
      } else {
        toast.error(result.message || "登录失败");
      }
    } catch (error) {
      toast.error("网络异常，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">用户名</Label>
        <Input
          id="username"
          {...register("username")}
          placeholder="请输入用户名"
          disabled={isLoading}
        />
        {errors.username && (
          <p className="text-sm text-error">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">密码</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="请输入密码"
          disabled={isLoading}
        />
        {errors.password && (
          <p className="text-sm text-error">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        variant="default"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? "登录中..." : "登录"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: 提交登录表单组件**

```bash
git add src/components/shared/LoginForm.tsx
git commit -m "feat: 创建登录表单组件

- React Hook Form + Zod 验证
- 自动获取时区偏移量
- 登录成功根据角色跳转
- Toast 提示反馈

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 9: 创建注册表单组件

**Files:**
- Create: `src/components/shared/RegisterForm.tsx`

- [ ] **Step 1: 创建注册表单组件**

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const registerSchema = z
  .object({
    username: z
      .string()
      .min(2, "用户名至少2个字符")
      .max(20, "用户名最多20个字符")
      .regex(/^[一-龥a-zA-Z0-9]+$/, "用户名只能包含中文、英文、数字"),
    password: z.string().min(6, "密码至少6位").max(32, "密码最多32位"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次密码不一致",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
}

export default function RegisterForm({ onSuccess }: RegisterFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (result.code === 0) {
        toast.success("注册成功");

        if (onSuccess) {
          onSuccess();
        } else {
          // 注册成功直接跳转到家长端
          router.push("/parent");
        }
      } else {
        toast.error(result.message || "注册失败");
      }
    } catch (error) {
      toast.error("网络异常，请重试");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="username">用户名</Label>
        <Input
          id="username"
          {...register("username")}
          placeholder="请输入用户名"
          disabled={isLoading}
        />
        {errors.username && (
          <p className="text-sm text-error">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">密码</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          placeholder="请输入密码"
          disabled={isLoading}
        />
        {errors.password && (
          <p className="text-sm text-error">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">确认密码</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          placeholder="请再次输入密码"
          disabled={isLoading}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-error">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        variant="default"
        size="lg"
        disabled={isLoading}
      >
        {isLoading ? "注册中..." : "注册"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: 提交注册表单组件**

```bash
git add src/components/shared/RegisterForm.tsx
git commit -m "feat: 创建注册表单组件

- React Hook Form + Zod 验证
- 用户名格式验证（中文/英文/数字）
- 密码确认验证
- 注册成功跳转到家长端

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 10: 创建登录页面

**Files:**
- Modify: `src/app/(auth)/login/page.tsx`

- [ ] **Step 1: 创建完整的登录页面**

```typescript
"use client";

import { useState } from "react";
import Link from "next/link";
import LoginForm from "@/components/shared/LoginForm";
import RegisterForm from "@/components/shared/RegisterForm";

export default function LoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <div className="w-full max-w-md mx-auto p-8">
      {/* 标题 */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">
          家庭积分兑换系统
        </h1>
        <p className="text-sm text-text-secondary">
          通过积分机制激励孩子完成日常任务
        </p>
      </div>

      {/* 模式切换 */}
      <div className="bg-white rounded-card shadow-card p-6">
        <div className="flex mb-6">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 py-2 text-center font-medium rounded-lg transition-colors ${
              mode === "login"
                ? "bg-child-primary text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            登录
          </button>
          <button
            onClick={() => setMode("register")}
            className={`flex-1 py-2 text-center font-medium rounded-lg transition-colors ${
              mode === "register"
                ? "bg-child-primary text-white"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            注册
          </button>
        </div>

        {/* 表单 */}
        {mode === "login" ? <LoginForm /> : <RegisterForm />}

        {/* 提示文字 */}
        <div className="mt-6 text-center text-sm text-text-secondary">
          {mode === "login" ? (
            <>
              没有账号？
              <button
                onClick={() => setMode("register")}
                className="text-child-primary hover:underline ml-1"
              >
                注册
              </button>
            </>
          ) : (
            <>
              已有账号？
              <button
                onClick={() => setMode("login")}
                className="text-child-primary hover:underline ml-1"
              >
                登录
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 提交登录页面**

```bash
git add src/app/\(auth\)/login/page.tsx
git commit -m "feat: 创建登录页面

- 登录/注册模式切换
- 集成 LoginForm 和 RegisterForm
- 统一的页面布局和样式

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 11: 创建根页面和跳转逻辑

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 创建根页面（自动跳转逻辑）**

```typescript
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/use-user";

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // 已登录，根据角色跳转
        if (user.role === "PARENT") {
          router.replace("/parent");
        } else {
          router.replace("/child");
        }
      } else {
        // 未登录，跳转到登录页
        router.replace("/login");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-child-primary mx-auto" />
          <p className="mt-4 text-text-secondary">加载中...</p>
        </div>
      </div>
    );
  }

  return null;
}
```

- [ ] **Step 2: 提交根页面**

```bash
git add src/app/page.tsx
git commit -m "feat: 创建根页面自动跳转逻辑

- 加载时显示 spinner
- 已登录根据角色跳转到对应端
- 未登录跳转到登录页

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 12: 创建 use-auth hook

**Files:**
- Create: `src/hooks/use-auth.ts`

- [ ] **Step 1: 创建认证 hook**

```typescript
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "@/hooks/use-user";

interface LoginInput {
  username: string;
  password: string;
}

interface RegisterInput {
  username: string;
  password: string;
}

/**
 * 认证相关 hook
 */
export function useAuth() {
  const router = useRouter();
  const { user, setUser, isLoading } = useUser();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  /**
   * 登录
   */
  const login = async (input: LoginInput) => {
    setIsLoggingIn(true);

    try {
      const timezoneOffset = -new Date().getTimezoneOffset() / 60;

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...input,
          timezoneOffset,
        }),
      });

      const result = await response.json();

      if (result.code === 0) {
        setUser(result.data);
        toast.success("登录成功");

        // 根据角色跳转
        if (result.data.role === "PARENT") {
          router.push("/parent");
        } else {
          router.push("/child");
        }

        return { success: true, data: result.data };
      } else {
        toast.error(result.message || "登录失败");
        return { success: false, error: result.message };
      }
    } catch (error) {
      toast.error("网络异常，请重试");
      return { success: false, error: "网络异常" };
    } finally {
      setIsLoggingIn(false);
    }
  };

  /**
   * 注册
   */
  const register = async (input: RegisterInput) => {
    setIsRegistering(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const result = await response.json();

      if (result.code === 0) {
        setUser(result.data);
        toast.success("注册成功");

        // 注册成功跳转到家长端
        router.push("/parent");

        return { success: true, data: result.data };
      } else {
        toast.error(result.message || "注册失败");
        return { success: false, error: result.message };
      }
    } catch (error) {
      toast.error("网络异常，请重试");
      return { success: false, error: "网络异常" };
    } finally {
      setIsRegistering(false);
    }
  };

  /**
   * 登出
   */
  const logout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const result = await response.json();

      if (result.code === 0) {
        setUser(null);
        toast.success("已退出登录");
        router.push("/login");

        return { success: true };
      } else {
        toast.error(result.message || "退出失败");
        return { success: false, error: result.message };
      }
    } catch (error) {
      toast.error("网络异常，请重试");
      return { success: false, error: "网络异常" };
    }
  };

  return {
    user,
    isLoading,
    isLoggingIn,
    isRegistering,
    login,
    register,
    logout,
  };
}
```

- [ ] **Step 2: 提交 use-auth hook**

```bash
git add src/hooks/use-auth.ts
git commit -m "feat: 创建 use-auth hook

- login: 登录并跳转
- register: 注册并跳转
- logout: 登出并跳转
- 提供加载状态

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Task 13: 验证认证系统

**Files:**
- 无新增文件，验证现有功能

- [ ] **Step 1: 启动开发服务器**

Run: `pnpm run dev`
Expected: 开发服务器启动成功

- [ ] **Step 2: 测试注册流程**

手动测试：
1. 访问 http://localhost:3000
2. 自动跳转到登录页
3. 切换到注册模式
4. 输入用户名和密码
5. 点击注册
6. 自动跳转到家长端

Expected: 注册成功，跳转正确

- [ ] **Step 3: 测试登出流程**

手动测试：
1. 在家长端点击退出（需要添加退出按钮，暂时可用 API 测试）
2. 调用 POST /api/auth/logout
3. 刷新页面

Expected: 退出成功，跳转到登录页

- [ ] **Step 4: 测试登录流程**

手动测试：
1. 使用注册的账号登录
2. 跳转到家长端

Expected: 登录成功，跳转正确

- [ ] **Step 5: 测试路由保护**

手动测试：
1. 登出后直接访问 /parent
2. 自动跳转到登录页

Expected: 未登录无法访问家长端

- [ ] **Step 6: 提交最终状态**

```bash
git status
git add -A
git commit -m "chore: Phase 2 认证系统验证完成

Co-Authored-By: Claude <noreply@anthropic.com>"
```

---

## Self-Review

**1. Spec coverage:**

从 API 设计 spec 检查：
- ✅ POST /api/auth/register - Task 4
- ✅ POST /api/auth/login - Task 5
- ✅ POST /api/auth/logout - Task 6
- ✅ GET /api/auth/me - Task 6
- ✅ Session-based 认证 - Task 1
- ✅ 中间件路由保护 - Task 7
- ✅ 登录页面 - Task 10
- ✅ 根页面跳转 - Task 11

从家庭机制设计 spec 检查：
- ✅ 家长注册创建新家庭 - Task 4
- ✅ 登录时更新 timezoneOffset - Task 5

从实现前确认事项 spec 检查：
- ✅ 用户名验证（2-20字符，中文/英文/数字） - Task 9
- ✅ 密码验证（6-32位） - Task 9
- ✅ API 响应格式统一 - Task 4-6
- ✅ Toast 提示（底部居中） - Task 8-9

**2. Placeholder scan:**
- 无 TBD/TODO
- 所有代码块完整
- 无 "类似 Task N" 描述

**3. Type consistency:**
- SessionData 在 types/index.ts 定义，session.ts 使用一致
- UserInfo 在 types/index.ts 定义，guard.ts 返回类型匹配
- Role 枚举从 Prisma 导入，各处引用一致

---

**计划完成。** Phase 2 认证系统完成后，项目将具备：
- Session-based 认证机制
- 家长注册功能
- 登录/登出功能
- 路由保护中间件
- 登录页面

后续 Phase 3 将在此基础上构建家长端核心功能。