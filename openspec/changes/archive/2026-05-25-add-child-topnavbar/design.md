## Context

孩子端原型当前布局：
- 只有底部导航栏（任务/礼物/我的）
- 页面内容直接从顶部开始
- 顶部有特色卡片（积分卡片、兑换信息、用户信息）

家长端已添加 TopNavbar，结构为：
- 返回按钮（左侧）
- 页面标题（中间）
- 操作按钮（右侧）
- 白色背景

## Goals / Non-Goals

**Goals:**
- 在孩子端三个原型页面添加 TopNavbar
- TopNavbar 结构和家长端一致（三段式）
- 配色适配孩子端主题（橙色渐变）
- 保持孩子端活泼、活力的视觉风格

**Non-Goals:**
- 不修改实际应用代码（仅原型设计）
- 不改变孩子端底部导航
- 不处理登录页（登录页独立布局）

## Decisions

### 1. TopNavbar 配色方案

**决策**: 橙色渐变背景 `linear-gradient(135deg, #FF6B35 0%, #FF8A50 100%)`

**原因**: 和孩子端主题色统一，更有活力，和孩子端整体风格一致。

**家长端对比**: 家长端使用白色背景，体现管理端稳重风格；孩子端使用橙色渐变，体现活泼风格。

### 2. 右侧操作区域处理

**决策**: 空占位，不显示任何内容

**原因**: 孩子端是使用视角，没有"添加"权限，不需要操作按钮。保留布局对称性。

### 3. 标题文字

**决策**:
- child-tasks.html: "我的任务"
- child-gifts.html: "礼物兑换"
- child-profile.html: "个人中心"

**原因**: 体现孩子端"使用"视角，而非家长端的"管理"视角。

### 4. 返回按钮样式

**决策**: hover 状态使用 `rgba(255, 255, 255, 0.1)`，SVG 图标使用白色

**原因**: 因为背景是橙色渐变（深色），hover 效果需要适配。白色图标在橙色背景上清晰可见。

### 5. 页面内容间距

**决策**: `body { padding-top: 56px }`

**原因**: 为固定顶部导航留空间，防止内容被遮挡。

## Risks / Trade-offs

**[顶部卡片下移]** → 积分卡片等特色内容会往下移动 56px，这是预期效果，不影响视觉体验

**[返回按钮功能]** → 原型中返回按钮仅作视觉展示，实际应用需调用 `router.back()`

## CSS 样式规格

```css
/* 顶部导航栏 */
.top-nav {
  height: 56px;
  background: linear-gradient(135deg, #FF6B35 0%, #FF8A50 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  box-shadow: 0 2px 8px rgba(255, 107, 53, 0.15);
}

.nav-back {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 150ms ease-out;
  border-radius: 8px;
}

.nav-back:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-back svg {
  width: 24px;
  height: 24px;
  stroke: white;
  stroke-width: 2;
  fill: none;
}

.nav-title {
  font-size: 18px;
  font-weight: 600;
  color: white;
}

.nav-action {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* body 需要添加 */
body {
  padding-top: 56px;
}
```