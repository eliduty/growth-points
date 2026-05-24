## Context

当前孩子端界面实现使用 Next.js + Tailwind CSS，主要样式定义在 `globals.css` 中通过 CSS 变量实现主题切换（data-role="child" 时使用橙色主题）。

原型图设计强调"活泼、激励"的儿童友好风格，采用：
- 渐变背景色（橙→青→黄组合）
- 装饰性星星元素
- 动画效果（闪烁、bounce、旋转）
- 激活指示器和 hover 微交互

当前实现在视觉细节上与原型图存在差距，但架构层面无需改动，仅需在现有 CSS 和组件层面增强样式。

## Goals / Non-Goals

**Goals:**
- 修复11项视觉差距，使孩子端界面与原型图设计保持一致
- 增强界面的视觉吸引力，符合儿童友好风格
- 添加微交互效果提升用户体验

**Non-Goals:**
- 不改变功能逻辑或 API
- 不添加新的页面或路由
- 不修改数据模型

## Decisions

### 1. CSS 动画放置位置

**Decision**: 新增动画样式（星星闪烁、光泽扫过）放在 `globals.css` 中

**Rationale**: 
- 与现有主题变量保持一致的放置位置
- 动画可复用，便于在其他组件中使用
- Tailwind CSS 的 animate-* 扩展也推荐在全局配置

**Alternatives considered**:
- 组件内联样式 → 难以复用，维护困难
- 单独 animations.css → 增加文件数量，不如统一管理

### 2. 礼物卡片渐变背景实现

**Decision**: 使用 Tailwind 的渐变类 + 预定义颜色组合

**Rationale**:
- 原型图设计了6种渐变背景：橙、青、黄、蓝、紫、橙2
- 可在 GiftItem 组件中根据礼物索引或 ID 映射颜色
- 使用 CSS 变量可保持主题一致性

**Implementation**:
```tsx
const GIFT_COLORS = [
  'from-[#FF6B35] to-[#FF8A50]',  // 橙
  'from-[#4ECDC4] to-[#7FDBDA]',  // 青
  'from-[#FFD93D] to-[#FFE066]',  // 黄
  'from-[#60A5FA] to-[#93C5FD]',  // 蓝
  'from-[#A78BFA] to-[#C4B5FD]',  // 紫
  'from-[#FB923C] to-[#FDBA74]',  // 橙2
];
```

### 3. 底部导航激活指示器

**Decision**: 使用 CSS `::before` 伪元素 + opacity transition

**Rationale**:
- 伪元素不增加 DOM 结构复杂度
- opacity transition 比 height/width transition 更平滑
- 与现有 nav-item 样式兼容

**Implementation**:
```css
.nav-item::before {
  content: '';
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 3px;
  background: var(--color-primary);
  border-radius: 3px;
  opacity: 0;
  transition: opacity 0.2s;
}

.nav-item.active::before {
  opacity: 1;
}
```

## Risks / Trade-offs

### Risk: 动画性能影响
- **Risk**: 过多 CSS 动画可能影响低端设备性能
- **Mitigation**: 使用 `will-change` 提示浏览器优化；动画元素数量有限（登录页4颗星星）

### Risk: 颜色一致性
- **Risk**: 新增渐变色可能与现有主题色不一致
- **Mitigation**: 使用现有 CSS 变量（primary、primaryLight、secondary、accent）作为渐变基础

### Trade-off: 礼物颜色分配
- **Trade-off**: 暂时使用索引轮换分配颜色，未来可能需要支持自定义礼物颜色
- **Mitigation**: 设计预留扩展点，可通过 gift.color 字段覆盖