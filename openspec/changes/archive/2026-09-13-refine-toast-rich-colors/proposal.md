## Why

当前 Toast 在 sonner 之上手写了深度覆盖样式（`globals.css` 中 linear-gradient 色条 + 多处 `!important`），与上游设计体系对抗，维护成本高且视觉效果不成熟。sonner 本身是成熟组件（shadcn/ui 官方 toast 方案），其原生 richColors 模式提供经过大量产品验证的类型着色与交互，应回归上游设计而非自行发明样式。

## What Changes

- `src/components/ui/toast.tsx`：启用 sonner `richColors`，删除手写 `classNames`、`style`、`duration={5000}` 配置，时长回归 sonner 默认 4s
- `src/app/globals.css`：删除全部 `[data-sonner-toast]` 手写覆盖样式（约 50 行，含 `!important`）
- `toast-notification` spec 同步：三个 requirement 的视觉描述从「左侧色条 + 图标 + 浅色背景」改为 sonner richColors 原生表现
- 20+ 处 `toast.success/error/warning/info` 调用点零改动（API 不变）

## Capabilities

### New Capabilities

无。

### Modified Capabilities

- `toast-notification`: 「Toast 支持四种状态类型」场景视觉描述改为 richColors 表现；「Toast 使用固定功能色」改为使用 sonner 内置类型色（仍不随角色主题变化）；「Toast 视觉结构统一」从色条结构改为 sonner 原生卡片结构

## Impact

**代码：**
- `src/components/ui/toast.tsx` — Toaster 配置重写（简化）
- `src/app/globals.css` — 删除手写 Toast 样式段落

**无数据库、无 API、无调用点改动，无破坏性变更。**
