## Why

孩子端本周积分（`weeklyPoints`）没有包含家长奖励积分，导致孩子看到的本周获得积分不准确。`parent-reward` spec 已经定义了周汇总应显示"任务+奖励"的积分总数，但当前三个 API 的计算逻辑只查询了 `taskCompletions` 表，遗漏了 `Reward` 表的数据。

## What Changes

- 修复 `/api/child/tasks` 的 `weeklyPoints` 计算，加入本周奖励积分
- 修复 `/api/child/gifts` 的 `weeklyPoints` 计算，加入本周奖励积分
- 修复 `/api/parent/stats` 的 `weeklyPoints` 计算，加入本周奖励积分

## Capabilities

### New Capabilities

无。这是对现有功能的 bug 修复。

### Modified Capabilities

- `parent-stats-api`: `weeklyPoints` 字段的计算逻辑需包含本周奖励积分，而非仅任务完成积分

## Impact

**受影响的 API：**
- `/api/child/tasks` - 孩子端首页积分概览
- `/api/child/gifts` - 孩子端礼物页积分概览
- `/api/parent/stats` - 家长端本周统计

**数据库查询：**
- 需在计算 `weeklyPoints` 时额外查询 `Reward` 表本周时间范围内的记录

**前端组件：**
- `PointsOverview` 组件显示的 `weekly` 值将变得准确
- 家长端统计页的本周积分将包含奖励积分