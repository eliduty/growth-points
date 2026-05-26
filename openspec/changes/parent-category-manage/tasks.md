## 1. API 层改造

- [ ] 1.1 在 `src/app/api/parent/categories/[id]/route.ts` 添加 PUT 方法，支持更新分类名称
- [ ] 1.2 在 `src/lib/api-parent.ts` 的 `categoriesApi` 添加 `update(id, name)` 方法

## 2. Hook 层改造

- [ ] 2.1 在 `src/hooks/use-tasks.ts` 添加 `updateCategory` mutation
- [ ] 2.2 在 `useTasks` 返回值中暴露 `updateCategory` 和 `isUpdatingCategory`

## 3. UI 层 - 分类管理入口

- [ ] 3.1 在 `src/app/parent/tasks/page.tsx` TopNavbar 添加"管理分类"按钮（齿轮图标）
- [ ] 3.2 在 `src/components/parent/CategorySection.tsx` 分类标题添加小齿轮快捷入口

## 4. UI 层 - 分类名称编辑

- [ ] 4.1 在 `src/components/parent/CategoryManageDialog.tsx` 添加名称编辑状态管理
- [ ] 4.2 实现点击名称进入编辑模式（Input 替换 span）
- [ ] 4.3 实现回车保存、Esc 取消、失焦自动保存逻辑
- [ ] 4.4 编辑状态下禁用拖拽、显示保存/取消按钮

## 5. 集成与验证

- [ ] 5.1 在 `tasks/page.tsx` 将 `updateCategory` 传递给 `CategoryManageDialog`
- [ ] 5.2 测试入口可见性和功能完整性
- [ ] 5.3 测试名称重复校验和错误提示