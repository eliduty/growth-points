## ADDED Requirements

### Requirement: Child TopNavbar displays with orange gradient background

孩子端 TopNavbar SHALL 使用橙色渐变背景（`#FF6B35 → #FF8A50`），与孩子端主题色统一。

#### Scenario: Child role displays orange gradient TopNavbar
- **WHEN** `data-role` 属性设置为 `child`
- **THEN** TopNavbar 背景显示为橙色渐变
- **AND** 文字和图标显示为白色
- **AND** hover 效果使用 `rgba(255, 255, 255, 0.1)`

### Requirement: Child TopNavbar displays page title based on route

孩子端 TopNavbar SHALL 根据路由自动显示对应的页面标题。

#### Scenario: Tasks page displays correct title
- **WHEN** 用户访问 `/child` 路径
- **THEN** TopNavbar 标题显示为 "我的任务"

#### Scenario: Gifts page displays correct title
- **WHEN** 用户访问 `/child/gifts` 路径
- **THEN** TopNavbar 标题显示为 "礼物兑换"

#### Scenario: Profile page displays correct title
- **WHEN** 用户访问 `/child/profile` 路径
- **THEN** TopNavbar 标题显示为 "个人中心"

### Requirement: Child TopNavbar displays back button

孩子端 TopNavbar SHALL 在左侧显示返回按钮，点击后调用 `router.back()`。

#### Scenario: Back button navigates to previous page
- **WHEN** 用户点击返回按钮
- **THEN** 系统调用 `router.back()` 返回上一页

### Requirement: Child TopNavbar has empty action area

孩子端 TopNavbar SHALL 在右侧保留空占位区域，不显示操作按钮。

#### Scenario: Action area is empty
- **WHEN** TopNavbar 在孩子端渲染
- **THEN** 右侧操作区域为空占位（48x48）
- **AND** 不显示任何操作按钮

### Requirement: Child layout includes TopNavbar

孩子端 layout SHALL 包含 TopNavbarProvider 和 TopNavbar 组件，并在非登录页显示。

#### Scenario: Child layout shows TopNavbar on main pages
- **WHEN** 用户访问孩子端主页面（任务、礼物、个人中心）
- **THEN** 页面顶部显示 TopNavbar
- **AND** 页面内容有 `pt-topnav` 顶部 padding

#### Scenario: Child login page does not show TopNavbar
- **WHEN** 用户访问孩子端登录页 `/child/login`
- **THEN** 不显示 TopNavbar
- **AND** 页面没有顶部 padding