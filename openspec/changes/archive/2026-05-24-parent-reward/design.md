## Context

当前积分系统流程：
- 孩子完成任务 → 获得 +积分
- 孩子兑换礼物 → 消耗 -积分

新增家长奖励功能，增加一条积分来源路径：
- 家长直接奖励 → 获得 +积分

**参考原型**：`docs/prototypes/parent-stats.html` 中已有奖励弹窗的 UI 原型设计。

## Goals / Non-Goals

**Goals:**
- 家长可以给孩子发放奖励积分（填写原因）
- 奖励记录持久化存储
- 家长端可查看奖励历史
- 孩子端可在历史记录中看到奖励

**Non-Goals:**
- 奖励撤销功能（后续规划惩罚功能）
- 奖励规则/模板
- 奖励统计报表

## Decisions

### 1. 数据模型设计

新增 `Reward` 表：

```prisma
model Reward {
  id          String   @id @default(cuid())
  userId      String   // 被奖励的孩子
  user        User     @relation(fields: [userId], references: [id])
  familyId    String   // 冗余存储，便于查询
  family      Family   @relation(fields: [familyId], references: [id])
  points      Int      // 奖励积分
  reason      String   // 原因（必填，≤50字符）
  createdBy   String   // 发起奖励的家长 ID
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([userId, createdAt])
  @@index([familyId, createdAt])
}
```

**设计要点**：
- `familyId` 冗余存储，与 `TaskCompletion` 设计一致
- `reason` 必填，限制 50 字符
- `createdBy` 支持多家长场景

### 2. UI 入口位置

家长端入口：孩子详情页 `/parent/stats/[childId]`

**理由**：
- 操作对象明确（当前查看的孩子）
- 与现有撤销功能在同一页面
- 不增加首页复杂度

### 3. 孩子端展示位置

整合到 `completions` tab（任务历史），用样式区分。

**理由**：
- 奖励和任务完成都是「积分来源」，语义统一
- 不增加 tab 数量
- 奖励频率低，不会喧宾夺主

### 4. 预设档位

固定 5 档：5、10、20、30、50 积分，外加自定义输入。

**理由**：
- 覆盖常见奖励场景
- 最大值 1000，允许较大额度的一次性奖励

### 5. 二次确认

奖励前弹出二次确认弹窗。

**理由**：防止误操作（家长点击后不可撤销）

## Risks / Trade-offs

**奖励不可撤销**
→ 用户误操作后无补救方式
→ Mitigation: 二次确认弹窗 + 明确提示

**混合展示可能混淆**
→ 任务完成和奖励在同一列表
→ Mitigation: 不同样式区分（图标、颜色、标注「家长奖励」）