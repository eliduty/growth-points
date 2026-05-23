## Why

家长端原型中已添加了 TopNavbar（顶部导航栏），包含返回按钮、标题和右侧操作区域。孩子端原型当前只有底部导航，缺少顶部导航栏。需要在孩子端原型中添加统一的 TopNavbar，保持两端布局一致性。

## What Changes

- 在孩子端三个原型页面添加 TopNavbar：
  - `docs/prototypes/child-tasks.html` - 添加 TopNavbar，标题"我的任务"
  - `docs/prototypes/child-gifts.html` - 添加 TopNavbar，标题"礼物兑换"
  - `docs/prototypes/child-profile.html` - 添加 TopNavbar，标题"个人中心"

- TopNavbar 设计规格：
  - 橙色渐变背景（和孩子端主题色统一）
  - 白色标题文字
  - 返回按钮 hover 效果适配深色背景
  - 右侧操作区域留空（孩子端无添加权限）

## Capabilities

### New Capabilities

- `child-topnavbar-prototype`: 孩子端原型顶部导航栏，提供统一的页面顶部结构

### Modified Capabilities

无（这是原型设计修改，不影响实际应用代码）

## Impact

- `docs/prototypes/child-tasks.html` - 添加 TopNavbar 样式和结构
- `docs/prototypes/child-gifts.html` - 添加 TopNavbar 样式和结构
- `docs/prototypes/child-profile.html` - 添加 TopNavbar 样式和结构