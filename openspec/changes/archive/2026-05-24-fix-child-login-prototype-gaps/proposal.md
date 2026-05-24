## Why

孩子端登录页的实际实现与原型设计存在多处视觉差异，导致用户界面体验与设计预期不一致。需要修正这些差异以确保产品界面的一致性和设计还原度。

## What Changes

- 将装饰星星从页面背景移至卡片内部四角（与原型一致）
- 修正卡片圆角：28px（原型）vs 20px（实现）
- 修正卡片内边距：40px 28px（原型）vs 36px（实现）
- 修正输入框圆角：14px（原型）vs 12px（实现）
- 修正登录按钮圆角：14px（原型）vs 12px（实现）
- 修正底部装饰条高度：10px（原型）vs 12px（实现）
- 装饰星星颜色统一为金色 `#FFD93D`

## Capabilities

### New Capabilities

无新增能力，仅修复现有实现的视觉偏差。

### Modified Capabilities

无能力需求变更，仅实现层面的样式调整。

## Impact

- `src/app/child/login/page.tsx` - 页面布局和装饰星星位置
- `src/components/child/ChildLoginForm.tsx` - 表单样式（输入框、按钮圆角）
- `src/app/globals.css` - 可能需要添加或调整相关 CSS 变量和动画