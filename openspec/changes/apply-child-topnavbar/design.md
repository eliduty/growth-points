## Context

**当前状态**：
- `TopNavbar.tsx` 组件已实现，用于家长端
- 样式是白色背景（`bg-card`），文字是深色
- 使用 `TopNavbarProvider` 提供 Context 配置标题和操作按钮
- 家长端 layout 已正确引入 TopNavbar

**孩子端现状**：
- `child/layout.tsx` 没有 TopNavbarProvider 和 TopNavbar
- 没有 `pt-topnav` padding
- `child/profile/page.tsx` 有自定义 header（白色背景），与其他页面不一致

**CSS 主题系统**：
- 通过 `data-role` 属性区分主题：`parent` 或 `child`
- 孩子端主色是 `#FF6B35`（橙色），已定义在 `:root[data-role='child']`

## Goals / Non-Goals

**Goals:**
- TopNavbar 组件支持双端样式切换（白色 vs 橙色渐变）
- 孩子端 layout 正确引入 TopNavbar
- 孩子端三个页面使用统一 TopNavbar
- 保持孩子端活泼、活力的视觉风格

**Non-Goals:**
- 不改变 TopNavbar 的功能逻辑（返回按钮行为、Context 配置）
- 不修改家长端现有 TopNavbar 行为
- 不处理登录页的 TopNavbar（登录页独立布局）

## Decisions

### 1. 样式切换方式

**决策**: 使用 CSS 变量 + data-role 属性动态切换样式

**实现方案**:
```css
/* globals.css 新增 */
:root[data-role='child'] {
  --topnav-bg: linear-gradient(135deg, #FF6B35 0%, #FF8A50 100%);
  --topnav-text: white;
  --topnav-icon: white;
  --topnav-hover: rgba(255, 255, 255, 0.1);
}

:root[data-role='parent'] {
  --topnav-bg: var(--bg-card);
  --topnav-text: var(--text-primary);
  --topnav-icon: var(--text-primary);
  --topnav-hover: rgba(91, 127, 255, 0.05);
}
```

**原因**: 
- 和现有主题系统一致（`data-role`）
- 避免在组件中硬编码样式判断
- 方便未来扩展其他端

**替代方案**:
- 在组件中使用 `data-role` prop 传递角色 → 需要在 layout 中传参，增加耦合
- 创建两个 TopNavbar 组件 → 代码重复

### 2. TITLE_MAP 扩展

**决策**: 在 `TopNavbar.tsx` 中添加孩子端路由映射

```typescript
const TITLE_MAP: Record<string, string> = {
  "/parent": "统计",
  "/parent/tasks": "任务管理",
  "/parent/gifts": "礼物管理",
  "/parent/settings": "设置",
  // 新增孩子端
  "/child": "我的任务",
  "/child/gifts": "礼物兑换",
  "/child/profile": "个人中心",
};
```

**原因**: 统一管理所有路由标题，保持组件简洁

### 3. child/layout.tsx 改造

**决策**: 参照 `parent/layout.tsx` 结构，引入 TopNavbarProvider

```tsx
return (
  <TopNavbarProvider>
    <div className="min-h-screen pb-nav pt-topnav" style={{ background: "var(--bg-gradient)" }}>
      {!isLoginPage && <TopNavbar />}
      {children}
      {!isLoginPage && <BottomNav role="child" />}
    </div>
  </TopNavbarProvider>
);
```

**原因**: 和家长端保持一致的架构，便于维护

### 4. profile 页面 header 移除

**决策**: 移除 `child/profile/page.tsx` 的自定义 header，使用 TopNavbar

**原因**: 统一孩子端所有页面的顶部导航风格

## Risks / Trade-offs

**[样式切换时机]** → TopNavbar 组件在渲染时会读取 CSS 变量，data-role 已在 layout 的 useEffect 中设置，顺序正确

**[profile 页面骨架屏状态]** → profile 页面的骨架屏和错误状态也有自定义 header，需要一并移除

**[孩子端返回按钮功能]** → 孩子端主页面（任务页）点击返回可能无历史记录，这是正常行为，不做特殊处理