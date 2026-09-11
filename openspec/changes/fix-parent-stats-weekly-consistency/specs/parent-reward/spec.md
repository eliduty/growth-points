## MODIFIED Requirements

### Requirement: 家长可以查看奖励记录

家长 SHALL 能在孩子详情页查看本周的奖励记录，奖励记录 SHALL 与任务完成记录混合展示。

#### Scenario: 奖励记录列表展示
- **WHEN** 家长查看孩子详情页
- **THEN** 任务完成记录和奖励记录混合展示（按时间倒序）
- **AND** 奖励记录仅包含本周时间范围内的记录
- **AND** 奖励记录显示：原因、积分值、奖励人、时间
- **AND** 用不同样式区分任务完成和奖励

#### Scenario: 奖励记录样式区分
- **WHEN** 混合列表中有一条奖励记录
- **THEN** 该记录使用礼物/星星图标
- **AND** 标注「家长奖励」或类似标识

#### Scenario: 本周外奖励不显示
- **WHEN** 某条奖励记录创建于本周时间范围之外
- **THEN** 该记录不出现在孩子详情页的混合列表中

#### Scenario: 详情页统计与列表口径一致
- **WHEN** 家长查看孩子详情页底部统计
- **THEN** 「奖励 X 次」SHALL 等于列表中本周奖励记录的条数
- **AND** 「共获得积分」SHALL 等于本周任务完成积分（未撤销）与本周奖励积分之和

## ADDED Requirements

### Requirement: 奖励记录列表 API 支持按周过滤

`GET /api/parent/rewards` SHALL 支持可选 `weekStart` 查询参数，用于按周过滤奖励记录。

#### Scenario: 携带 weekStart 参数查询
- **WHEN** 请求携带 `weekStart` 参数
- **THEN** 仅返回该参数所在周（北京时间周一 00:00:00 至周日 23:59:59）创建的奖励记录

#### Scenario: 不携带 weekStart 参数查询
- **WHEN** 请求不携带 `weekStart` 参数
- **THEN** 返回全部奖励记录（保持现有行为）
