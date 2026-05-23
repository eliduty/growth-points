## Why

当前家长端设置页面的实现样式过于朴素,与原型设计存在明显差异。原型设计使用更丰富的视觉效果(渐变按钮、彩色头像背景、明确的角色图标),而当前实现使用了简化的虚线边框和卡片样式。需要调整页面样式使其更接近原型设计,提升用户体验和视觉一致性。

## What Changes

- 成员列表项样式调整:
  - 添加角色专属头像背景色(孩子橙色、家长蓝色)
  - 移除角色文字标签("孩子"/"家长")
  - 移除积分显示
  - 移除人数统计
  
- 分组标题调整:
  - "孩子成员" → "孩子"
  - "家长成员" → "家长"
  
- 添加按钮样式调整:
  - 虚线边框按钮 → 蓝色渐变实心按钮
  - 添加图标和文字组合
  
- "(我)"标记样式调整:
  - "(我)" → "(你)" 以匹配原型
  
- 分隔方式调整:
  - 移除分割线,使用分组标题自然分隔

## Capabilities

### New Capabilities

无新增能力

### Modified Capabilities

- `parent-settings`: 调整设置页面样式规范,使其与原型设计保持一致

## Impact

- `src/app/parent/settings/page.tsx` - 页面组件
- `src/components/parent/MemberGroup.tsx` - 成员分组组件
- `src/components/parent/MemberListItem.tsx` - 成员列表项组件
- `docs/prototypes/parent-settings.html` - 原型参考