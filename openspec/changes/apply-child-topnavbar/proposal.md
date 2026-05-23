## Why

孩子端原型已添加 TopNavbar（橙色渐变背景），但实际应用代码中孩子端尚未引入 TopNavbar。当前孩子端页面缺少统一的顶部导航，profile 页面有自定义 header 与其他页面风格不一致。需要将原型设计应用到实际代码，统一孩子端页面结构。

## What Changes

- 修改 `TopNavbar.tsx` 组件，根据 `data-role` 动态切换样式：
  - 家长端（`data-role='parent'`）：白色背景
  - 孩子端（`data-role='child'`）：橙色渐变背景
- 添加孩子端路由的 TITLE_MAP 配置
- 修改 `child/layout.tsx`：
  - 引入 `TopNavbarProvider`
  - 引入 `TopNavbar` 组件
  - 添加 `pt-topnav` 顶部 padding
- 移除 `child/profile/page.tsx` 的自定义 header，使用统一的 TopNavbar

## Capabilities

### New Capabilities

无（这是 UI 组件的样式适配和布局调整，不引入新功能）

### Modified Capabilities

- `topnavbar`: TopNavbar 组件需要支持双端样式切换（家长端白色背景，孩子端橙色渐变背景）

## Impact

- `src/components/shared/TopNavbar.tsx` - 样式和 TITLE_MAP 修改
- `src/app/child/layout.tsx` - 引入 TopNavbarProvider 和 TopNavbar
- `src/app/child/profile/page.tsx` - 移除自定义 header
- `src/app/globals.css` - 可能需要添加孩子端 TopNavbar 相关 CSS 变量