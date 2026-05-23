## ADDED Requirements

### Requirement: TopNavbar 显示返回按钮
TopNavbar 组件 SHALL 在左侧显示返回按钮，点击时调用 `router.back()` 返回上一页。

#### Scenario: 点击返回按钮
- **WHEN** 用户点击返回按钮
- **THEN** 系统调用 `router.back()`，返回上一页

#### Scenario: 无历史记录时
- **WHEN** 用户点击返回按钮且浏览器无历史记录
- **THEN** 无任何效果（按钮仍可点击）

### Requirement: TopNavbar 自动匹配标题
TopNavbar 组件 SHALL 根据当前路由自动显示对应的标题。

#### Scenario: 统计页标题
- **WHEN** 路由为 `/parent`
- **THEN** 标题显示为 "统计"

#### Scenario: 任务页标题
- **WHEN** 路由为 `/parent/tasks`
- **THEN** 标题显示为 "任务管理"

#### Scenario: 礼物页标题
- **WHEN** 路由为 `/parent/gifts`
- **THEN** 标题显示为 "礼物管理"

#### Scenario: 设置页标题
- **WHEN** 路由为 `/parent/settings`
- **THEN** 标题显示为 "设置"

### Requirement: 页面可覆盖标题
页面 SHALL 能够通过 Context 覆盖默认标题。

#### Scenario: 页面设置自定义标题
- **WHEN** 页面通过 `setTopNavbarConfig({ title: "自定义标题" })` 设置标题
- **THEN** TopNavbar 显示 "自定义标题" 而非默认标题

### Requirement: 页面可设置右侧操作
页面 SHALL 能够通过 Context 设置右侧操作区域的内容。

#### Scenario: 页面设置操作按钮
- **WHEN** 页面通过 `setTopNavbarConfig({ action: <Button>添加</Button> })` 设置操作
- **THEN** TopNavbar 右侧显示添加按钮

#### Scenario: 页面清除操作按钮
- **WHEN** 页面通过 `setTopNavbarConfig({ action: null })` 清除操作
- **THEN** TopNavbar 右侧不显示任何内容

### Requirement: 登录页不显示 TopNavbar
登录页 (`/parent/login`) SHALL 不显示 TopNavbar。

#### Scenario: 登录页无 TopNavbar
- **WHEN** 路由为 `/parent/login`
- **THEN** 不渲染 TopNavbar 组件

### Requirement: TopNavbar 固定定位
TopNavbar 组件 SHALL 固定在页面顶部，高度为 56px，内容区域需添加相应的顶部间距。

#### Scenario: 内容区域不被遮盖
- **WHEN** TopNavbar 渲染在页面
- **THEN** 页面内容区域添加 `pt-topnav` 间距（56px），内容不被遮盖