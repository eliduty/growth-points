## 1. Context 和组件创建

- [x] 1.1 创建 `TopNavbarContext`，提供 `setTopNavbarConfig` 方法
- [x] 1.2 创建 `src/components/shared/TopNavbar.tsx` 组件，包含返回按钮、标题、右侧操作区域
- [x] 1.3 在 `tailwind.config.ts` 中添加 `pt-topnav` 间距类（56px）

## 2. Layout 集成

- [x] 2.1 在 `src/app/parent/layout.tsx` 中引入 TopNavbar 和 TopNavbarProvider
- [x] 2.2 排除登录页不显示 TopNavbar

## 3. 页面调整

- [x] 3.1 调整 `src/app/parent/tasks/page.tsx`：移除顶部操作栏，通过 Context 设置"添加任务"按钮
- [x] 3.2 调整 `src/app/parent/gifts/page.tsx`：移除顶部添加按钮，通过 Context 设置"添加礼物"按钮
- [x] 3.3 调整 `src/app/parent/settings/page.tsx`：移除标题区块，通过 Context 设置标题
- [x] 3.4 创建或调整 `src/app/parent/stats/page.tsx`：通过 Context 设置"统计"标题

## 4. 样式和验证

- [x] 4.1 确认 TopNavbar 样式与原型一致（白色背景、底部边框、阴影）
- [x] 4.2 验证各页面显示正常，返回按钮功能正常