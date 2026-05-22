# 孩子端登录页和退出逻辑修复

## 1. 问题描述

| 问题 | 现状 | 原因 |
|------|------|------|
| 登录页显示底部导航栏 | `/child/login` 页面下方有 tab | `child/layout.tsx` 给所有 `/child/*` 页面添加 `BottomNav`，没有排除登录页 |
| 退出跳转地址不对 | 退出后跳转到 `/login` | `child/profile/page.tsx` 的 `handleLogout` 写的是 `router.push("/login")`，但 `/login` 已不存在 |

---

## 2. 修复方案

### 2.1 登录页底部导航栏

利用 Next.js App Router 的嵌套 layout 特性，在 `/child/login/` 目录下创建独立 `layout.tsx`，只返回 `{children}`，不包含 `BottomNav`。

**原理：** 子目录的 layout 会嵌套在父 layout 之上。如果子 layout 不渲染父 layout 的某些元素（如 BottomNav），这些元素就不会出现在该路由中。

### 2.2 退出跳转地址

将退出后的跳转地址从 `/login` 改为 `/child/login`。

---

## 3. 文件变更

### 3.1 新增文件

**`src/app/child/login/layout.tsx`**

```tsx
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

### 3.2 修改文件

**`src/app/child/profile/page.tsx`**

第 34 行：
```diff
- router.push("/login");
+ router.push("/child/login");
```

### 3.3 家长端同步处理

**新增文件：** `src/app/parent/login/layout.tsx`（同样内容）

**修改文件：** `src/app/parent/settings/page.tsx` — 退出跳转改为 `/parent/login`

---

## 4. 验证方式

1. 访问 `/child/login`，确认页面底部无 tab 导航栏
2. 登录后进入孩子端，点击"退出登录"，确认跳转到 `/child/login`
3. 同样验证家长端 `/parent/login` 和退出功能

---

**文档版本：** v1.0
**创建日期：** 2026-05-22