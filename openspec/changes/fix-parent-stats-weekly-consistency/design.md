## Context

家长端「完成记录」详情页（`/parent/stats/[childId]`）由两条独立链路供数：

- 完成记录：`useParentStats()` → `GET /api/parent/stats`，只查本周（含已撤销）
- 奖励记录：`useParentRewards()` → `GET /api/parent/rewards`，全量历史，无时间过滤

详情页底部统计是前端 `useMemo` 用这两条链路的数据本地重算的，而 `/api/parent/stats` 在 API 层已按「本周任务 + 本周奖励」口径算好 `weeklyPoints`（2026-05-28 `fix-weekly-points-reward` 修复确立，见 `parent-stats-api` spec）。API 口径没有传导到详情页，造成列表与统计、详情页与首页三处不一致。

根源：`parent-reward` spec 的「家长可以查看奖励记录」requirement 只定义了展示形式，漏写时间范围（孩子端同段 spec 写明「按周分组」，家长端遗漏）。

相关实现现状：
- `getWeekStart`/`getWeekEnd`（`src/lib/date.ts`）提供北京时间周一 00:00:00 ~ 周日 23:59:59 的归一化
- `/api/parent/stats` 已有可选 `weekStart` 查询参数模式（`new Date(param)` 后经 `getWeekStart` 归一化）
- `useParentRewards` 当前唯一消费方是详情页；`rewardsApi.list(userId)` 仅传 `userId`
- react-query 缓存：`["parent-rewards", userId]`，失效用前缀 `["parent-rewards"]`

## Goals / Non-Goals

**Goals:**

- 详情页列表与统计口径一致：均为「本周」
- 详情页与首页孩子卡片的本周统计数字一致
- 统计数据单一事实来源：API 计算，前端不再重算
- `/api/parent/rewards` 具备按周过滤能力，向后兼容
- 修正 `parent-reward` spec 的时间范围空白

**Non-Goals:**

- 历史记录查看能力（历史奖励流水、分页、周切换）——未来独立 change，本次的过滤参数为其铺路
- 奖励撤销机制（spec 已定义奖励不可撤销）
- 详情页支持切换历史周（`useParentStats` 的 `weekStart` 选项暂不启用）
- 已撤销记录的展示方式调整（保持现有「列表显示 + 标记、统计排除」设计）

## Decisions

### D1: 详情页定位为「本周视图」

周边全部语境指向本周：TopNavbar 标题「完成记录」、顶部 weekRange 展示、空状态文案「本周暂无记录」、首页跳转携带的本周口径预期、05-28 spec 定死的统计口径、孩子端按周分组的心智模型。唯一例外是 spec 漏写的那半句，本次以补 spec 方式收敛，而非推翻周边语义。

备选：全历史视图（需重写 `parent-stats-api` 口径与页面叙事，改动大且与首页冲突）；列表全量 + 统计拆分（双时间口径并存，用户需自行心算，且同样要改 spec）。均否决。

### D2: `/api/parent/rewards` 新增可选 `weekStart` 参数，而非把奖励明细塞进 stats API

- stats API 是概览接口（一次查全家孩子的汇总数据），塞入奖励明细（reason、creatorName 等）会让概览负载随历史增长而膨胀
- rewards API 已返回列表所需全部字段，只差时间过滤，改动最小
- 参数处理与 stats API 同模式：`new Date(weekStartParam)` 后经 `getWeekStart`/`getWeekEnd` 归一化为北京时间整周
- 语义：不传 = 全量（保持现有行为，向后兼容）；传 = 仅返回该周记录
- 前端传参：客户端直接复用 `lib/date` 的 `getWeekStart` + `formatBeijingDate` 生成当前周 `YYYY-MM-DD`（`lib/date` 在客户端组件中已有使用先例）。相比解析 stats 响应的 `weekRange.start`，此方式与 API 共用同一归一化实现、无需等待 stats 加载（避免 rewards 以全量模式先发一次请求的错误数据闪现与双请求）

### D3: 统计口径唯一化——详情页改用 API 数据，删除本地重算

- `GET /api/parent/stats` 的 `children[]` 新增 `weeklyRewards`（本周奖励次数）、`weeklyRewardPoints`（本周奖励积分），计算方式与现有 `weeklyRewards` 汇总逻辑（`rewardPointsByChild`）同源
- 详情页展示映射：「完成 X 个任务」← `weeklyCompleted`；「奖励 Y 次」← `weeklyRewards`；「共获得 Z 积分」← `weeklyPoints`
- 删除 `page.tsx` 中 stats 的 `useMemo` 本地重算
- 收益：首页与详情页读取同一份 API 计算，天然一致；消除两条链路拼数据的双轨模式

### D4: react-query 缓存键纳入 weekStart

- `useParentRewards` 的 queryKey 从 `["parent-rewards", userId]` 扩展为 `["parent-rewards", userId, weekStart]`
- 现有失效逻辑均用前缀 `["parent-rewards"]`（`invalidateQueries` 前缀匹配），无需改动即可覆盖新键

## Risks / Trade-offs

- [weekStart 参数格式解析歧义] → 统一约定前端传 `YYYY-MM-DD` 日期部分，API 端经 `getWeekStart` 归一化（与 stats API 同模式），规避非 ISO 格式跨运行时解析差异
- [家长手动数列表条数仍会与「完成 X 个任务」差 1~N]（已撤销记录在列表显示但不计入统计）→ 这是 spec 既有设计（已撤销记录可见性），保持不变；撤销标记本身已解释差异
- [rewards API 缺省全量的行为可能被未来消费方误用] → spec 明确参数语义；唯一现有消费方（详情页）始终传参
- [奖励创建后缓存失效] → 现有 `invalidateQueries({ queryKey: ["parent-rewards"] })` 前缀匹配已覆盖新 queryKey，验证即可，无需改动
