---
title: 家长奖励积分功能设计
created: 2026-05-24
status: draft
---

# 家长奖励积分功能设计

## 背景

当前积分系统中，积分只能通过孩子完成任务获取。用户希望增加一个功能：家长可以直接给孩子一次性奖励积分，用于特定场景（如考试好成绩、做了好事等）。

## 需求总结

| 项目 | 需求 |
|------|------|
| 奖励场景 | 特定场景奖励，需要填写原因 |
| 积分数值 | 预设档位（5、10、20、30、50）+ 自定义输入 |
| 孩子端展示 | 整合到「完成」tab，用样式区分 |
| 撤销功能 | **不允许撤销**（后续规划惩罚功能） |
| 保存确认 | **需要二次确认弹窗**，避免误操作 |
| 孩子端奖励人 | 不显示，保持简洁 |
| 家长端奖励人 | 显示，支持多家长协作 |

## 数据模型设计

新增 `Reward` 表，记录家长奖励：

```prisma
model Reward {
  id          String   @id @default(cuid())
  userId      String   // 被奖励的孩子
  user        User     @relation(fields: [userId], references: [id])
  familyId    String   // 冗余存储，便于查询
  family      Family   @relation(fields: [familyId], references: [id])
  points      Int      // 奖励积分
  reason      String   // 奖励原因（必填）
  createdBy   String   // 发起奖励的家长 ID
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId, createdAt])  // 孩子端历史查询
  @@index([familyId, createdAt]) // 家长端统计查询
}
```

修改 `User` 和 `Family` 模型，添加关联：

```prisma
model User {
  // ... 现有字段
  rewards     Reward[]  // 新增
}

model Family {
  // ... 现有字段
  rewards     Reward[]  // 新增
}
```

**设计说明**：
- `familyId` 冗余存储，与 `TaskCompletion` 设计一致，简化家长端查询
- `reason` 字段记录奖励原因，符合用户「特定场景奖励」需求
- `createdBy` 记录发起奖励的家长 ID，支持多家长场景
- **奖励不允许撤销**，设计更简洁，后续用其他机制扣积分

## API 设计

### 家长端 API

**1. 创建奖励**

```
POST /api/parent/rewards
Body: { userId: string, points: number, reason: string }
Response: { rewardId: string, points: number, currentPoints: number }
```

请求验证：
- `userId`: 必填，必须是本家庭的 CHILD 角色
- `points`: 必填，正整数，建议范围 1-1000
- `reason`: 必填，长度限制 50 字符

**2. 查询奖励记录**

```
GET /api/parent/rewards
Query: ?weekStart=YYYY-MM-DD (可选，查某周的奖励)
Response: { rewards: ParentRewardRecord[] }
```

返回结构：
```typescript
interface ParentRewardRecord {
  id: string;
  userId: string;
  username: string;        // 被奖励的孩子名
  points: number;
  reason: string;
  createdBy: string;
  createdByName: string;   // 发起奖励的家长名
  createdAt: string;
}
```

### 孩子端 API

**查询奖励记录**

```
GET /api/child/history/rewards
Query: ?weeks=4 (可选，默认4周)
Response: { rewards: ChildRewardWeekData[] }
```

返回结构（与任务完成记录一致，按周分组）：
```typescript
interface ChildRewardWeekData {
  weekRange: { start: string; end: string };
  rewards: ChildRewardRecord[];
  summary: { count: number; points: number };
}

interface ChildRewardRecord {
  id: string;
  points: number;
  reason: string;
  createdAt: string;
}
```

## UI 设计

### 家长端 UI

**入口位置**：在孩子详情页 (`/parent/stats/[childId]`) 添加「奖励积分」按钮

理由：
- 操作对象明确（当前查看的孩子）
- 与现有撤销功能在同一页面，便于管理
- 不增加首页复杂度

**奖励表单**：

弹窗表单包含：
1. **预设档位选择**：5 个按钮（5、10、20、30、50 积分），点击后填入对应数值
2. **自定义输入框**：数字输入框，可手动修改积分值
3. **原因输入框**：文本输入框，必填，限制 50 字符
4. **确认按钮**：点击后弹出二次确认弹窗

**二次确认弹窗**：
- 显示奖励详情（积分值、原因）
- 用户点击「确认奖励」后才真正提交
- 避免误操作

**奖励记录展示**：

在孩子详情页的完成记录列表中整合展示：
- 任务完成记录和奖励记录混合显示（按时间倒序）
- 用不同样式区分：
  - 任务完成：显示任务名、积分，用「任务」图标
  - 家长奖励：显示原因、积分、奖励人，用「礼物/星星」图标

### 孩子端 UI

**展示方式**：整合到「完成」tab

理由：
- 奖励和任务完成都是「积分来源」，孩子关心的是「我怎么获得积分」
- 不增加 tab 数量，保持界面简洁
- 用不同样式区分，不会混淆

具体设计：
- 在 `completions` tab 的列表中，混合展示任务完成记录和奖励记录
- 任务完成：显示任务名、积分，用「任务」图标
- 奖励：显示原因、积分，用「礼物/星星」图标，标注「家长奖励」

## 前端改动清单

### 家长端

1. **API 层** (`src/lib/api-parent.ts`)：
   - 新增 `rewardsApi` 对象：create, list

2. **组件层**：
   - 新增 `RewardDialog.tsx`：奖励表单弹窗（含二次确认）
   - 新增 `RewardRecordCard.tsx`：奖励记录卡片
   - 修改 `CompletionRecordCard.tsx`：或统一为积分记录卡片

3. **页面层** (`src/app/parent/stats/[childId]/page.tsx`)：
   - 添加「奖励积分」按钮
   - 集成奖励表单弹窗
   - 修改记录列表，混合展示任务完成和奖励记录

4. **Hook 层**：
   - 新增 `use-parent-rewards.ts`：奖励相关数据管理

### 孩子端

1. **API 层** (`src/lib/api-child.ts`)：
   - 新增 `getRewardsHistory` 函数

2. **Hook 层** (`src/hooks/use-child-history.ts`)：
   - 扩展支持获取奖励记录
   - 合并任务完成和奖励数据

3. **组件层** (`src/components/child/WeekHistory.tsx`)：
   - 支持渲染奖励记录类型
   - 区分样式

## 迁移计划

1. 创建 Prisma 迁移文件：添加 Reward 表，修改 User/Family 模型
2. 执行迁移
3. 生成 Prisma Client

## 后续扩展

暂不考虑，遵循 YAGNI 原则：
- 不做奖励规则/模板
- 不做奖励统计
- 不做积分类型分类