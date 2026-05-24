## Context

当前登录页布局存在嵌套问题：

```
布局层 div (min-h-screen pb-nav pt-topnav)
├── pt-topnav (56px) - 登录页不需要
├── 登录页 div (min-h-screen p-4)
└── pb-nav (56px) - 登录页不需要
```

总高度 = 100vh + 112px，超出视口产生滚动条。

## Goals / Non-Goals

**Goals:**
- 登录页不出现滚动条
- 登录页内容垂直居中显示
- 保持其他页面（有导航栏）的布局不变

**Non-Goals:**
- 不修改登录页自身的组件结构
- 不修改全局CSS样式

## Decisions

### 方案：布局层条件渲染

在布局层检测是否为登录页，登录页时不添加导航padding。

**理由：**
- 最小改动范围，仅修改布局文件
- 登录页逻辑已经存在 (`isLoginPage` 变量)
- 不影响其他页面的导航布局

**实现方式：**
```tsx
// 登录页时使用无padding的容器
<div className={isLoginPage ? "min-h-screen" : "min-h-screen pb-nav pt-topnav"}>
```

## Risks / Trade-offs

无明显风险。改动仅影响登录页的布局容器样式。