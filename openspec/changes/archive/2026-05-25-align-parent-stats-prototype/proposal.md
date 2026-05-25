## Why

家长端统计页面的原型 HTML 与实际实现存在多处不一致，包括页面结构、撤销交互、布局方式等。这些差异会导致设计文档与代码脱节，影响后续开发和维护。需要统一原型和实现，确保设计文档能准确反映系统行为。

## What Changes

- 页面结构统一为双页面设计（概览页 + 详情页），更新原型 HTML
- 撤销操作从长按卡片改为点击撤销按钮，与原型一致
- 概览页孩子卡片保持垂直列表布局，更新原型 HTML
- 奖励积分按钮保持在详情页顶部，更新原型 HTML 新增详情页原型
- 预设积分档位保持 5/10/20/30/50，更新原型 HTML
- 详情页标题添加"完成记录"到 TopNavbar TITLE_MAP
- 详情页移除手动返回按钮（TopNavbar 已有返回功能）

## Capabilities

### New Capabilities

无新增能力。

### Modified Capabilities

- `parent-stats`: 修改撤销交互方式，从长按改为点击按钮；统一页面结构与原型

## Impact

**代码修改：**
- `src/components/shared/TopNavbar.tsx` - TITLE_MAP 添加详情页标题
- `src/app/parent/stats/[childId]/page.tsx` - 移除手动返回按钮
- `src/components/parent/CompletionRecordCard.tsx` - 添加撤销按钮

**原型修改：**
- `docs/prototypes/parent-stats.html` - 重构为双页面结构，包含概览页和详情页原型

**无 API 或数据库影响。**