# 礼物每周兑换上限设计

## 1. 功能概述

### 1.1 目的

为礼物兑换增加每周兑换数量限制，实现以下目标：
- 防止冲动兑换：孩子有时间思考，避免一时冲动兑换过多礼物
- 资源管理：家长无法在短时间内准备太多实物礼物
- 延长激励周期：孩子持续获得积分，而不是一下子全部兑换完
- 限制特定礼物兑换次数：某些礼物（如游戏时间券）不宜频繁兑换
- 培养计划消费习惯：让孩子学会规划自己的积分使用

### 1.2 设计范围

| 限制维度 | 设计决策 |
|----------|---------|
| 限制对象 | 每个礼物独立设置上限 |
| 统计范围 | 每个孩子独立计算本周兑换次数 |
| 周期定义 | 自然周（周一至周日） |

---

## 2. 数据模型

### 2.1 Gift 表变更

新增 `weeklyLimit`、`description`、`color` 字段：

```prisma
model Gift {
  id           String    @id @default(cuid())
  name         String
  points       Int
  description  String?   // 礼物描述（可选）
  color        String?   // 预设颜色池随机分配（可选）
  familyId     String
  weeklyLimit  Int?      // 每周兑换上限，null 表示无限制
  createdAt    DateTime  @default(now())
  updatedAt    DateTime  @updatedAt
  deletedAt    DateTime? // 软删除

  family       Family    @relation(fields: [familyId], references: [id])
  redemptions GiftRedemption[]
}
```

**字段说明：**

| 字段 | 类型 | 说明 |
|------|------|------|
| description | String? | 礼物描述，可选字段 |
| color | String? | 礼物颜色，从预设池随机分配，可选字段 |
| weeklyLimit | Int? | 每周兑换上限，可选字段。null 表示无限制，最小值为 1（如果填写） |

### 2.2 GiftRedemption 表（无变更）

现有字段已满足统计需求：
- `userId`：用于按孩子统计
- `giftId`：用于按礼物统计
- `redeemedAt`：用于判断是否在本周内
- `status`：用于排除已撤销的兑换

### 2.3 本周统计查询逻辑

```typescript
// 计算本周起始时间（周一 00:00:00，使用北京时间）
function getWeekStart(date: Date): Date {
  // 使用北京时间（UTC+8）计算
  // 周一为一周的开始
}

// 查询本周某孩子对某礼物的有效兑换次数
function countWeeklyRedemptions(userId: string, giftId: string): number {
  const weekStart = getWeekStart(new Date())
  return prisma.giftRedemption.count({
    where: {
      userId,
      giftId,
      redeemedAt: { gte: weekStart },
      status: { in: ['PENDING', 'CONFIRMED'] }  // 只统计有效兑换，排除 CANCELLED
    }
  })
}
```

---

## 3. API 层变更

### 3.1 兑换接口变更

**接口：** POST `/api/child/gifts/redeem`

**新增验证步骤：**

```
兑换请求 → 兑换日检查（现有） → 积分检查（现有） → 每周上限检查（新增） → 执行兑换
```

**验证逻辑：**

```typescript
async function redeemGift(userId: string, giftId: string) {
  const gift = await getGift(giftId)

  // 1. 兑换日检查（现有）
  if (!isExchangeDay()) {
    return { error: '非兑换日，无法兑换' }
  }

  // 2. 积分检查（现有）
  const user = await getUser(userId)
  if (user.currentPoints < gift.points) {
    return { error: '积分不足' }
  }

  // 3. 每周上限检查（新增）
  if (gift.weeklyLimit !== null) {
    const redeemedCount = await countWeeklyRedemptions(userId, giftId)
    if (redeemedCount >= gift.weeklyLimit) {
      return { error: `本周已兑换 ${redeemedCount} 次，已达上限` }
    }
  }

  // 4. 执行兑换（现有流程）
  // ...
}
```

### 3.2 礼物列表接口变更

**接口：** GET `/api/child/gifts`

**返回数据新增字段：**

```typescript
interface GiftWithLimit {
  id: string
  name: string
  points: number
  description: string | null
  color: string | null
  weeklyLimit: number | null        // 上限值
  weeklyRedeemed: number            // 本周已兑换次数
  canRedeem: boolean                // 是否可兑换（综合考虑积分+上限+兑换日）
  limitStatus: LimitStatus          // 上限状态
}

type LimitStatus = 'unlimited' | 'available' | 'exhausted'
```

**状态计算逻辑：**

| 条件 | limitStatus | canRedeem |
|------|-------------|-----------|
| weeklyLimit 为 null | unlimited | 根据积分+兑换日判断 |
| weeklyRedeemed < weeklyLimit | available | 根据积分+兑换日判断 |
| weeklyRedeemed >= weeklyLimit | exhausted | false |

---

## 4. 前端界面

### 4.1 孩子端礼物卡片变更

**显示状态标记：**

```
┌─────────────────────────────────┐
│ 🎁 游戏时间券                    │
│ 需要 50 积分                     │
│                                  │
│ [本周已兑 2/2] ← 已达上限        │
│ [本周可兑 1/2] ← 未达上限        │
│                                  │
│ 距下周可兑换还有 3 天 ← 倒计时   │
│                                  │
│ [兑换] ← 正常状态                │
│ [本周已兑完] ← 已达上限          │
└─────────────────────────────────┘
```

**样式区分：**

| 状态 | 显示内容 | 按钮状态 |
|------|---------|---------|
| unlimited | 不显示计数标记 | 正常显示兑换按钮 |
| available | 显示绿色"本周可兑 X/Y" | 正常显示兑换按钮 |
| exhausted | 显示灰色"本周已兑完"，显示倒计时 | 隐藏或禁用兑换按钮 |

### 4.2 家长端创建/编辑礼物对话框

**新增输入字段：**

```
┌─────────────────────────────────┐
│ 礼物名称: [____________]         │
│ 所需积分: [____]                 │
│ 礼物描述: [____________]（可选） │
│ 礼物颜色: [选色器]               │
│                                  │
│ 每周兑换上限: [____]（可选）     │ ← 新增
│ (留空表示无限制)                 │
│                                  │
│ [取消]  [保存]                   │
└─────────────────────────────────┘
```

**输入规则：**

| 规则 | 说明 |
|------|------|
| 类型 | 数字，可选 |
| 默认 | 空（表示无限制） |
| 范围 | 最小值为 1（如果填写） |
| 验证 | 空值或正整数，不允许 0 |

---

## 5. 撤销兑换的影响

### 5.1 状态流转

根据项目现有设计：

| 操作 | 状态变化 | 对本周统计的影响 |
|------|---------|-----------------|
| 孩子发起兑换 | → PENDING | 计入本周统计 |
| 家长确认兑换 | PENDING → CONFIRMED | 无变化，仍计入 |
| 家长撤销兑换 | PENDING → CANCELLED | 自然不再被统计（查询排除 CANCELLED） |

### 5.2 已确认兑换不可撤销

根据项目设计，已确认（CONFIRMED）状态的兑换不可撤销，因此：
- 已确认的兑换始终计入本周统计
- 只有待确认（PENDING）状态可被撤销

---

## 6. 编辑礼物时变更上限

### 6.1 减少上限的情况

**场景：** 周三家长把 weeklyLimit 从 5 改为 2，但孩子本周已兑换 3 次（含 1 次 CONFIRMED + 2 次 PENDING）

**处理方式：**
- 新上限立即生效
- 已兑换次数 > 新上限 → 本周不能再继续兑换
- 已有的兑换记录不受影响：
  - PENDING 状态仍可被家长确认或撤销
  - CONFIRMED 状态保持锁定

### 6.2 增加上限的情况

**场景：** 上限从 2 改为 5，孩子本周已兑换 2 次

**处理方式：**
- 新上限立即生效
- 孩子可继续兑换至新上限

---

## 7. 测试场景

### 7.1 正常场景

| 场景 | 操作 | 预期结果 |
|------|------|---------|
| 无限制礼物 | weeklyLimit 为空 | 正常兑换，不显示计数标记 |
| 有上限且未达 | weeklyLimit=3，已兑1次（含PENDING/CONFIRMED） | 显示"本周可兑 1/3"，允许兑换 |
| 达到上限后 | weeklyLimit=2，已兑2次 | 显示"本周已兑完"，禁用兑换按钮，显示倒计时 |
| 跨周重置 | 周一进入新周期 | 上周计数清零，重新可兑换 |

### 7.2 边界场景

| 场景 | 操作 | 预期结果 |
|------|------|---------|
| 同一天多次兑换同一礼物 | weeklyLimit=3，兑换日当天兑换2次 | 每次都计入，显示累计计数 |
| 多次兑换同一礼物（前一次待确认） | weeklyLimit=2，第一次PENDING，再兑换第二次 | 允许兑换，显示"本周已兑 2/2"，创建第二条PENDING记录 |
| 撤销待确认后重新兑换 | 已兑2次（含1次PENDING），撤销该PENDING → 再兑换 | 撤销后变为1次，再兑换变为2次，显示"本周已兑 2/2" |
| 编辑减少上限 | 上限从5改为2，已兑3次（含CONFIRMED） | 本周不能继续兑换，已有记录不受影响 |

### 7.3 多孩子场景

| 场景 | 操作 | 预期结果 |
|------|------|---------|
| 各孩子独立计算 | 同一礼物weeklyLimit=2，小明兑2次，小红兑1次 | 小明显示"本周已兑完"，小红显示"本周可兑 1/2" |
| 家长查看统计 | 礼物页查看兑换记录 | 显示各孩子独立的兑换次数 |

---

## 8. 实现方案

采用**实时统计方案**，每次查询时直接统计 GiftRedemption 表的记录数。

### 8.1 方案优势

| 优势 | 说明 |
|------|------|
| 实现简单 | 不需要额外的缓存表和同步逻辑 |
| 数据准确 | 直接从兑换记录计算，无缓存不一致问题 |
| 性能足够 | 家庭内数据量小（几个孩子 + 几十条兑换记录），实时计算完全够用 |
| 易于扩展 | 未来需要其他周期限制只需调整查询条件 |

### 8.2 不采用的替代方案

**缓存计数方案**：新增 GiftWeeklyCount 表缓存每周兑换次数

不采用原因：
- 需要维护缓存表，增加复杂度
- 需要处理每周重置逻辑
- 可能出现缓存与实际记录不一致
- 当前数据规模不需要缓存优化

---

## 9. 关联文档

- [[2026-05-21-architecture-design]]：系统架构设计
- [[2026-05-21-parent-app-design]]：家长端应用设计
- [[2026-05-21-child-daily-flow-design]]：孩子端日常使用流程设计
- [[2026-05-21-family-mechanism-design]]：家庭机制设计

---

**文档版本：** v1.0
**创建日期：** 2026-05-21
**讨论参与：** 用户与 Claude Code