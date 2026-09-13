## Context

项目 Toast 基于 sonner 实现（`src/components/ui/toast.tsx` 挂载于 `layout.tsx`），但 2026-05-25 的 `refine-toast-style` 变更在 `globals.css` 中手写了深度覆盖样式：`linear-gradient` 实现左侧 4px 色条、10% 透明度浅色背景、`border: none !important` 等，共约 50 行。这层 hack 与 sonner 上游设计对抗，`!important` 使样式难以演进，且手绘的色条 + 浅背景视觉相比 sonner 原生设计并不更优。

现状配置：`position="top-center"`、`duration={5000}`、四个 `classNames` 类型钩子。

现有 `toast-notification` spec 定义了「左侧色条 + 图标 + 浅色背景」「固定功能色 #4ECDC4」等视觉约定，本次随实现同步修订。

## Goals / Non-Goals

**Goals:**

- Toast 视觉回归 sonner 原生 richColors 模式，四类通知类型可辨识
- 删除全部手写覆盖样式（含 `!important`），Toaster 配置最小化
- spec 与实现同步，消除「色条结构」的过时约定
- 20+ 调用点零改动

**Non-Goals:**

- 不更换 toast 库（react-hot-toast、antd message 等已评估并否决）
- 不新增庆祝动效/操作按钮/closeButton 等增强
- 不改位置（保持 top-center）与各调用点的消息文案
- 不做深色模式适配（项目当前无深色模式）

## Decisions

### D1: 用好现有 sonner，而非换库

sonner 即 shadcn/ui 官方 toast 方案，项目已是 Radix + sonner 生态。换库（react-hot-toast / antd message）需迁移 20+ 调用点并引入异构技术栈，收益仅为「换一个成熟组件」——而 sonner 本身已是。问题根源是手写覆盖样式，不是库本身。

### D2: 视觉采用 richColors 模式

richColors 在原生白底卡片之上提供内置类型着色（浅色类型背景 + 深色文字 + 状态图标着色），保留「一眼分清成功/失败」的功能价值——这正是当初手写色条想解决的问题，上游内置方案更精致。纯默认白底四类仅靠图标区分，辨识度不足，否决。

### D3: 位置保持 top-center，时长回归默认

移动优先 PWA 中顶部出现符合习惯且避开底部拇指热区，「遮挡」未被确认为痛点，不为它引入变化。删除 `duration={5000}` 回归 sonner 默认 4s——少一个自定义参数就少一处与上游行为的偏差；hover 暂停、拖拽、swipe 关闭等上游交互自然获得。

### D4: 删除 `globals.css` 全部手写 Toast 样式

信奉上游：只要 sonner 提供的配置项（`richColors`）能达到目的，就不写覆盖 CSS。删除后如有个别细节需对齐设计令牌（如字号），优先用 `toastOptions.style` 声明式配置而非 `[data-sonner-toast]` 选择器 + `!important`。

## Risks / Trade-offs

- [richColors 内置色板与项目功能色令牌（`--color-success` 等）色值不完全一致] → 接受上游色板，「固定功能色」requirement 同步修订为 sonner 内置类型色；功能价值（类型可辨识、不随主题变）不变
- [删除手写样式后视觉与 05-25 归档原型存在差异] → 该原型即本次要替换的对象，spec delta 同步修订，归档 spec 由 archive 流程收敛
- [sonner 版本升级可能微调 richColors 色值] → 接受上游演进，这正是删除手写样式的收益之一

## Migration Plan

无数据迁移。单次部署生效，回滚即还原两个文件的改动。
