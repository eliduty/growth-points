## 1. API 层

- [x] 1.1 `GET /api/parent/stats`：在 `children[]` 元素中新增 `weeklyRewards`（本周奖励次数）与 `weeklyRewardPoints`（本周奖励积分），复用现有 `weeklyRewards` 查询与 `rewardPointsByChild` 分组逻辑
- [x] 1.2 `GET /api/parent/rewards`：新增可选 `weekStart` 查询参数，提供时经 `new Date(param)` + `getWeekStart`/`getWeekEnd` 归一化过滤 `createdAt`，缺省时保持全量行为

## 2. 前端类型与 API 客户端

- [x] 2.1 `src/types` 中 `WeeklyStats` 孩子元素类型补充 `weeklyRewards: number`、`weeklyRewardPoints: number`
- [x] 2.2 `src/lib/api-parent.ts` 的 `rewardsApi.list` 支持可选 `weekStart` 参数并拼入查询字符串

## 3. 前端 Hook 与详情页

- [x] 3.1 `useParentRewards` 支持 `weekStart` 选项，queryKey 扩展为 `["parent-rewards", userId, weekStart]`
- [x] 3.2 详情页 `src/app/parent/stats/[childId]/page.tsx`：拉取奖励时传入当前周 `weekStart`（客户端复用 `lib/date` 的 `getWeekStart` 归一化生成，与 API 同源）
- [x] 3.3 详情页删除底部统计的本地 `useMemo` 重算，改用 `weeklyCompleted` / `weeklyRewards` / `weeklyPoints` 展示「完成 X 个任务、奖励 Y 次、共获得 Z 积分」

## 4. 验证

- [x] 4.1 验证详情页列表不再出现本周之外的奖励记录，本周奖励正常显示
- [x] 4.2 验证详情页底部统计与列表条数一致，且与首页孩子卡片的 `weeklyPoints` 一致
- [x] 4.3 验证创建奖励、撤销记录后缓存失效正常，数字即时更新
- [x] 4.4 运行 typecheck 通过（项目未配置 ESLint，`next lint` 需交互初始化，不在本 change 范围）
