## Why

家长端原型中已设计了 TopNavbar（顶部导航栏），包含返回按钮、标题和右侧操作区域，但实际应用中尚未实现。当前各页面标题和操作按钮位置不统一，需要将 TopNavbar 应用到实际应用中，统一页面结构。

## What Changes

- 新增 TopNavbar 组件，支持：
  - 返回按钮（调用 `router.back()`）
  - 标题（路由自动匹配，页面可覆盖）
  - 右侧操作区域（页面通过 Context 自定义）
- 在 `parent/layout.tsx` 中引入 TopNavbar
- 各页面移除现有的标题和操作按钮，改为通过 Context 设置

## Capabilities

### New Capabilities

- `parent-topnavbar`: 家长端顶部导航栏组件，提供统一的页面顶部结构，包括返回按钮、标题和右侧操作区域

### Modified Capabilities

无（这是新增 UI 组件，不改变现有功能需求）

## Impact

- `src/app/parent/layout.tsx` - 引入 TopNavbar
- `src/components/shared/TopNavbar.tsx` - 新组件
- `src/app/parent/tasks/page.tsx` - 移除顶部操作栏，通过 Context 设置
- `src/app/parent/gifts/page.tsx` - 移除顶部添加按钮，通过 Context 设置
- `src/app/parent/settings/page.tsx` - 通过 Context 设置标题
- `src/app/parent/stats/page.tsx` - 通过 Context 设置标题（如需创建）