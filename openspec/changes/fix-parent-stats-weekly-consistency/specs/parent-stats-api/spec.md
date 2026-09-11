## MODIFIED Requirements

### Requirement: API 返回结构匹配前端类型约定

家长端统计 API (`/api/parent/stats`) 返回的数据结构 SHALL 与前端 TypeScript 类型定义 `WeeklyStats` 保持一致。

#### Scenario: 成功获取统计数据
- **WHEN** 家长用户请求 `/api/parent/stats`
- **THEN** API 返回的 `data` 对象包含 `weekRange` 字段（嵌套对象，含 `start` 和 `end` 属性）
- **AND** API 返回的 `data` 对象包含 `children` 字段（孩子统计数组）

#### Scenario: 日期范围字段格式
- **WHEN** API 返回统计数据
- **THEN** `weekRange.start` 和 `weekRange.end` 均为北京时间格式化的日期字符串

#### Scenario: 孩子统计数组字段
- **WHEN** API 返回统计数据
- **THEN** `children` 数组中每个元素包含 `id`、`username`、`currentPoints`、`totalPoints`、`weeklyCompleted`、`weeklyPoints`、`weeklyRewards`、`weeklyRewardPoints`、`completions` 字段

#### Scenario: weeklyPoints 包含奖励积分
- **WHEN** API 计算本周积分 `weeklyPoints`
- **THEN** 计算结果 SHALL 等于本周任务完成积分 + 本周奖励积分
- **AND** 任务完成积分仅计入未撤销的记录（`revokedAt == null`）
- **AND** 奖励积分计入本周时间范围内所有奖励记录（奖励无撤销机制）

#### Scenario: weeklyRewards 统计本周奖励
- **WHEN** API 计算 `weeklyRewards` 与 `weeklyRewardPoints`
- **THEN** `weeklyRewards` SHALL 等于该孩子本周时间范围内的奖励记录次数
- **AND** `weeklyRewardPoints` SHALL 等于该孩子本周时间范围内的奖励积分总和
