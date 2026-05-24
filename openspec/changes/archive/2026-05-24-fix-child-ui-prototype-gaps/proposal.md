## Why

当前孩子端界面实现与原型图设计存在11项视觉差距，影响用户体验的一致性和界面的美观度。主要差距包括：底部导航缺少激活指示器、礼物卡片缺少彩色渐变背景、个人页用户信息卡片缺少渐变背景、登录页缺少装饰星星等。这些差距让孩子端界面显得不够生动，与原型图设计的"活泼、激励"风格存在偏差。

## What Changes

### 底部导航（所有孩子端页面）
- 添加激活项顶部的橙色横条指示器（24px宽，渐变动画）
- 添加 hover 时图标上浮效果（translateY -2px）

### 登录页
- 添加四颗装饰星星（闪烁动画）
- 添加卡片底部彩色渐变装饰条（橙→青→黄→橙）
- 添加按钮 hover 时光泽扫过动画效果
- 调整背景纹理为星星图案

### 任务页
- 优化区域标题样式（添加图标+圆角背景badge）
- 已完成任务卡片背景色调整为浅绿色(#E8F8F5)

### 礼物页
- 添加积分概览卡片（与任务页一致）
- 礼物卡片改为彩色渐变背景（橙/青/黄/蓝/紫等）
- 礼物名称移至彩色背景中央
- 添加礼物专属图标区域

### 个人页
- 用户信息卡片改为渐变背景（橙色）
- Tab 样式优化（添加图标+激活底部边框）
- 周分组样式优化（添加日历图标+折叠箭头）
- 周统计卡片改为渐变背景样式
- 添加退出登录按钮图标

## Capabilities

### New Capabilities

- `child-ui-visual-effects`: 孩子端界面视觉效果增强，包括装饰星星、渐变背景、动画效果等

### Modified Capabilities

无。本次变更仅涉及视觉样式优化，不改变功能需求。

## Impact

### 受影响文件
- `src/components/shared/BottomNav.tsx` - 添加激活指示器和hover效果
- `src/app/child/login/page.tsx` - 添加装饰星星和底部装饰条
- `src/components/child/ChildLoginForm.tsx` - 添加按钮光泽动画
- `src/components/child/TaskList.tsx` - 优化区域标题样式
- `src/components/child/GiftGrid.tsx` - 添加积分卡片
- `src/components/child/GiftItem.tsx` - 改为彩色渐变背景
- `src/app/child/gifts/page.tsx` - 添加积分概览组件
- `src/app/child/profile/page.tsx` - 用户卡片渐变背景
- `src/components/child/HistoryTab.tsx` - Tab样式优化
- `src/components/child/WeekHistory.tsx` - 周分组和统计卡片样式

### 设计系统
- 可能需要扩展 CSS 变量以支持新的颜色渐变组合
- 需要在 globals.css 中添加装饰星星的动画样式