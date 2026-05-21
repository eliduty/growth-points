# 家庭积分兑换系统 - 技术方案设计

## 1. 技术决策总览

### 1.1 已确认决策

| 项目 | 决策 | 说明 |
|------|------|------|
| 整体架构 | 单体应用双入口 | 一个 Nuxt 应用，共享后端和数据层 |
| 数据库 | SQLite (libsql) | 与现有项目一致，适合家庭场景 |
| 认证方案 | Session-based | Nuxt 内置 session 管理 |
| 密码加密 | bcrypt | cost factor = 12 |
| 前端状态管理 | useFetch + useState | 无全局状态管理库 |
| 表单验证 | 内置简单验证 | HTML5 + 手写验证函数 |
| 时区处理 | 前端传递偏移量 | 用户登录时携带浏览器时区 |
| 安全措施 | 多层防护 | bcrypt + XSS + CSRF + 路径保护 |

### 1.2 待办决策

| 项目 | 状态 | 说明 |
|------|------|------|
| UI 组件方案 | ⏳ 待办 | 等待 UI 规范设计完成后确认 |
| 组件分层架构 | ⏳ 待办 | 等待 UI 规范设计完成后确认 |
| 核心共享组件规范 | ⏳ 待办 | 等待 UI 规范设计完成后确认 |
| 组件交互一致性规范 | ⏳ 待办 | 等待 UI 规范设计完成后确认 |
| 设计系统变量 | ⏳ 待办 | 等待 UI 规范设计完成后确认 |

---

## 2. 整体架构

### 2.1 单体应用双入口

采用「单体应用双入口」方案，一个 Nuxt 应用，共享后端和数据层：

| 方案特点 | 说明 |
|---------|------|
| 单一项目 | 一个 Nuxt 应用，共享后端和数据层 |
| 双入口路由 | `/parent/*` 和 `/child/*` 两套独立页面路由 |
| 共享数据模型 | Prisma schema 共用，无需同步多项目 |
| 登录跳转 | 登录后根据用户角色自动跳转到对应入口 |
| 部署简单 | 一套部署流程，维护成本低 |

### 2.2 目录结构

```
apps/nuxt-app/
├── app/
│   ├── pages/               # 页面路由
│   │   ├── parent/          # 家长端页面
│   │   │   ├── index.vue    # 统计页（首页）
│   │   │   ├── tasks.vue    # 任务管理页
│   │   │   ├── gifts.vue    # 礼物管理页
│   │   │   └── settings.vue # 设置页
│   │   ├── child/           # 孩子端页面
│   │   │   ├── index.vue    # 任务页（首页）
│   │   │   ├── gifts.vue    # 礼物页
│   │   │   └── profile.vue  # 个人中心页
│   │   ├── login.vue        # 登录页
│   │   └── register.vue     # 注册页（家长）
│   ├── components/          # ⏳ 待办 — 等待 UI 规范确认后细化
│   ├── layouts/             # ⏳ 待办 — 等待 UI 规范确认后细化
│   └── composables/         # 共享逻辑
├── server/
│   ├── api/                 # REST API
│   ├── utils/               # 服务端工具函数
│   └── middleware/          # 认证中间件
├── prisma/
│   └── schema.prisma        # 数据模型
└── utils/                   # 共享类型定义
```

---

## 3. 数据模型设计

### 3.1 Prisma Schema

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
}

// 用户模型
model User {
  id           String   @id @default(cuid())
  username     String   @unique
  password     String   // bcrypt 加密存储
  role         Role     // PARENT, CHILD
  familyId     String
  family       Family   @relation(fields: [familyId], references: [id])
  timezoneOffset Int?   // 时区偏移量（如 +8 = 8, -5 = -5）
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  // 孩子特有字段
  currentPoints   Int     @default(0)
  totalPoints     Int     @default(0)
  taskCompletions TaskCompletion[]
  giftRedemptions GiftRedemption[]
}

// 家庭模型
model Family {
  id           String   @id @default(cuid())
  members      User[]
  tasks        Task[]
  gifts        Gift[]
  categories   Category[]
  exchangeDays ExchangeDay[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

// 任务模型
model Task {
  id          String     @id @default(cuid())
  name        String
  points      Int
  description String?
  categoryId  String
  category    Category   @relation(fields: [categoryId], references: [id])
  familyId    String
  family      Family     @relation(fields: [familyId], references: [id])
  completions TaskCompletion[]
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}

// 类别模型
model Category {
  id       String   @id @default(cuid())
  name     String
  familyId String
  family   Family   @relation(fields: [familyId], references: [id])
  tasks    Task[]
  order    Int      @default(0)  // 排序
}

// 礼物模型
model Gift {
  id           String          @id @default(cuid())
  name         String
  points       Int
  color        String          // 预设颜色池随机分配
  familyId     String
  family       Family          @relation(fields: [familyId], references: [id])
  redemptions  GiftRedemption[]
  createdAt    DateTime        @default(now())
  updatedAt    DateTime        @updatedAt
}

// 任务完成记录
model TaskCompletion {
  id        String   @id @default(cuid())
  taskId    String
  task      Task     @relation(fields: [taskId], references: [id])
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  points    Int      // 完成时获得的积分（记录快照）
  completedAt DateTime @default(now())
  revokedAt  DateTime? // 撤销时间
  revokedBy  String?  // 撤销操作人 ID
}

// 礼物兑换记录
model GiftRedemption {
  id          String     @id @default(cuid())
  giftId      String
  gift        Gift       @relation(fields: [giftId], references: [id])
  userId      String
  user        User       @relation(fields: [userId], references: [id])
  points      Int        // 兑换时消耗的积分（记录快照）
  status      RedemptionStatus @default(PENDING)
  redeemedAt  DateTime   @default(now())
  confirmedAt DateTime?  // 家长确认时间
  confirmedBy String?    // 确认操作人 ID
  cancelledAt DateTime?  // 撤销时间
  cancelledBy String?    // 撤销操作人 ID
}

// 兑换日设置
model ExchangeDay {
  id       String   @id @default(cuid())
  familyId String
  family   Family   @relation(fields: [familyId], references: [id])
  dayOfWeek Int     // 0=周日, 1=周一, ..., 6=周六
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

### 3.2 设计要点

| 要点 | 说明 |
|------|------|
| 密码存储 | bcrypt 加密，cost factor = 12 |
| 时区支持 | 每个用户存储时区偏移量 |
| 积分快照 | TaskCompletion.points 和 GiftRedemption.points 记录快照值，避免历史数据受修改影响 |
| 兑换日存储 | 使用 ExchangeDay 表多记录方式，支持任意日期组合 |
| 撤销记录 | revokedAt/revokedBy 字段记录撤销操作，而非删除记录 |

---

## 4. 认证方案

### 4.1 Session-based 认证

使用 Nuxt 内置的 session 管理：

```typescript
// server/middleware/auth.ts
export default defineEventHandler(async (event) => {
  const session = await getUserSession(event)
  
  if (!session?.userId) {
    throw createError({
      statusCode: 401,
      message: '未登录'
    })
  }
  
  event.context.user = await prisma.user.findUnique({
    where: { id: session.userId }
  })
})
```

### 4.2 登录流程

```
用户提交用户名 + 密码 + 时区偏移量
→ 服务端验证密码（bcrypt.compare）
→ 创建 session，存储 userId
→ 根据角色跳转：家长 → /parent，孩子 → /child
```

### 4.3 注册流程（家长）

```
用户提交用户名 + 密码
→ 服务端创建用户（bcrypt.hash 加密密码，role = PARENT）
→ 自动创建家庭
→ 创建 session
→ 跳转到 /parent
```

### 4.4 孩子账号创建

```
家长提交孩子用户名 + 密码
→ 服务端创建用户（bcrypt.hash，role = CHILD，绑定当前家庭）
→ 孩子账号立即可用
```

---

## 5. 时区处理

### 5.1 方案：前端传递时区偏移量

```typescript
// 前端登录时获取时区偏移量
const timezoneOffset = -new Date().getTimezoneOffset() / 60 // 如 +8

// 登录请求携带时区
await $fetch('/api/login', {
  body: { username, password, timezoneOffset }
})
```

### 5.2 服务端时间计算

```typescript
// 计算用户本地时间的"本周"边界（返回 UTC 时间）
function getWeekBounds(userTimezoneOffset: number): { start: Date, end: Date } {
  const now = new Date()
  // 根据用户时区偏移量计算本周起止时间
  // ...
}

// 判断某时刻在用户本地时间是否为兑换日
function isExchangeDay(date: Date, userTimezoneOffset: number, exchangeDays: number[]): boolean {
  const localDayOfWeek = getLocalDayOfWeek(date, userTimezoneOffset)
  return exchangeDays.includes(localDayOfWeek)
}
```

---

## 6. API 结构

### 6.1 路由组织

```
server/api/
├── auth/
│   ├── login.post.ts        # 登录
│   ├── register.post.ts     # 注册（家长）
│   └── logout.post.ts       # 退出登录
├── parent/
│   ├── index.ts             # 获取本周统计
│   ├── tasks/
│   │   ├── index.ts         # 任务列表
│   │   ├── create.post.ts   # 创建任务
│   │   └── [id].delete.ts   # 删除任务
│   ├── categories/
│   │   ├── index.ts         # 类别列表
│   │   ├── create.post.ts   # 创建类别
│   │   ├── [id].delete.ts   # 删除类别
│   ├── gifts/
│   │   ├── index.ts         # 礼物列表
│   │   ├── create.post.ts   # 创建礼物
│   │   └── [id].delete.ts   # 删除礼物
│   ├── redemptions/
│   │   ├── index.ts         # 待确认兑换列表
│   │   ├── [id]/confirm.post.ts  # 确认兑换
│   │   ├── [id]/cancel.post.ts   # 撤销兑换
│   ├── completions/
│   │   ├── [id]/revoke.post.ts   # 撤销完成记录
│   ├── members/
│   │   ├── index.ts         # 成员列表
│   │   ├── child.post.ts    # 添加孩子
│   │   ├── parent.post.ts   # 添加家长
│   │   ├── [id].delete.ts   # 删除成员
│   └── exchange-days/
│   │   ├── index.ts         # 获取兑换日设置
│   │   ├── update.post.ts   # 更新兑换日设置
├── child/
│   ├── index.ts             # 获取积分概览 + 任务列表
│   ├── tasks/
│   │   ├── index.ts         # 任务列表
│   │   ├── [id]/complete.post.ts  # 完成任务
│   ├── gifts/
│   │   ├── index.ts         # 礼物列表 + 兑换日状态
│   │   ├── [id]/redeem.post.ts    # 兑换礼物
│   └── history/
│   │   ├── tasks.ts         # 任务历史
│   │   ├── gifts.ts         # 礼物历史
└── user/
│   └── me.ts                # 获取当前用户信息
```

---

## 7. 前端状态管理

### 7.1 数据获取策略

| 场景 | 方案 |
|------|------|
| 页面级数据 | useFetch / useAsyncData |
| 临时状态 | useState |
| 操作后刷新 | refresh() 手动刷新 |

### 7.2 示例

```typescript
// 孩子端任务页
const { data: tasks, refresh } = await useFetch('/api/child/tasks')

// 完成任务后刷新
async function completeTask(taskId: string) {
  await $fetch(`/api/child/tasks/${taskId}/complete`, { method: 'POST' })
  await refresh()
}
```

---

## 8. 表单验证

### 8.1 方案：内置简单验证

| 验证类型 | 实现方式 |
|----------|----------|
| 必填字段 | HTML5 required 属性 |
| 格式验证 | 手写验证函数 |
| 错误提示 | 组件内部状态管理 |

### 8.2 示例

```vue
<script setup lang="ts">
const form = reactive({
  username: '',
  password: ''
})
const errors = reactive({
  username: '',
  password: ''
})

function validate() {
  errors.username = form.username.length < 2 ? '用户名至少2个字符' : ''
  errors.password = form.password.length < 6 ? '密码至少6个字符' : ''
  return !errors.username && !errors.password
}

async function submit() {
  if (!validate()) return
  // 提交...
}
</script>
```

---

## 9. 安全措施

| 安全点 | 处理方式 |
|--------|----------|
| 密码存储 | bcrypt 加密，cost factor = 12 |
| XSS 防护 | Vue 自动转义 + 用户输入过滤 |
| CSRF | Nuxt session 内置 CSRF 保护 |
| 路径保护 | 路由中间件检查角色和登录状态 |
| API 保护 | 服务端中间件验证 session |

---

## 10. 待办事项

以下内容等待 UI 规范设计完成后确认：

- [ ] UI 组件方案
- [ ] 组件分层架构
- [ ] 核心共享组件规范（AppButton、AppModal、AppConfirm 等）
- [ ] 组件交互一致性规范
- [ ] 设计系统变量（颜色、字号、间距等）
- [ ] 布局组件设计
- [ ] 反馈组件设计（Toast、Loading 等）

---

**文档版本：** v1.0
**创建日期：** 2026-05-21
**更新日期：** 2026-05-21
**讨论参与：** 用户与 Claude Code
**关联文档：** [[2026-05-21-family-mechanism-design]]、[[2026-05-21-parent-app-design]]、[[2026-05-21-child-daily-flow-design]]