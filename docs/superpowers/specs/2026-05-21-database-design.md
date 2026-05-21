# 家庭积分兑换系统 - 数据库设计

## 1. 全局约定

| 约定 | 说明 |
|------|------|
| 时间字段类型 | DateTime（Prisma 默认），前端使用 dayjs 格式化 |
| 时间字段命名 | createdAt、updatedAt（每张表必须包含） |
| 软删除字段 | deletedAt（DateTime?） |
| ID 格式 | CUID（Prisma 默认） |
| 密码存储 | bcrypt 加密，cost factor = 12 |

---

## 2. 完整 Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
}

// 用户模型
model User {
  id             String   @id @default(cuid())
  username       String
  password       String   // bcrypt 加密存储
  role           Role     // PARENT, CHILD
  familyId       String
  family         Family   @relation(fields: [familyId], references: [id])
  timezoneOffset Int?     // 时区偏移量（如 +8 = 8, -5 = -5）
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt
  
  // 孩子特有字段
  currentPoints   Int              @default(0)
  totalPoints     Int              @default(0)
  taskCompletions TaskCompletion[]
  giftRedemptions GiftRedemption[]

  @@unique([familyId, username])  // 家庭内用户名唯一
}

// 家庭模型
model Family {
  id           String        @id @default(cuid())
  members      User[]
  tasks        Task[]
  gifts        Gift[]
  categories   Category[]
  exchangeDays ExchangeDay[]
  createdAt    DateTime      @default(now())
  updatedAt    DateTime      @updatedAt
}

// 类别模型
model Category {
  id        String   @id @default(cuid())
  name      String
  familyId  String
  family    Family   @relation(fields: [familyId], references: [id])
  tasks     Task[]
  order     Int      @default(0)  // 排序顺序
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([familyId, name])  // 家庭内类别名称唯一
}

// 任务模型
model Task {
  id          String          @id @default(cuid())
  name        String
  points      Int
  description String?
  categoryId  String
  category    Category        @relation(fields: [categoryId], references: [id])
  familyId    String
  family      Family          @relation(fields: [familyId], references: [id])
  completions TaskCompletion[]
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
  deletedAt   DateTime?       // 软删除
}

// 任务完成记录
model TaskCompletion {
  id          String   @id @default(cuid())
  taskId      String
  task        Task     @relation(fields: [taskId], references: [id])
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  points      Int      // 完成时获得的积分（快照）
  completedAt DateTime @default(now())
  revokedAt   DateTime? // 撤销时间
  revokedBy   String?  // 撤销操作人 ID
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

// 礼物模型
model Gift {
  id           String           @id @default(cuid())
  name         String
  points       Int
  description  String?
  familyId     String
  family       Family           @relation(fields: [familyId], references: [id])
  redemptions  GiftRedemption[]
  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt
  deletedAt    DateTime?        // 软删除
}

// 礼物兑换记录
model GiftRedemption {
  id          String            @id @default(cuid())
  giftId      String
  gift        Gift              @relation(fields: [giftId], references: [id])
  userId      String
  user        User              @relation(fields: [userId], references: [id])
  points      Int               // 兑换时消耗的积分（快照）
  status      RedemptionStatus  @default(PENDING)
  redeemedAt  DateTime          @default(now())
  confirmedAt DateTime?         // 家长确认时间
  confirmedBy String?           // 确认操作人 ID
  cancelledAt DateTime?         // 撤销时间
  cancelledBy String?           // 撤销操作人 ID
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
}

// 兑换日设置
model ExchangeDay {
  id        String   @id @default(cuid())
  familyId  String
  family    Family   @relation(fields: [familyId], references: [id])
  dayOfWeek Int      // 0=周日, 1=周一, ..., 6=周六
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@unique([familyId, dayOfWeek])  // 防止同一家庭重复设置同一天
}

// 角色枚举
enum Role {
  PARENT
  CHILD
}

// 兑换状态枚举
enum RedemptionStatus {
  PENDING    // 待确认
  CONFIRMED  // 已确认
  CANCELLED  // 已撤销
}
```

---

## 3. 表结构说明

### 3.1 表概览

| 表名 | 用途 | 软删除 | 时间字段 |
|------|------|--------|----------|
| User | 用户（家长/孩子） | 无 | createdAt, updatedAt |
| Family | 家庭 | 无 | createdAt, updatedAt |
| Category | 任务类别 | 无 | createdAt, updatedAt |
| Task | 任务 | 有 | createdAt, updatedAt |
| TaskCompletion | 任务完成记录 | 无（撤销标记） | createdAt, updatedAt |
| Gift | 礼物 | 有 | createdAt, updatedAt |
| GiftRedemption | 礼物兑换记录 | 无（状态标记） | createdAt, updatedAt |
| ExchangeDay | 兑换日设置 | 无 | createdAt, updatedAt |

### 3.2 索引说明

| 约束类型 | 表 | 字段 | 说明 |
|----------|-----|------|------|
| 主键 | 全部表 | id | CUID 格式 |
| 家庭内唯一 | User | familyId + username | 用户名家庭内唯一 |
| 家庭内唯一 | Category | familyId + name | 类别名称家庭内唯一 |
| 家庭内唯一 | ExchangeDay | familyId + dayOfWeek | 兑换日不重复 |
| 外键索引 | 全部关联字段 | — | Prisma 自动创建 |

---

## 4. 字段设计要点

### 4.1 时间字段处理

| 场景 | 说明 |
|------|------|
| 存储 | DateTime 类型，Prisma 自动处理 ISO 字符串格式 |
| 默认值 | createdAt 使用 @default(now())，updatedAt 使用 @updatedAt |
| 格式化 | 前端使用 dayjs，如 dayjs(date).format('YYYY/MM/DD') |

### 4.2 积分快照字段

| 表 | 字段 | 用途 |
|-----|------|------|
| TaskCompletion | points | 记录完成时的积分值，不受后续修改影响 |
| GiftRedemption | points | 记录兑换时的积分值，不受后续修改影响 |

### 4.3 撤销相关字段命名区分

| 场景 | 字段命名 | 语义 |
|------|----------|------|
| 撤销任务完成 | revokedAt / revokedBy | "撤销赋予的积分许可" |
| 撤销礼物兑换 | cancelledAt / cancelledBy | "取消兑换请求/交易" |

### 4.4 外键设计说明

| 字段 | 是否有外键约束 | 原因 |
|------|----------------|------|
| revokedBy | 无 | User 可能被删除，保留历史记录 |
| confirmedBy | 无 | User 可能被删除，保留历史记录 |
| cancelledBy | 无 | User 可能被删除，保留历史记录 |

---

## 5. API 层校验逻辑清单

以下校验无法通过数据库约束实现，需在 API 层处理：

| 校验项 | 说明 |
|--------|------|
| 用户名格式 | 2-20 字符，仅允许中文、英文、数字 |
| 密码格式 | 6-32 位 |
| 同一任务每天只能完成一次 | 查询当天是否有完成记录 |
| 禁止删除有任务的类别 | 检查类别下是否有任务 |
| 礼物名称唯一（排除软删除） | 查询 deletedAt 为 null 的礼物 |
| 撤销完成记录时间范围 | 本周内（周一至周日） |
| 撤销完成记录积分不足处理 | 自动撤销待确认兑换记录 |
| 兑换日验证 | 使用用户时区判断当前是否为兑换日 |

---

## 6. 前端展示策略

| 数据 | 孩子端 | 家长端 |
|------|--------|--------|
| 任务完成记录 | 只看未撤销的 | 全部（含已撤销） |
| 礼物兑换记录 | PENDING / CONFIRMED | 全部（含 CANCELLED） |
| 任务列表 | 排除已删除的 | 排除已删除的 |
| 礼物列表 | 排除已删除的 | 排除已删除的 |

---

**文档版本：** v1.0
**创建日期：** 2026-05-21
**更新日期：** 2026-05-21
**讨论参与：** 用户与 Claude Code
**关联文档：** [[2026-05-21-tech-stack-design]]、[[2026-05-21-family-mechanism-design]]