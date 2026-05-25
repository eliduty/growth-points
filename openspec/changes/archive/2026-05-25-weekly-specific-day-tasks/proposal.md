## Why

当前任务系统采用"重复任务池"模式：所有任务每天都显示，无法支持"周二倒垃圾"、"周末大扫除"这类只在特定日期显示的任务。家长需要一种方式来安排任务在特定日期生效，同时让孩子能看到完整的家务清单认知。

## What Changes

- Task 模型新增 `availableDays` 字段，支持指定任务可用日期
- 孩子端任务列表改为三层分组：今日待办 / 已完成 / 其他时间
- 家长端区分"待安排"和"已安排"任务状态
- 不可用日期的任务对孩子显示为灰色，点击时提示限制

## Capabilities

### New Capabilities

- `task-availability`: 任务可用日期设置功能，支持家长为任务指定可用日期（周一至周日），孩子按日期查看可完成的任务

### Modified Capabilities

无（这是新增功能，不修改现有 capability 的需求）

## Impact

- **数据模型**: Task 表新增 `availableDays` 字段（nullable String）
- **API**:
  - `GET /api/child/tasks`: 返回数据增加 `availableDays`、`isAvailableToday`、`availableDaysDisplay`；过滤 null 状态任务
  - `GET /api/parent/tasks`: 返回数据增加 `availableDays`、`status`、`availableDaysDisplay`
  - `PATCH /api/parent/tasks/[id]`: 支持 `availableDays` 参数更新
- **前端**:
  - 孩子端 `TaskList`: 三层分组逻辑、灰色样式、交互限制
  - 家长端 `EditTaskDialog`: 日期选择组件（快捷按钮 + 复选框）
  - 家长端任务列表: 待安排/已安排状态显示
- **类型定义**: `ChildTask`、`ParentTask` 类型新增字段