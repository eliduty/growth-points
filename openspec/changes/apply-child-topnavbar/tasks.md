## 1. CSS 变量准备

- [x] 1.1 在 `globals.css` 中添加孩子端 TopNavbar CSS 变量（`--topnav-bg`, `--topnav-text`, `--topnav-icon`, `--topnav-hover`）
- [x] 1.2 在 `globals.css` 中添加家长端 TopNavbar CSS 变量默认值

## 2. TopNavbar 组件改造

- [x] 2.1 在 `TopNavbar.tsx` 中添加孩子端 TITLE_MAP（`/child`, `/child/gifts`, `/child/profile`）
- [x] 2.2 修改 `TopNavbar.tsx` 样式，使用 CSS 变量替代硬编码颜色
- [x] 2.3 添加 TopNavbar 橙色渐变背景样式类

## 3. Child Layout 改造

- [x] 3.1 在 `child/layout.tsx` 中引入 `TopNavbarProvider`
- [x] 3.2 在 `child/layout.tsx` 中引入 `TopNavbar` 组件（非登录页显示）
- [x] 3.3 在 `child/layout.tsx` 中添加 `pt-topnav` padding

## 4. Profile 页面改造

- [x] 4.1 移除 `child/profile/page.tsx` 的自定义 header（正常状态）
- [x] 4.2 移除 `child/profile/page.tsx` 的自定义 header（骨架屏状态）
- [x] 4.3 移除 `child/profile/page.tsx` 的自定义 header（错误状态）
- [x] 4.4 移除 profile 页面不再需要的 import（`ChevronLeft`）

## 5. 验证

- [x] 5.1 验证孩子端任务页 TopNavbar 显示正确（橙色渐变 + 标题"我的任务")
- [x] 5.2 验证孩子端礼物页 TopNavbar 显示正确（标题"礼物兑换")
- [x] 5.3 验证孩子端个人中心 TopNavbar 显示正确（标题"个人中心")
- [x] 5.4 验证孩子端登录页不显示 TopNavbar
- [x] 5.5 验证家长端 TopNavbar 样式未受影响（白色背景）