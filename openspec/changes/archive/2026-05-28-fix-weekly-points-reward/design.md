## Context

当前三个 API 在计算本周积分时只查询 `TaskCompletion` 表：

```
weeklyPoints = taskCompletions.reduce((sum, c) => sum + c.points, 0)
```

但 `parent-reward` spec 定义了周汇总应包含"任务+奖励"的积分总数，且 Reward 表的数据未被计入。

数据模型：
- `TaskCompletion`：任务完成记录，有 `revokedAt` 字段（可能被撤销）
- `Reward`：家长奖励记录，无撤销机制（spec 定义奖励不可撤销）

## Goals / Non-Goals

**Goals:**
- 修正三个 API 的 `weeklyPoints` 计算，使其包含本周奖励积分
- 保持与现有 spec 的合规性

**Non-Goals:**
- 不改变 `currentPoints` 和 `totalPoints` 的计算（已正确包含奖励）
- 不添加奖励撤销功能（spec 定义奖励不可撤销）
- 不修改前端组件逻辑

## Decisions

### 决策 1：查询方式

**方案 A：在现有 Prisma 查询中添加 rewards 关联**
- 优点：一次查询完成
- 缺点：User 表的 rewards 关联已存在，但需要修改查询结构

**方案 B：单独查询 Reward 表后合并计算**
- 优点：改动最小，不影响现有查询结构
- 缺点：多一次数据库查询

**选择：方案 B**
理由：Reward 查询简单（无撤销逻辑），单独查询代码改动最小、风险最低。

### 决策 2：时间范围过滤

使用与 TaskCompletion 相同的时间范围条件：
- `createdAt >= weekStart && createdAt <= weekEnd`

Reward 无撤销机制，不需要 `revokedAt == null` 的过滤。

## Risks / Trade-offs

**性能风险** → 每个请求多一次 Reward 查询，但 Reward 表数据量小，影响可忽略。

**数据一致性** → Reward 创建时已同步更新 User.currentPoints/totalPoints，本周计算只是展示层面的汇总，不影响实际积分余额。