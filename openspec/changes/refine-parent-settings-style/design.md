## Context

家长端设置页面当前使用的组件样式过于简化,与原型设计存在差异。原型设计使用了更丰富的视觉效果来区分孩子和家长角色,以及更醒目的添加按钮样式。

当前组件:
- `MemberGroup` - 虚线边框添加按钮,显示人数统计
- `MemberListItem` - 卡片样式,显示角色标签、积分、"(我)"标记

原型设计:
- 添加按钮使用蓝色渐变背景
- 成员项使用简洁列表样式
- 头像使用角色专属颜色背景(孩子橙色、家长蓝色)
- 不显示积分、角色标签、人数统计

## Goals / Non-Goals

**Goals:**
- 调整成员列表项样式,使其更简洁、更接近原型
- 添加按钮使用渐变背景,提升视觉吸引力
- 保持功能完整性(添加、删除成员)

**Non-Goals:**
- 不修改功能逻辑(添加/删除流程保持不变)
- 不修改弹窗设计(AddMemberDialog、DeleteConfirmDialog)
- 不修改兑换日设置和个人信息部分

## Decisions

### 1. MemberListItem 样式调整

**决策**: 将卡片样式改为简洁列表项样式,移除角色标签和积分显示

**理由**: 原型设计使用简洁的列表项样式,通过头像背景色区分角色,不需要额外的文字标签。积分显示在设置页面不是必需的,用户可以在统计页查看。

**原型样式参考**:
```css
.member-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #E5E7EB;
}

.member-avatar.child {
  background: linear-gradient(135deg, #FFF0E8 0%, #FFE8DC 100%);
}

.member-avatar.parent {
  background: linear-gradient(135deg, #E8F0FE 0%, #F0F4FF 100%);
}
```

### 2. MemberGroup 样式调整

**决策**: 将虚线边框按钮改为蓝色渐变实心按钮

**理由**: 原型设计使用醒目的渐变按钮,更能吸引用户点击添加成员。

**原型样式参考**:
```css
.add-member-btn {
  background: linear-gradient(135deg, #5B7FFF 0%, #7B9FFF 100%);
  border: none;
  border-radius: 8px;
  padding: 10px 16px;
  color: white;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(91, 127, 255, 0.2);
  transition: all 150ms ease-out;
}

.add-member-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(91, 127, 255, 0.25);
}
```

### 3. 分组标题文案调整

**决策**: 简化分组标题文案,移除人数统计

**理由**: 原型设计使用简洁的"孩子"/"家长"标签,不需要"成员"二字和人数统计。

## Risks / Trade-offs

**Risk**: 移除积分显示可能影响用户快速了解孩子积分的能力

→ **Mitigation**: 用户可以在统计页面查看孩子的积分详情,设置页面主要用于管理成员,显示积分不是核心需求

**Risk**: 样式调整可能导致用户感知变化

→ **Mitigation**: 新样式更接近原型设计,视觉上更丰富,应该提升用户体验