## Context

家长端任务页当前架构：
- `tasks/page.tsx` 作为页面入口，使用 `useTasks` hook 获取数据
- `CategorySection.tsx` 展示每个分类及其任务列表
- `CategoryManageDialog.tsx` 提供分类管理弹窗（添加、删除、排序）
- `api-parent.ts` 封装 API 调用，`use-tasks.ts` 封装 React Query mutations

约束：
- 使用现有的 UI 组件库（Dialog、Button、Input）
- 保持与现有代码风格一致
- 不影响子端功能

## Goals / Non-Goals

**Goals:**
- 为用户提供明确的分类管理入口
- 支持修改分类名称
- 保持界面简洁，不增加过多按钮

**Non-Goals:**
- 不重构现有分类管理架构
- 不修改子端任务展示逻辑
- 不添加分类合并/拆分功能

## Decisions

### 1. 入口位置设计

**决策**: 采用双重入口策略
- TopNavbar 添加"管理分类"按钮（全局入口）
- CategorySection 标题添加小齿轮按钮（局部快捷入口）

**理由**:
- 单一入口容易被忽略
- TopNavbar 入口适合批量管理多个分类
- CategorySection 入口适合快速编辑当前分类

**替代方案**:
- 仅 TopNavbar 入口 → 用户可能不知道有管理功能
- 仅 CategorySection 入口 → 入口分散，不直观
- 长按分类标题触发 → 用户不知道有此功能

### 2. 名称编辑交互

**决策**: 点击分类名称直接进入编辑模式（inline edit）

**理由**:
- 直观：想改名字自然点击名字
- 不增加界面复杂度
- 与移动端手势习惯一致

**交互细节**:
- 点击名称 → 变为 Input 输入框，自动聚焦
- 回车保存，Esc 取消
- 失焦自动保存
- 编辑状态下禁用拖拽

### 3. API 设计

**决策**: `PUT /api/parent/categories/[id]` 接收 `{ name: string }`

**理由**:
- 与现有 tasks、gifts 的更新接口风格一致
- 最小化改动，只更新名称字段
- 保持 RESTful 语义

## Risks / Trade-offs

**拖拽与点击冲突**:
- 用户可能误触发拖拽
- Mitigation: 编辑状态下禁用拖拽；拖拽需要滑动一定距离才触发

**名称重复**:
- 用户可能输入已存在的名称
- Mitigation: API 检查重复，返回错误提示

**失焦保存时机**:
- 用户可能点击删除按钮导致意外保存
- Mitigation: 编辑状态下隐藏删除按钮，显示保存/取消按钮