## Context

家长端当前布局 (`src/app/parent/layout.tsx`) 只有底部导航，缺少顶部导航栏。原型设计中有 TopNavbar，包含：
- 返回按钮（左侧）
- 标题（中间）
- 右侧操作按钮（可选）

各页面目前各自处理标题和操作按钮，位置不统一。

## Goals / Non-Goals

**Goals:**
- 创建 TopNavbar 组件，在框架层面统一处理
- 返回按钮调用 `router.back()`，支持浏览器后退
- 标题根据路由自动匹配，页面可覆盖
- 右侧操作区域通过 React Context 让页面自定义
- 统一家长端页面结构

**Non-Goals:**
- 不改变孩子端页面结构
- 不影响现有功能逻辑
- 不处理登录页的 TopNavbar（登录页独立布局）

## Decisions

### 1. TopNavbar 组件位置

**决策**: 创建 `src/components/shared/TopNavbar.tsx`

**原因**: 与 `BottomNav.tsx` 保持一致的目录结构，便于复用。

### 2. 标题配置方式

**决策**: 路由映射 + Context 覆盖

**映射配置**:
```
/parent → "统计"
/parent/tasks → "任务管理"
/parent/gifts → "礼物管理"
/parent/settings → "设置"
```

**原因**: 框架层面处理默认值，减少重复代码；页面仍可灵活覆盖。

### 3. 右侧操作区域实现

**决策**: React Context + Slot 模式

**原因**:
- 页面可以在渲染时动态设置操作按钮
- 无需在每个页面引入 TopNavbar
- 保持 layout 统一控制

### 4. 返回按钮行为

**决策**: 显示返回按钮，调用 `router.back()`

**原因**: 用户确认的需求，支持浏览器后退历史。

**替代方案**:
- 不显示返回按钮（主页面无需返回）
- 返回按钮回到首页

### 5. 登录页处理

**决策**: 登录页不显示 TopNavbar

**原因**: 登录页是独立流程，不需要导航栏。

## Risks / Trade-offs

**[返回按钮在无历史时无效果]** → 正常行为，不做特殊处理，用户会理解

**[Context 设置时机]** → 使用 useEffect 在页面 mount 时设置，确保顺序正确

**[页面间距调整]** → 添加 `pt-topnav` 类，确保内容不被 TopNavbar 遮盖