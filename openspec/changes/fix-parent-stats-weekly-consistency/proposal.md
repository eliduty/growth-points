## Why

家长端「完成记录」详情页（`/parent/stats/[childId]`）的列表与统计口径不一致：完成记录只查本周，奖励记录却是全量历史数据。页面顶部显示本周日期范围、空状态提示「本周暂无记录」，但列表混入历史奖励记录，底部统计把全部历史奖励计入「共获得积分」，导致家长看到的数字前后矛盾，且与首页孩子卡片的本周口径冲突。根源是 `parent-reward` spec 中家长端「查看奖励记录」requirement 漏写时间范围限定（孩子端写明了「按周分组」，家长端遗漏）。

## What Changes

- `/api/parent/rewards`（GET）新增可选 `weekStart` 查询参数，支持按周过滤奖励记录（不传时保持现有全量行为，向后兼容）
- 详情页拉取奖励记录时传入当前周参数，列表仅展示本周的任务完成记录与奖励记录
- 详情页底部统计消除前端双轨计算：改用 `/api/parent/stats` 返回的本周口径数据
- `/api/parent/stats` 每个孩子补充返回 `weeklyRewards`（本周奖励次数）与 `weeklyRewardPoints`（本周奖励积分），支持详情页「奖励 X 次」展示
- `parent-reward` spec 补充家长端奖励记录展示的时间范围限定（仅本周）
- `parent-stats-api` spec 补充新增字段的返回约定

## Capabilities

### New Capabilities

无。

### Modified Capabilities

- `parent-reward`: 「家长可以查看奖励记录」requirement 补充时间范围限定——详情页混合列表仅展示本周时间范围内的奖励记录
- `parent-stats-api`: 「API 返回结构匹配前端类型约定」requirement 补充 `children` 数组元素新增 `weeklyRewards`、`weeklyRewardPoints` 字段，并明确详情页统计应以 API 返回的本周口径为准

## Impact

**API：**
- `GET /api/parent/rewards` — 新增可选 `weekStart` 参数（向后兼容）
- `GET /api/parent/stats` — `data.children[]` 新增 `weeklyRewards`、`weeklyRewardPoints` 字段

**前端：**
- `src/app/parent/stats/[childId]/page.tsx` — 奖励拉取传周参数、统计改用 API 口径
- `src/hooks/use-parent-rewards.ts` — 支持 `weekStart` 选项
- `src/lib/api-parent.ts` — `rewardsApi.list` 支持 `weekStart` 参数
- `src/types` — `WeeklyStats` 孩子元素类型补充新字段

**无数据库改动，无破坏性变更。**
