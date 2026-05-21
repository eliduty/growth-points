# 家庭积分兑换系统 - API 接口设计

## 1. 全局约定

### 1.1 响应格式

```typescript
interface ApiResponse<T> {
  code: number      // 0 成功，其它失败
  data: T           // 成功时返回数据
  message: string   // 提示信息
}
```

### 1.2 认证方式

- Session-based 认证
- 登录后 Session 存储用户 ID 和角色
- 需认证的接口通过中间件检查 Session

### 1.3 路径前缀

| 前缀 | 用途 | 认证要求 |
|------|------|---------|
| `/api/auth` | 认证相关 | 无认证（登录/注册）或需认证（登出/me） |
| `/api/parent` | 家长端操作 | 需认证 + 角色 PARENT |
| `/api/child` | 孩子端操作 | 需认证 + 角色 CHILD |

### 1.4 时间格式

- 请求参数：ISO 8601 字符串或时间戳（按接口定义）
- 响应数据：ISO 8601 字符串，前端用 dayjs 格式化

### 1.5 错误码定义

| 错误码 | 含义 | 使用场景 |
|--------|------|---------|
| 0 | 成功 | 所有成功响应 |
| 1001 | 用户名已存在 | 注册、添加成员 |
| 1002 | 用户名格式错误 | 注册、添加成员 |
| 1003 | 密码格式错误 | 注册、添加成员 |
| 1004 | 用户名或密码错误 | 登录 |
| 2001 | 积分不足 | 兑换礼物、撤销完成记录 |
| 2002 | 今日已完成该任务 | 完成任务 |
| 2003 | 非兑换日 | 兑换礼物 |
| 2004 | 本周兑换已达上限 | 兑换礼物 |
| 2005 | 只能撤销本周记录 | 撤销完成记录 |
| 2006 | 只能撤销待确认状态 | 撤销兑换记录 |
| 3001 | 类别下存在任务 | 删除类别 |
| 3002 | 礼物名称已存在 | 创建/编辑礼物 |
| 3003 | 最后一个家长不可删除 | 删除成员 |
| 4001 | 未登录 | 需认证接口 |
| 4002 | 无权限 | 跨角色访问 |
| 4003 | 资源不存在 | 访问不存在的 ID |
| 5001 | 网络异常 | 服务端异常 |

---

## 2. 认证 API

### 2.1 家长注册

**接口：** `POST /api/auth/register`

**请求体：**
```typescript
{
  username: string   // 2-20字符，仅中文、英文、数字
  password: string   // 6-32位
}
```

**响应：**
```typescript
{
  code: 0,
  data: {
    id: string
    username: string
    role: 'PARENT'
    familyId: string
  },
  message: '注册成功'
}
```

**业务逻辑：**
1. 验证用户名格式
2. 验证密码格式
3. 检查用户名是否已存在（全局唯一）
4. bcrypt 加密密码
5. 创建新家庭
6. 创建用户（角色 PARENT，绑定家庭）
7. 创建 Session
8. 返回用户信息

---

### 2.2 登录

**接口：** `POST /api/auth/login`

**请求体：**
```typescript
{
  username: string
  password: string
  timezoneOffset: number   // 用户时区偏移量，如 +8 = 8, -5 = -5
}
```

**响应：**
```typescript
{
  code: 0,
  data: {
    id: string
    username: string
    role: 'PARENT' | 'CHILD'
    familyId: string
  },
  message: '登录成功'
}
```

**业务逻辑：**
1. 查询用户
2. 验证密码（bcrypt）
3. 创建 Session（存储 userId, role, familyId）
4. 更新用户 timezoneOffset（孩子特有，家长可选）
5. 返回用户信息

---

### 2.3 登出

**接口：** `POST /api/auth/logout`

**认证：** 需认证

**响应：**
```typescript
{
  code: 0,
  data: null,
  message: '已退出登录'
}
```

**业务逻辑：**
1. 清除 Session
2. 返回成功

---

### 2.4 获取当前用户信息

**接口：** `GET /api/auth/me`

**认证：** 需认证

**响应：**
```typescript
{
  code: 0,
  data: {
    id: string
    username: string
    role: 'PARENT' | 'CHILD'
    familyId: string
    timezoneOffset: number | null
    // 孩子特有字段
    currentPoints?: number
    totalPoints?: number
  },
  message: '获取成功'
}
```

**业务逻辑：**
1. 从 Session 获取 userId
2. 查询用户信息
3. 如果是孩子，返回积分信息

---

## 3. 家长端 API

### 3.1 统计页

#### 3.1.1 获取本周统计

**接口：** `GET /api/parent/stats`

**认证：** 需认证 + PARENT

**请求参数：**
```
?weekStart=2026-05-19   // 可选，指定周的起始日期（周一），默认本周
```

**响应：**
```typescript
{
  code: 0,
  data: {
    weekRange: {
      start: string    // ISO 8601，周一 00:00:00
      end: string      // ISO 8601，周日 23:59:59
    }
    children: [
      {
        id: string
        username: string
        currentPoints: number
        totalPoints: number
        weeklyCompleted: number    // 本周完成任务数
        weeklyPoints: number       // 本周获得积分
        completions: [
          {
            id: string
            taskName: string
            points: number
            completedAt: string     // ISO 8601
            revokedAt: string | null   // 撤销时间（如有）
          }
        ]
      }
    ]
  },
  message: '获取成功'
}
```

**业务逻辑：**
1. 从 Session 获取 familyId
2. 计算本周起始时间（周一 00:00:00）
3. 查询家庭内所有孩子
4. 查询每个孩子本周的完成记录（含已撤销）
5. 统计每个孩子本周完成任务数和获得积分
6. 返回统计数据

---

#### 3.1.2 撤销完成记录

**接口：** `DELETE /api/parent/completions/:id`

**认证：** 需认证 + PARENT

**路径参数：**
- `id`: 完成记录 ID

**响应：**
```typescript
{
  code: 0,
  data: {
    pointsRevoked: number        // 扣回的积分
    redemptionsCancelled: number // 关联撤销的兑换记录数（如有）
  },
  message: '已撤销'
}
```

**业务逻辑：**
1. 查询完成记录，验证存在且属于本家庭
2. 检查是否已撤销
3. 检查是否本周内（周一至周日）
4. 查询用户当前积分
5. 如果积分足够扣回：
   - 扣减用户积分
   - 标记完成记录为已撤销（revokedAt, revokedBy）
6. 如果积分不足：
   - 查询用户待确认兑换记录（按时间升序）
   - 撤销足够的待确认兑换记录以返还积分
   - 扣减用户积分
   - 标记完成记录为已撤销
7. 返回扣回积分和关联撤销数

---

### 3.2 任务管理

#### 3.2.1 获取任务列表

**接口：** `GET /api/parent/tasks`

**认证：** 需认证 + PARENT

**响应：**
```typescript
{
  code: 0,
  data: {
    categories: [
      {
        id: string
        name: string
        order: number
        tasks: [
          {
            id: string
            name: string
            points: number
            description: string | null
          }
        ]
      }
    ]
  },
  message: '获取成功'
}
```

**业务逻辑：**
1. 从 Session 获取 familyId
2. 查询家庭所有类别（按 order 排序）
3. 查询每个类别下的任务（排除已删除 deletedAt != null）
4. 返回分类后的任务列表

---

#### 3.2.2 创建任务

**接口：** `POST /api/parent/tasks`

**认证：** 需认证 + PARENT

**请求体：**
```typescript
{
  name: string         // 任务名称
  points: number       // 积分值
  categoryId: string   // 类别 ID
  description?: string // 任务描述（可选）
}
```

**响应：**
```typescript
{
  code: 0,
  data: {
    id: string
    name: string
    points: number
    description: string | null
    categoryId: string
  },
  message: '创建成功'
}
```

**业务逻辑：**
1. 验证 categoryId 属于本家庭
2. 创建任务记录
3. 返回任务信息

---

#### 3.2.3 编辑任务

**接口：** `PUT /api/parent/tasks/:id`

**认证：** 需认证 + PARENT

**路径参数：**
- `id`: 任务 ID

**请求体：**
```typescript
{
  name?: string
  points?: number
  categoryId?: string
  description?: string
}
```

**响应：**
```typescript
{
  code: 0,
  data: {
    id: string
    name: string
    points: number
    description: string | null
    categoryId: string
  },
  message: '更新成功'
}
```

**业务逻辑：**
1. 验证任务存在且属于本家庭
2. 如果修改 categoryId，验证新类别属于本家庭
3. 更新任务信息
4. 返回更新后的任务信息

---

#### 3.2.4 删除任务

**接口：** `DELETE /api/parent/tasks/:id`

**认证：** 需认证 + PARENT

**路径参数：**
- `id`: 任务 ID

**响应：**
```typescript
{
  code: 0,
  data: null,
  message: '删除成功'
}
```

**业务逻辑：**
1. 验证任务存在且属于本家庭
2. 设置 deletedAt 为当前时间（软删除）
3. 返回成功

---

### 3.3 类别管理

#### 3.3.1 获取类别列表

**接口：** `GET /api/parent/categories`

**认证：** 需认证 + PARENT

**响应：**
```typescript
{
  code: 0,
  data: [
    {
      id: string
      name: string
      order: number
      taskCount: number   // 类别下任务数（排除已删除）
    }
  ],
  message: '获取成功'
}
```

**业务逻辑：**
1. 从 Session 获取 familyId
2. 查询家庭所有类别（按 order 排序）
3. 统计每个类别下的任务数
4. 返回类别列表

---

#### 3.3.2 创建类别

**接口：** `POST /api/parent/categories`

**认证：** 需认证 + PARENT

**请求体：**
```typescript
{
  name: string   // 类别名称
}
```

**响应：**
```typescript
{
  code: 0,
  data: {
    id: string
    name: string
    order: number   // 自动设置为当前最大 order + 1
  },
  message: '创建成功'
}
```

**业务逻辑：**
1. 验证类别名称在家庭内唯一
2. 查询当前最大 order
3. 创建类别（order = max + 1）
4. 返回类别信息

---

#### 3.3.3 删除类别

**接口：** `DELETE /api/parent/categories/:id`

**认证：** 需认证 + PARENT

**路径参数：**
- `id`: 类别 ID

**响应：**
```typescript
{
  code: 0,
  data: null,
  message: '删除成功'
}
```

**业务逻辑：**
1. 验证类别存在且属于本家庭
2. 检查类别下是否有任务（排除已删除）
3. 如果有任务，返回错误 3001
4. 删除类别
5. 返回成功

---

#### 3.3.4 调整类别顺序

**接口：** `PUT /api/parent/categories/order`

**认证：** 需认证 + PARENT

**请求体：**
```typescript
{
  orders: [
    {
      id: string
      order: number
    }
  ]
}
```

**响应：**
```typescript
{
  code: 0,
  data: null,
  message: '更新成功'
}
```

**业务逻辑：**
1. 验证所有类别 ID 属于本家庭
2. 更新所有类别的 order 字段
3. 返回成功

---

### 3.4 礼物管理

#### 3.4.1 获取礼物列表

**接口：** `GET /api/parent/gifts`

**认证：** 需认证 + PARENT

**响应：**
```typescript
{
  code: 0,
  data: [
    {
      id: string
      name: string
      points: number
      description: string | null
      color: string | null
      weeklyLimit: number | null
    }
  ],
  message: '获取成功'
}
```

**业务逻辑：**
1. 从 Session 获取 familyId
2. 查询家庭所有礼物（排除已删除）
3. 返回礼物列表

---

#### 3.4.2 创建礼物

**接口：** `POST /api/parent/gifts`

**认证：** 需认证 + PARENT

**请求体：**
```typescript
{
  name: string
  points: number
  description?: string
  color?: string        // 可选，不传则随机分配
  weeklyLimit?: number  // 可选，null 或 >= 1
}
```

**响应：**
```typescript
{
  code: 0,
  data: {
    id: string
    name: string
    points: number
    description: string | null
    color: string       // 返回分配的颜色
    weeklyLimit: number | null
  },
  message: '创建成功'
}
```

**业务逻辑：**
1. 验证礼物名称在家庭内唯一（排除已删除）
2. 如果未传 color，从预设颜色池随机分配
3. 如果传了 weeklyLimit，验证 >= 1
4. 创建礼物
5. 返回礼物信息

---

#### 3.4.3 编辑礼物

**接口：** `PUT /api/parent/gifts/:id`

**认证：** 需认证 + PARENT

**路径参数：**
- `id`: 礼物 ID

**请求体：**
```typescript
{
  name?: string
  points?: number
  description?: string
  color?: string
  weeklyLimit?: number
}
```

**响应：**
```typescript
{
  code: 0,
  data: {
    id: string
    name: string
    points: number
    description: string | null
    color: string | null
    weeklyLimit: number | null
  },
  message: '更新成功'
}
```

**业务逻辑：**
1. 验证礼物存在且属于本家庭
2. 如果修改 name，验证唯一性（排除已删除和其他礼物）
3. 如果修改 weeklyLimit，验证 >= 1 或为 null
4. 更新礼物信息
5. 返回更新后的礼物信息

---

#### 3.4.4 删除礼物

**接口：** `DELETE /api/parent/gifts/:id`

**认证：** 需认证 + PARENT

**路径参数：**
- `id`: 礼物 ID

**响应：**
```typescript
{
  code: 0,
  data: null,
  message: '删除成功'
}
```

**业务逻辑：**
1. 验证礼物存在且属于本家庭
2. 设置 deletedAt 为当前时间（软删除）
3. 返回成功

---

### 3.5 兑换记录管理

#### 3.5.1 获取兑换记录

**接口：** `GET /api/parent/gifts/redemptions`

**认证：** 需认证 + PARENT

**响应：**
```typescript
{
  code: 0,
  data: {
    pending: [
      {
        id: string
        giftName: string
        giftColor: string | null
        points: number
        userId: string
        username: string
        redeemedAt: string    // ISO 8601
      }
    ],
    confirmed: [
      {
        id: string
        giftName: string
        giftColor: string | null
        points: number
        userId: string
        username: string
        redeemedAt: string    // ISO 8601
        confirmedAt: string   // ISO 8601
      }
    ]
  },
  message: '获取成功'
}
```

**业务逻辑：**
1. 从 Session 获取 familyId
2. 查询所有待确认（PENDING）状态的兑换记录
3. 查询本周已确认（CONFIRMED）状态的兑换记录
4. 关联查询礼物和用户信息
5. 返回两个数组

---

#### 3.5.2 确认兑换

**接口：** `PUT /api/parent/gifts/redemptions/:id/confirm`

**认证：** 需认证 + PARENT

**路径参数：**
- `id`: 兑换记录 ID

**响应：**
```typescript
{
  code: 0,
  data: null,
  message: '兑换已确认'
}
```

**业务逻辑：**
1. 验证兑换记录存在且属于本家庭
2. 验证状态为 PENDING
3. 更新状态为 CONFIRMED，设置 confirmedAt, confirmedBy
4. 返回成功

---

#### 3.5.3 撤销兑换

**接口：** `PUT /api/parent/gifts/redemptions/:id/cancel`

**认证：** 需认证 + PARENT

**路径参数：**
- `id`: 兑换记录 ID

**响应：**
```typescript
{
  code: 0,
  data: {
    giftName: string        // 礼物名称
    username: string        // 孩子名称
    pointsReturned: number  // 返还的积分
  },
  message: '兑换已撤销'
}
```

**业务逻辑：**
1. 验证兑换记录存在且属于本家庭
2. 验证状态为 PENDING（已确认不可撤销）
3. 返还积分给用户
4. 更新状态为 CANCELLED，设置 cancelledAt, cancelledBy
5. 返回返还积分

---

### 3.6 成员管理

#### 3.6.1 获取成员列表

**接口：** `GET /api/parent/members`

**认证：** 需认证 + PARENT

**响应：**
```typescript
{
  code: 0,
  data: {
    children: [
      {
        id: string
        username: string
        currentPoints: number
        totalPoints: number
      }
    ],
    parents: [
      {
        id: string
        username: string
        isMe: boolean   // 是否是当前用户
      }
    ]
  },
  message: '获取成功'
}
```

**业务逻辑：**
1. 从 Session 获取 familyId 和当前 userId
2. 查询家庭内所有成员
3. 按角色分组
4. 标记当前用户
5. 返回成员列表

---

#### 3.6.2 添加成员

**接口：** `POST /api/parent/members`

**认证：** 需认证 + PARENT

**请求体：**
```typescript
{
  username: string
  password: string
  role: 'PARENT' | 'CHILD'   // 添加孩子或家长
}
```

**响应：**
```typescript
{
  code: 0,
  data: {
    id: string
    username: string
    role: string
    familyId: string
  },
  message: '添加成功'
}
```

**业务逻辑：**
1. 验证用户名格式
2. 验证密码格式
3. 检查用户名是否已存在（全局唯一）
4. bcrypt 加密密码
5. 创建用户，绑定到当前家庭
6. 如果是孩子，初始化积分为 0
7. 返回用户信息

---

#### 3.6.3 删除成员

**接口：** `DELETE /api/parent/members/:id`

**认证：** 需认证 + PARENT

**路径参数：**
- `id`: 用户 ID

**响应：**
```typescript
{
  code: 0,
  data: null,
  message: '删除成功'
}
```

**业务逻辑：**
1. 验证用户存在且属于本家庭
2. 不能删除自己（Session userId != 目标 userId）
3. 如果删除家长，检查是否是最后一个家长
4. 如果是孩子，删除其所有数据（完成记录、兑换记录）
5. 删除用户
6. 返回成功

---

### 3.7 兑换日设置

#### 3.7.1 获取兑换日设置

**接口：** `GET /api/parent/exchange-days`

**认证：** 需认证 + PARENT

**响应：**
```typescript
{
  code: 0,
  data: number[]   // 兑换日数组，如 [1, 3] 表示周一、周三，空数组表示未设置
  message: '获取成功'
}
```

**业务逻辑：**
1. 从 Session 获取 familyId
2. 查询 ExchangeDay 表，返回 dayOfWeek 数组
3. 如果无记录，返回空数组

---

#### 3.7.2 更新兑换日设置

**接口：** `PUT /api/parent/exchange-days`

**认证：** 需认证 + PARENT

**请求体：**
```typescript
{
  days: number[]   // 兑换日数组，0-6，如 [1, 3, 6]，允许空数组
}
```

**响应：**
```typescript
{
  code: 0,
  data: number[],
  message: '更新成功'
}
```

**业务逻辑：**
1. 从 Session 获取 familyId
2. 删除家庭现有的所有 ExchangeDay 记录
3. 为传入的每个 day 创建新的 ExchangeDay 记录
4. 返回新的兑换日数组

---

## 4. 孩子端 API

### 4.1 任务页

#### 4.1.1 获取任务列表

**接口：** `GET /api/child/tasks`

**认证：** 需认证 + CHILD

**请求参数：**
```
?date=2026-05-21   // 可选，指定日期，默认今天（根据 timezoneOffset）
```

**响应：**
```typescript
{
  code: 0,
  data: {
    pointsOverview: {
      current: number
      total: number
      weekly: number    // 本周获得积分
    },
    categories: [
      {
        id: string
        name: string
        order: number
        tasks: [
          {
            id: string
            name: string
            points: number
            description: string | null
            completed: boolean      // 今天是否已完成
            completedAt?: string    // 完成时间（如已完成）
          }
        ]
      }
    ],
    completedTasks: [
      {
        id: string
        taskName: string
        points: number
        completedAt: string
      }
    ]
  },
  message: '获取成功'
}
```

**业务逻辑：**
1. 从 Session 获取 userId, familyId, timezoneOffset
2. 查询用户积分信息
3. 计算本周起始时间
4. 统计本周获得积分
5. 计算指定日期（默认今天）
6. 查询家庭所有类别和任务（排除已删除）
7. 查询用户当天已完成的任务
8. 标记每个任务的完成状态
9. 返回任务列表和积分概览

---

#### 4.1.2 完成任务

**接口：** `POST /api/child/tasks/:id/complete`

**认证：** 需认证 + CHILD

**路径参数：**
- `id`: 任务 ID

**响应：**
```typescript
{
  code: 0,
  data: {
    pointsEarned: number      // 获得的积分（快照值）
    currentPoints: number     // 当前总积分
  },
  message: '任务已完成'
}
```

**业务逻辑：**
1. 验证任务存在且未删除
2. 从 Session 获取 timezoneOffset，计算今天
3. 查询用户今天是否已完成该任务
4. 如果已完成，返回错误 2002
5. 查询任务积分值
6. 创建完成记录（存储积分快照）
7. 增加用户积分（currentPoints, totalPoints）
8. 返回获得积分

---

### 4.2 礼物页

#### 4.2.1 获取礼物列表

**接口：** `GET /api/child/gifts`

**认证：** 需认证 + CHILD

**响应：**
```typescript
{
  code: 0,
  data: {
    exchangeDaysInfo: {
      days: number[]           // 本周兑换日，如 [1, 3]
      isExchangeDay: boolean   // 今天是否是兑换日
      nextExchangeDay?: {
        dayOfWeek: number      // 下个兑换日（如非兑换日）
        daysUntil: number      // 距离天数
      }
    },
    gifts: [
      {
        id: string
        name: string
        points: number
        description: string | null
        color: string | null
        weeklyLimit: number | null
        weeklyRedeemed: number      // 本周已兑换次数
        limitStatus: 'unlimited' | 'available' | 'exhausted'
        canRedeem: boolean          // 是否可兑换（综合积分+上限+兑换日）
      }
    ],
    pendingRedemptions: [
      {
        id: string
        giftName: string
        points: number
        redeemedAt: string
      }
    ]
  },
  message: '获取成功'
}
```

**业务逻辑：**
1. 从 Session 获取 userId, familyId, timezoneOffset
2. 查询家庭兑换日设置
3. 计算今天是否兑换日、下个兑换日信息
4. 查询家庭所有礼物（排除已删除）
5. 计算本周起始时间
6. 对每个礼物统计本周有效兑换次数（PENDING + CONFIRMED）
7. 计算每个礼物的 limitStatus 和 canRedeem
8. 查询用户待确认的兑换记录
9. 返回礼物列表和兑换日信息

---

#### 4.2.2 兑换礼物

**接口：** `POST /api/child/gifts/redeem`

**认证：** 需认证 + CHILD

**请求体：**
```typescript
{
  giftId: string
}
```

**响应：**
```typescript
{
  code: 0,
  data: {
    redemptionId: string      // 兑换记录 ID
    pointsSpent: number       // 消耗积分
    currentPoints: number     // 当前剩余积分
    status: 'PENDING'
  },
  message: '等待家长确认'
}
```

**业务逻辑：**
1. 验证礼物存在且未删除
2. 从 Session 获取 timezoneOffset，验证今天是否兑换日
3. 如果非兑换日，返回错误 2003
4. 验证用户积分是否足够
5. 如果积分不足，返回错误 2001
6. 如果礼物有 weeklyLimit：
   - 统计本周已兑换次数
   - 如果已达上限，返回错误 2004
7. 扣减用户积分
8. 创建兑换记录（PENDING 状态，存储积分快照）
9. 返回兑换信息

---

### 4.3 个人中心页

#### 4.3.1 获取任务历史

**接口：** `GET /api/child/history/completions`

**认证：** 需认证 + CHILD

**请求参数：**
```
?weeks=4   // 可选，返回最近几周，默认 4 周
```

**响应：**
```typescript
{
  code: 0,
  data: [
    {
      weekRange: {
        start: string    // ISO 8601，周一
        end: string      // ISO 8601，周日
      }
      completions: [
        {
          id: string
          taskName: string
          points: number
          completedAt: string
          revoked: boolean
        }
      ],
      summary: {
        completed: number   // 完成任务数（排除已撤销）
        points: number      // 获得积分（排除已撤销）
      }
    }
  ],
  message: '获取成功'
}
```

**业务逻辑：**
1. 从 Session 获取 userId, timezoneOffset
2. 计算最近 N 周的起始时间
3. 查询每周的完成记录（含已撤销）
4. 统计每周完成任务数和积分（排除已撤销）
5. 返回历史数据

---

#### 4.3.2 获取礼物历史

**接口：** `GET /api/child/history/redemptions`

**认证：** 需认证 + CHILD

**请求参数：**
```
?weeks=4   // 可选，返回最近几周，默认 4 周
```

**响应：**
```typescript
{
  code: 0,
  data: [
    {
      weekRange: {
        start: string
        end: string
      }
      redemptions: [
        {
          id: string
          giftName: string
          giftColor: string | null
          points: number
          redeemedAt: string
          status: 'PENDING' | 'CONFIRMED' | 'CANCELLED'
          confirmedAt?: string
          cancelledAt?: string
        }
      ],
      summary: {
        confirmed: number     // 已确认兑换数
        pointsSpent: number   // 已确认消耗积分
        pending: number       // 待确认数
      }
    }
  ],
  message: '获取成功'
}
```

**业务逻辑：**
1. 从 Session 获取 userId, timezoneOffset
2. 计算最近 N 周的起始时间
3. 查询每周的兑换记录（PENDING/CONFIRMED，排除 CANCELLED）
4. 统计每周兑换数和消耗积分
5. 返回历史数据

---

## 5. 辅助函数设计

### 5.1 时间计算函数

```typescript
// 获取本周起始时间（周一 00:00:00，使用用户时区）
function getWeekStart(date: Date, timezoneOffset: number): Date {
  // 将 UTC 时间转换为用户本地时间
  const localTime = new Date(date.getTime() + timezoneOffset * 60 * 60 * 1000)
  // 计算周一
  const dayOfWeek = localTime.getUTCDay() // 0=周日, 1=周一
  const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  const monday = new Date(localTime.getTime() - daysToMonday * 24 * 60 * 60 * 1000)
  // 设置为 00:00:00
  monday.setUTCHours(0, 0, 0, 0)
  // 转换回 UTC
  return new Date(monday.getTime() - timezoneOffset * 60 * 60 * 1000)
}

// 判断是否兑换日（使用用户时区）
function isExchangeDay(exchangeDays: number[], timezoneOffset: number): boolean {
  const now = new Date()
  const localTime = new Date(now.getTime() + timezoneOffset * 60 * 60 * 1000)
  const dayOfWeek = localTime.getUTCDay()
  return exchangeDays.includes(dayOfWeek)
}
```

### 5.2 每周兑换次数统计

```typescript
// 统计本周某孩子对某礼物的有效兑换次数
async function countWeeklyRedemptions(
  userId: string,
  giftId: string,
  timezoneOffset: number
): number {
  const weekStart = getWeekStart(new Date(), timezoneOffset)
  return prisma.giftRedemption.count({
    where: {
      userId,
      giftId,
      redeemedAt: { gte: weekStart },
      status: { in: ['PENDING', 'CONFIRMED'] }
    }
  })
}
```

---

## 6. 预设颜色池

```typescript
const GIFT_COLORS = [
  '#FF6B6B',  // 红
  '#4ECDC4',  // 青
  '#FFE66D',  // 黄
  '#95E1D3',  // 浅绿
  '#F38181',  // 珊瑚红
  '#AA96DA',  // 紫
  '#FCBAD3',  // 粉
  '#A8D8EA',  // 浅蓝
  '#FFB6B9',  // 桃红
  '#FAE3D9',  // 米色
  '#B5EAD7',  // 薄荷绿
  '#DAC4FF',  // 浅紫
]
```

创建礼物时，如果未指定颜色，随机选择一个。

---

## 7. 关联文档

- [[2026-05-21-architecture-design]]：系统架构设计
- [[2026-05-21-database-design]]：数据库设计
- [[2026-05-21-family-mechanism-design]]：家庭机制设计
- [[2026-05-21-parent-app-design]]：家长端应用设计
- [[2026-05-21-child-daily-flow-design]]：孩子端日常使用流程设计
- [[2026-05-21-weekly-redemption-limit-design]]：礼物每周兑换上限设计
- [[2026-05-21-implementation-confirmations-design]]：实现前确认事项

---

**文档版本：** v1.0
**创建日期：** 2026-05-21
**讨论参与：** 用户与 Claude Code