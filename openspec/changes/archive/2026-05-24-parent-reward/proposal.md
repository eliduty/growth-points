## Why

当前积分系统中，积分只能通过孩子完成任务获取。家长希望能直接给孩子一次性奖励积分，用于特定场景（如考试好成绩、做了好事等）。这增强了家长与孩子之间的正向互动，补充了任务积分的单一来源。

## What Changes

- 新增 `Reward` 数据模型，记录家长奖励
- 家长端新增「奖励积分」功能入口，在孩子详情页操作
- 奖励表单：预设档位（5、10、20、30、50）+ 自定义输入 + 原因填写
- 二次确认弹窗防止误操作
- 孩子端历史记录整合展示奖励（在「完成」tab，用样式区分）
- 奖励不支持撤销（后续规划惩罚功能）

## Capabilities

### New Capabilities

- `parent-reward`: 家长奖励积分功能，包括创建奖励、查询奖励记录、孩子端展示

### Modified Capabilities

无。孩子端历史展示的 UI 变化属于实现细节，不改变现有 requirement。

## Impact

- **数据库**: 新增 `Reward` 表，修改 `User` 和 `Family` 模型添加关联
- **API**: 新增家长端奖励 API（POST /api/parent/rewards, GET /api/parent/rewards），新增孩子端奖励历史 API（GET /api/child/history/rewards）
- **家长端页面**: `/parent/stats/[childId]` 页面新增奖励按钮和弹窗，记录列表混合展示
- **孩子端组件**: `WeekHistory` 组件扩展支持奖励类型渲染
- **前端 Hooks**: 新增 `use-parent-rewards.ts`，扩展 `use-child-history.ts`