## 1. 数据库迁移

- [x] 1.1 在 schema.prisma 中添加 Reward 模型
- [x] 1.2 在 User 和 Family 模型中添加 rewards 关联
- [x] 1.3 执行 Prisma 迁移命令
- [x] 1.4 生成 Prisma Client

## 2. API 层 - 家长端

- [x] 2.1 创建 `/api/parent/rewards` 路由文件
- [x] 2.2 实现 POST 接口：创建奖励（验证 userId/points/reason）
- [x] 2.3 实现 GET 接口：查询奖励记录列表
- [x] 2.4 在 `src/lib/api-parent.ts` 中添加 rewardsApi 对象

## 3. API 层 - 孩子端

- [x] 3.1 创建 `/api/child/history/rewards` 路由文件
- [x] 3.2 实现 GET 接口：按周查询孩子的奖励记录
- [x] 3.3 在 `src/lib/api-child.ts` 中添加 getRewardsHistory 函数

## 4. 家长端 UI - 基础组件

- [x] 4.1 创建 `RewardDialog.tsx` 奖励表单弹窗组件（参考原型）
- [x] 4.2 实现预设档位按钮（5/10/20/30/50）
- [x] 4.3 实现自定义积分输入框
- [x] 4.4 实现原因输入框（50字符限制 + 计数显示）
- [x] 4.5 实现二次确认弹窗

## 5. 家长端 UI - 页面集成

- [x] 5.1 创建 `use-parent-rewards.ts` Hook
- [x] 5.2 在孩子详情页添加「奖励积分」按钮
- [x] 5.3 集成 RewardDialog 弹窗
- [x] 5.4 修改记录列表支持混合展示（任务完成 + 奖励）
- [x] 5.5 添加奖励记录卡片样式（礼物图标 + 样式区分）

## 6. 孩子端 UI

- [x] 6.1 扩展 `use-child-history.ts` 支持奖励记录
- [x] 6.2 修改 `WeekHistory.tsx` 支持奖励类型渲染
- [x] 6.3 添加奖励记录样式（礼物图标 + 「家长奖励」标注）
- [x] 6.4 更新周汇总统计（包含奖励数和奖励积分）

## 7. 类型定义

- [x] 7.1 在 `src/types` 中添加 Reward 相关类型定义