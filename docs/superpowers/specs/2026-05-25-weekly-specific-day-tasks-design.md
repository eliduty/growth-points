---
name: weekly-specific-day-tasks
description: 任务系统支持每周特定日期任务，孩子可看到全局任务安排
---

# 每周特定日任务功能设计

## 背景

当前任务系统采用"重复任务池"模式：所有任务每天都显示，完成状态取决于当天是否有完成记录。无法支持"周二倒垃圾"、"周末大扫除"这类只在特定日期显示的任务。

## 目标

让孩子能够：
- 知道有哪些任务存在
- 知道什么时间可以完成某个任务
- 聚焦当天可做的任务，同时能看到本周其他任务安排

## 设计决策

### 1. 非指定日期任务的处理方式

**决策：灰色显示 + 清晰标注可用日期**

理由：
- 孩子能看到全部任务，有完整的家务清单认知
- 视觉区分清晰：可做的任务明亮突出，不可做的灰色/暗淡
- 标注可用日期有助于孩子规划

### 2. 数据存储方案

**决策：Task 模型添加 availableDays 字段**

```prisma
model Task {
  // ...现有字段
  availableDays String?  // 逗号分隔: "1,3,5" 表示周一三五
}
```

理由：
- SQLite 下字符串字段足够用
- 日期筛选逻辑简单（前端/后端都能轻松判断）
- 改动最小，风险低

### 3. 空值默认行为

**决策：null = 草稿/待定状态**

理由：
- 任务创建后可以先不安排日期，家长后续确定
- null 状态的任务不显示给孩子
- 家长端显示"待安排"状态，提醒家长需要设置

### 4. 数据格式

**决策：逗号分隔字符串**

格式：`"1,3,5"` 表示周一、周三、周五

日期编码：0=周日, 1=周一, ..., 6=周六

理由：
- 比 JSON 更简洁，无需解析
- SQLite 存储字符串很自然
- 前端/后端处理都简单：`days?.split(',').map(Number)`

### 5. 可用日期显示格式

**决策：简洁模式**

- 单日：`仅周二`
- 多日：`周二、周四`

理由：
- 孩子界面空间有限，信息要精简
- "仅周二"足够表达含义

### 6. 家长端设置交互

**决策：快捷按钮 + 复选框**

快捷选项：
- "每天" — 填充全部日期
- "仅周末" — 填充周六、周日
- "仅工作日" — 填充周一至周五

复选框：周一到周日自由勾选

### 7. 孩子端任务排列

**决策：三层分组显示**

分组结构：
- 上方："今日待办"分组 — 今天可用的未完成任务，正常样式，可点击完成
- 中间："已完成"分组 — 今天完成的任务，显示完成时间和积分
- 下方："其他时间"分组 — 今天不可用的任务，灰色样式，标注可用日期

理由：
- "今日待办"只显示未完成任务，孩子焦点清晰
- 任务完成后移到"已完成"区域，产生成就感
- "其他时间"让孩子知道本周还有其他任务安排
- 渐进式成就反馈：任务减少 → 已完成区域增加 → 最终祝贺

### 8. 不可用任务的交互

**决策：严格限制，只能在指定日期完成**

交互规则：
- 点击"其他时间"区域的任务 → 弹窗提示"这个任务周三才能做哦"
- 不允许提前完成，不允许点击完成

理由：
- 规则简单清晰，孩子容易理解
- 符合家长设定特定日期的意图
- 避免提前完成导致的数据混乱

### 9. 家长端任务状态显示

**决策：区分"待安排"和"已安排"状态**

显示方式：
- 待安排（availableDays = null）：显示"待安排"标记
- 已安排：显示可用日期摘要（"每天"、"仅周三"、"周二、周四"）

理由：
- 家长能清晰看到哪些任务还没设置日期
- 新创建的任务默认待安排，需要后续设置
- 提醒家长完成任务配置

## 数据模型变更

### Prisma Schema

```prisma
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
  availableDays String?       // 新增字段：逗号分隔日期，null=草稿状态
  createdAt   DateTime        @default(now())
  updatedAt   DateTime        @updatedAt
  deletedAt   DateTime?       // 软删除
}
```

## API 变更

### GET /api/child/tasks

返回数据增加 `availableDays` 字段，前端根据当前日期判断是否可用：

```typescript
interface ChildTask {
  id: string;
  name: string;
  points: number;
  description: string | null;
  categoryId: string;
  categoryName: string;
  categoryOrder: number;
  completed: boolean;
  completedAt: string | null;
  availableDays: string | null;  // 新增：null=草稿不显示
  isAvailableToday: boolean;     // 新增：前端判断结果
  availableDaysDisplay: string;  // 新增：显示文本如"仅周二"
}

// isAvailableToday 判断逻辑：
// - availableDays 为 null → 不返回给前端（过滤掉）
// - availableDays 包含今天的日期数字 → true
// - 否则 → false
```

### GET /api/parent/tasks

返回数据增加 `availableDays` 和状态信息：

```typescript
interface ParentTask {
  id: string;
  name: string;
  points: number;
  description: string | null;
  categoryId: string;
  categoryName: string;
  availableDays: string | null;   // 新增
  status: 'pending' | 'arranged'; // 新增：pending=待安排, arranged=已安排
  availableDaysDisplay: string;   // 新增：显示文本
}

### PATCH /api/parent/tasks/[id]

家长端任务编辑 API 支持 `availableDays` 参数：

```typescript
interface UpdateTaskRequest {
  name?: string;
  points?: number;
  description?: string;
  availableDays?: string | null;  // 新增
}

// 后端校验规则：
// - null 或 "" → 存储 null
// - 非空字符串 → 必须是逗号分隔的数字，每个 ∈ {0-6}
// - 校验失败 → 返回 400 错误
// - 校验成功 → 去重、排序后存储
```

## 前端变更

### 孩子端 TaskList 组件

1. 任务分组逻辑（三层）：
   - "今日待办"分组：今天可用 + 未完成的任务
   - "已完成"分组：今天完成的任务
   - "其他时间"分组：今天不可用的任务

2. 任务状态变化：
   - 完成任务后从"今日待办"移到"已完成"
   - "今日待办"为空时显示祝贺语

3. 不可用任务样式：
   - 灰色背景/文字
   - 显示可用日期标签（如"仅周二"）
   - 点击时弹窗提示"这个任务周三才能做哦"

### 家长端任务编辑组件

1. 新增可用日期设置区域
2. 快捷按钮：每天、仅周末、仅工作日（仅辅助选择，不影响存储）
3. 复选框：周一到周日自由勾选
4. 待安排状态显示：任务列表区分"待安排"和"已安排"

## 边界情况处理

| 场景 | 处理方式 |
|-----|---------|
| availableDays 为 null | 草稿状态，孩子端不显示 |
| availableDays 为空字符串 "" | 视同 null |
| availableDays 包含无效数字（如 7,8） | 后端校验失败，返回 400 错误 |
| availableDays 包含非数字（如 a,b） | 后端校验失败，返回 400 错误 |
| availableDays 包含重复数字（如 1,1,3） | 后端去重后存储 |
| availableDays 未排序（如 5,3,1） | 后端排序后存储 |
| 用户选择"每天"后改为自定义 | 前端清空后重新勾选 |
| 任务编辑时不清空 availableDays | 保持原值不变 |

后端校验规则：
- 必须是逗号分隔的数字字符串
- 每个数字 ∈ {0,1,2,3,4,5,6}
- 校验成功后：去重、排序、存储

前端显示逻辑：
- null → 孩子端不显示；家长端显示"待安排"
- "0,1,2,3,4,5,6" → 显示为"每天"，不显示日期标签
- 单日 → 显示"仅周二"
- 多日 → 显示"周二、周四"（排序后）

## 迁移策略

项目尚未上线，无需数据迁移。

实施步骤：
1. 数据库迁移：添加 `availableDays` 字段（nullable）
2. 现有任务：保持 null 状态，由家长手动设置
3. API 返回数据：
   - 孩子端：过滤掉 null 的任务，计算 `isAvailableToday`
   - 家长端：返回所有任务，标注 `status` 和 `availableDaysDisplay`
4. 前端适配：
   - 孩子端：三层分组 + 灰色样式 + 日期标签 + 交互限制
   - 家长端：待安排/已安排状态显示 + 日期选择组件