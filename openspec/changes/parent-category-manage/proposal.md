## Why

家长端任务页当前存在两个问题：
1. **入口缺失**：当分类有数据后，用户找不到"管理分类"的入口按钮，只能在没有数据时看到"创建类别"按钮
2. **功能缺失**：分类管理弹窗只支持添加、删除、排序，不支持修改分类名称

这两个问题导致用户无法灵活管理任务分类，影响用户体验。

## What Changes

- TopNavbar 添加"管理分类"入口按钮（齿轮图标）
- CategorySection 标题区域添加快捷管理入口（小齿轮）
- 分类管理弹窗新增名称编辑功能（点击名称可直接编辑）
- API 新增分类名称更新接口 `PUT /api/parent/categories/[id]`

## Capabilities

### New Capabilities

- `category-edit`: 家长端分类名称修改功能，支持用户编辑已有分类的名称

### Modified Capabilities

无（这是新增功能，不影响现有能力的需求规格）

## Impact

- **前端文件**：
  - `src/app/parent/tasks/page.tsx` - TopNavbar 添加管理按钮
  - `src/components/parent/CategorySection.tsx` - 标题添加管理入口
  - `src/components/parent/CategoryManageDialog.tsx` - 添加名称编辑功能
  - `src/hooks/use-tasks.ts` - 添加 updateCategory mutation
  - `src/lib/api-parent.ts` - categoriesApi 添加 update 方法

- **API 文件**：
  - `src/app/api/parent/categories/[id]/route.ts` - 添加 PUT 方法