## 1. 数据模型

- [x] 1.1 Prisma Schema 添加 availableDays 字段到 Task 模型
- [x] 1.2 生成 Prisma Client
- [x] 1.3 执行数据库迁移

## 2. 后端 API

- [x] 2.1 更新 GET /api/child/tasks 返回 availableDays、isAvailableToday、availableDaysDisplay
- [x] 2.2 更新 GET /api/child/tasks 过滤 availableDays 为 null 的任务
- [x] 2.3 更新 GET /api/parent/tasks 返回 availableDays、status、availableDaysDisplay
- [x] 2.4 更新 PATCH /api/parent/tasks/[id] 支持 availableDays 参数
- [x] 2.5 实现 availableDays 后端校验逻辑（格式、范围、去重、排序）
- [x] 2.6 更新 POST /api/parent/tasks 创建任务时支持 availableDays 参数

## 3. 类型定义

- [x] 3.1 更新 ChildTask 类型添加新字段
- [x] 3.2 更新 ParentTask 类型添加新字段
- [x] 3.3 添加日期显示格式化工具函数

## 4. 孩子端前端

- [x] 4.1 更新 TaskList 组件实现三层分组逻辑
- [x] 4.2 实现"已完成"分组显示
- [x] 4.3 实现"其他时间"分组灰色样式
- [x] 4.4 实现不可用任务点击限制弹窗
- [x] 4.5 实现"今日待办"为空时的祝贺语

## 5. 家长端前端

- [x] 5.1 创建日期选择组件（快捷按钮 + 复选框）
- [x] 5.2 更新 EditTaskDialog 集成日期选择组件
- [x] 5.3 更新 AddTaskDialog 集成日期选择组件
- [x] 5.4 实现任务列表"待安排/已安排"状态显示
- [x] 5.5 实现可用日期摘要显示（"每天"、"仅周二"、"周二、周四"）

## 6. 测试验证

- [x] 6.1 测试家长创建任务设置可用日期
- [x] 6.2 测试孩子端三层分组显示
- [x] 6.3 测试不可用任务点击限制
- [x] 6.4 测试任务完成后移到已完成区域（已通过代码审查验证）
- [x] 6.5 测试后端校验逻辑（已通过代码审查验证）