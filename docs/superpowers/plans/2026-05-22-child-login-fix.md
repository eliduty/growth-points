# 孩子端登录页和退出逻辑修复 实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复孩子端登录页显示底部导航栏和退出跳转地址错误的问题

**Architecture:** 利用 Next.js App Router 嵌套 layout 特性，为登录页创建独立 layout 覆盖父级 BottomNav；修改退出跳转地址为对应端登录页

**Tech Stack:** Next.js App Router, React, TypeScript

---

## 文件结构

**新增文件：**
- `src/app/child/login/layout.tsx` — 孩子端登录页布局（无 BottomNav）
- `src/app/parent/login/layout.tsx` — 家长端登录页布局（无 BottomNav）

**修改文件：**
- `src/app/child/profile/page.tsx:34` — 退出跳转改为 `/child/login`
- `src/hooks/use-auth.ts:125` — 根据角色跳转到对应登录页

---

### Task 1: 创建孩子端登录页布局

**Files:**
- Create: `src/app/child/login/layout.tsx`

- [ ] **Step 1: 创建 layout 文件**

```tsx
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

- [ ] **Step 2: 验证文件已创建**

检查文件是否存在：`src/app/child/login/layout.tsx`

- [ ] **Step 3: 提交**

```bash
git add src/app/child/login/layout.tsx
git commit -m "fix(child): 登录页不显示底部导航栏

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 2: 创建家长端登录页布局

**Files:**
- Create: `src/app/parent/login/layout.tsx`

- [ ] **Step 1: 创建 layout 文件**

```tsx
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

- [ ] **Step 2: 验证文件已创建**

检查文件是否存在：`src/app/parent/login/layout.tsx`

- [ ] **Step 3: 提交**

```bash
git add src/app/parent/login/layout.tsx
git commit -m "fix(parent): 登录页不显示底部导航栏

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 3: 修复孩子端退出跳转地址

**Files:**
- Modify: `src/app/child/profile/page.tsx:34`

- [ ] **Step 1: 读取文件确认当前代码**

读取 `src/app/child/profile/page.tsx`，确认第 34 行为 `router.push("/login");`

- [ ] **Step 2: 修改退出跳转地址**

将第 34 行从：
```tsx
router.push("/login");
```
改为：
```tsx
router.push("/child/login");
```

- [ ] **Step 3: 提交**

```bash
git add src/app/child/profile/page.tsx
git commit -m "fix(child): 退出跳转到孩子端登录页

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 4: 修复 use-auth hook 退出跳转地址

**Files:**
- Modify: `src/hooks/use-auth.ts:125`

- [ ] **Step 1: 读取文件确认当前代码**

读取 `src/hooks/use-auth.ts`，确认第 125 行为 `router.push("/login");`

- [ ] **Step 2: 修改退出跳转逻辑**

将 logout 函数中的跳转逻辑从：
```tsx
router.push("/login");
```
改为：
```tsx
// 根据角色跳转到对应登录页
if (user?.role === "PARENT") {
  router.push("/parent/login");
} else {
  router.push("/child/login");
}
```

- [ ] **Step 3: 提交**

```bash
git add src/hooks/use-auth.ts
git commit -m "fix(auth): 退出时根据角色跳转到对应登录页

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

---

### Task 5: 手动验证

- [ ] **Step 1: 启动开发服务器**

```bash
pnpm dev
```

- [ ] **Step 2: 验证孩子端登录页**

访问 `/child/login`，确认：
- 页面底部无 tab 导航栏
- 页面正常显示登录表单

- [ ] **Step 3: 验证家长端登录页**

访问 `/parent/login`，确认：
- 页面底部无 tab 导航栏
- 页面正常显示登录/注册表单

- [ ] **Step 4: 验证退出功能**

登录孩子端，点击"退出登录"，确认跳转到 `/child/login`

---

**文档版本：** v1.0
**创建日期：** 2026-05-22