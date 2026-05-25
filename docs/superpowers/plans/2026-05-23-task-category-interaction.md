# 任务页类别管理交互优化实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 按照高保真原型重构任务页，将类别管理交互从隐蔽的长按改为显式的按钮操作。

**Architecture:**
- 顶部操作栏：左右并列的「管理类别」和「添加任务」按钮
- 类别分组：白色卡片容器，可点击折叠/展开
- 任务卡片：直接显示编辑/删除按钮
- 类别管理弹窗：居中弹窗显示类别列表

**Tech Stack:** React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons

---

## 文件结构

| 文件 | 操作 | 说明 |
|------|------|------|
| `src/components/parent/CategorySection.tsx` | 重构 | 可折叠卡片结构，移除长按 |
| `src/components/parent/TaskCard.tsx` | 重构 | 添加编辑/删除按钮，移除长按 |
| `src/components/parent/CategoryManageDialog.tsx` | 重构 | 居中弹窗样式，类别列表显示 |
| `src/app/parent/tasks/page.tsx` | 重构 | 顶部操作栏，移除底部菜单 |

---

### Task 1: 重构 TaskCard 组件

**Files:**
- Modify: `src/components/parent/TaskCard.tsx`

- [ ] **Step 1: 重构 TaskCard 组件**

移除长按逻辑，添加编辑/删除按钮。参照原型 `.task-item` 样式。

```tsx
"use client";

import { Pencil, Trash2 } from "lucide-react";
import type { ParentTask } from "@/types";

interface TaskCardProps {
  task: ParentTask;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-border last:border-b-0">
      {/* 任务信息 */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-text flex items-center gap-2">
          {task.name}
        </h3>
        {task.description && (
          <p className="text-xs text-text-muted mt-1">
            {task.description}
          </p>
        )}
      </div>

      {/* 右侧：积分 + 操作按钮 */}
      <div className="flex items-center gap-2 shrink-0">
        {/* 积分 */}
        <span className="text-sm font-semibold text-primary flex items-center gap-1">
          +{task.points}积分
        </span>

        {/* 编辑按钮 */}
        <button
          onClick={onEdit}
          className="px-2 py-1 text-xs border border-border rounded flex items-center gap-1 hover:border-primary hover:text-primary transition-colors"
        >
          <Pencil className="w-3 h-3" />
          编辑
        </button>

        {/* 删除按钮 */}
        <button
          onClick={onDelete}
          className="px-2 py-1 text-xs border border-border rounded flex items-center gap-1 hover:border-error hover:text-error transition-colors"
        >
          <Trash2 className="w-3 h-3" />
          删除
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: 验证类型检查**

Run: `pnpm build 2>&1 | head -20`

Expected: 编译成功，无类型错误

---

### Task 2: 重构 CategorySection 组件

**Files:**
- Modify: `src/components/parent/CategorySection.tsx`

- [ ] **Step 1: 重构 CategorySection 为可折叠卡片**

移除长按逻辑，添加折叠/展开功能。参照原型 `.category-group` 样式。

```tsx
"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { TaskCard } from "./TaskCard";
import { cn } from "@/lib/cn";
import type { CategoryWithTasks, ParentTask } from "@/types";

interface CategorySectionProps {
  category: CategoryWithTasks;
  onEditTask: (task: ParentTask) => void;
  onDeleteTask: (task: ParentTask) => void;
  defaultExpanded?: boolean;
}

export function CategorySection({
  category,
  onEditTask,
  onDeleteTask,
  defaultExpanded = true,
}: CategorySectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className="bg-card rounded-xl shadow-sm border border-border mb-3">
      {/* 类别标题（可点击折叠） */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "flex items-center justify-between px-4 py-3 cursor-pointer",
          "rounded-xl transition-colors",
          isExpanded ? "bg-gradient-to-r from-blue-50 to-blue-100/50" : "bg-gray-50"
        )}
      >
        <h2 className="text-sm font-medium text-text">
          {category.name}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">
            {category.tasks.length} 个任务
          </span>
          <ChevronDown
            className={cn(
              "w-4 h-4 text-text-muted transition-transform duration-150",
              isExpanded && "rotate-180"
            )}
          />
        </div>
      </div>

      {/* 任务列表（仅展开时显示） */}
      {isExpanded && (
        <div className="px-4 py-2">
          {category.tasks.length === 0 ? (
            <div className="py-4 text-center text-sm text-text-muted">
              暂无任务
            </div>
          ) : (
            category.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={() => onEditTask(task)}
                onDelete={() => onDeleteTask(task)}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: 验证类型检查**

Run: `pnpm build 2>&1 | head -20`

Expected: 编译成功，无类型错误

---

### Task 3: 重构 CategoryManageDialog 组件样式

**Files:**
- Modify: `src/components/parent/CategoryManageDialog.tsx`

- [ ] **Step 1: 更新弹窗样式为居中弹窗**

参照原型 `.popup` 样式，调整弹窗布局。

主要改动：
- 添加弹窗头部图标
- 类别列表改为显示图标 + 名称 + 任务数量
- 调整按钮样式为「关闭」和「添加类别」

```tsx
"use client";

import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Folder, Plus, Trash2, BookOpen, Sparkles, Activity } from "lucide-react";
import { cn } from "@/lib/cn";

interface Category {
  id: string;
  name: string;
  order: number;
  taskCount?: number;
}

interface CategoryManageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  onAddCategory: (name: string) => Promise<void>;
  onDeleteCategory: (id: string) => Promise<void>;
  onUpdateOrder: (orders: { id: string; order: number }[]) => Promise<void>;
}

// 类别图标映射
const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "学习类": <BookOpen className="w-4 h-4" />,
  "家务类": <Sparkles className="w-4 h-4" />,
  "运动类": <Activity className="w-4 h-4" />,
};

export function CategoryManageDialog({
  isOpen,
  onClose,
  categories,
  onAddCategory,
  onDeleteCategory,
}: CategoryManageDialogProps) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      toast.error("请输入类别名称");
      return;
    }

    setIsLoading(true);
    try {
      await onAddCategory(newCategoryName.trim());
      setNewCategoryName("");
      toast.success("类别创建成功");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "创建失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCategory = async (id: string, taskCount: number) => {
    if (taskCount > 0) {
      toast.error("该类别下还有任务，无法删除");
      return;
    }

    setIsLoading(true);
    try {
      await onDeleteCategory(id);
      toast.success("类别删除成功");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "删除失败");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setNewCategoryName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[340px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-primary" />
            管理类别
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* 已有类别列表 */}
          <div className="space-y-2">
            {categories.length === 0 ? (
              <div className="text-center py-2 text-sm text-text-muted">
                暂无类别
              </div>
            ) : (
              categories.map((category) => (
                <div
                  key={category.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-b-0"
                >
                  <span className="text-sm text-text flex items-center gap-2">
                    {CATEGORY_ICONS[category.name] || <Folder className="w-4 h-4" />}
                    {category.name}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-text-muted">
                      {category.taskCount || 0} 个任务
                    </span>
                    {(category.taskCount || 0) === 0 && (
                      <button
                        onClick={() => handleDeleteCategory(category.id, 0)}
                        disabled={isLoading}
                        className="p-1 text-text-muted hover:text-error transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 添加新类别 */}
          <div>
            <Input
              placeholder="请输入类别名称"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              disabled={isLoading}
              maxLength={20}
              className="bg-gray-50"
            />
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
          >
            关闭
          </Button>
          <Button
            onClick={handleAddCategory}
            disabled={isLoading || !newCategoryName.trim()}
            className="flex-1"
          >
            <Plus className="w-4 h-4 mr-1" />
            添加类别
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

- [ ] **Step 2: 验证类型检查**

Run: `pnpm build 2>&1 | head -20`

Expected: 编译成功，无类型错误

---

### Task 4: 重构任务页页面布局

**Files:**
- Modify: `src/app/parent/tasks/page.tsx`

- [ ] **Step 1: 重构页面布局**

移除长按相关逻辑和底部菜单，添加顶部操作栏。

主要改动：
1. 添加顶部操作栏（管理类别 + 添加任务按钮）
2. 使用新的 CategorySection 和 TaskCard
3. 移除底部菜单（taskMenuOpen、categoryMenuOpen）
4. 移除操作提示文字
5. 编辑/删除任务改为直接调用弹窗

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Settings, RefreshCw, AlertCircle } from "lucide-react";
import { useTasks } from "@/hooks/use-tasks";
import { CategorySection } from "@/components/parent/CategorySection";
import { AddTaskDialog } from "@/components/parent/AddTaskDialog";
import { EditTaskDialog } from "@/components/parent/EditTaskDialog";
import { CategoryManageDialog } from "@/components/parent/CategoryManageDialog";
import { DeleteConfirmDialog } from "@/components/parent/DeleteConfirmDialog";
import { Button } from "@/components/ui/button";
import type { CategoryWithTasks, ParentTask } from "@/types";

export default function ParentTasksPage() {
  const {
    categories,
    categoriesList,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
    createTask,
    isCreatingTask,
    updateTask,
    isUpdatingTask,
    deleteTask,
    isDeletingTask,
    createCategory,
    deleteCategory,
    updateCategoryOrder,
  } = useTasks();

  // 弹窗状态
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false);
  const [editTaskDialogOpen, setEditTaskDialogOpen] = useState(false);
  const [categoryManageDialogOpen, setCategoryManageDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  // 选中的任务
  const [selectedTask, setSelectedTask] = useState<ParentTask | null>(null);

  // 处理编辑任务
  const handleEditTask = (task: ParentTask) => {
    setSelectedTask(task);
    setEditTaskDialogOpen(true);
  };

  // 处理删除任务
  const handleDeleteTask = (task: ParentTask) => {
    setSelectedTask(task);
    setDeleteConfirmOpen(true);
  };

  // 确认删除任务
  const handleConfirmDelete = async () => {
    if (selectedTask) {
      await deleteTask(selectedTask.id);
    }
    setDeleteConfirmOpen(false);
    setSelectedTask(null);
  };

  // 加载状态
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-3" />
          <p className="text-text-secondary">加载中...</p>
        </div>
      </div>
    );
  }

  // 错误状态
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-3" />
          <p className="text-red-500 mb-4">{error?.message || "加载失败"}</p>
          <Button onClick={() => refetch()}>
            <RefreshCw className="w-4 h-4 mr-2" />
            重新加载
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      {/* 顶部操作栏 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-4"
      >
        <Button
          variant="outline"
          onClick={() => setCategoryManageDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          管理类别
        </Button>

        <Button
          onClick={() => setAddTaskDialogOpen(true)}
          disabled={categories.length === 0 || isCreatingTask}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          添加任务
        </Button>

        {isFetching && (
          <RefreshCw className="w-4 h-4 animate-spin text-text-muted absolute right-4" />
        )}
      </motion.div>

      {/* 任务列表 */}
      {categories.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <p className="text-text-secondary mb-2">暂无类别</p>
          <p className="text-text-secondary text-sm mb-4">请先创建类别</p>
          <Button onClick={() => setCategoryManageDialogOpen(true)}>
            创建类别
          </Button>
        </motion.div>
      ) : (
        categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <CategorySection
              category={category}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
            />
          </motion.div>
        ))
      )}

      {/* 添加任务弹窗 */}
      <AddTaskDialog
        isOpen={addTaskDialogOpen}
        onClose={() => setAddTaskDialogOpen(false)}
        categories={categories.map((c) => ({ id: c.id, name: c.name, order: c.order }))}
        onAdd={async (data) => {
          await createTask(data);
        }}
      />

      {/* 编辑任务弹窗 */}
      <EditTaskDialog
        isOpen={editTaskDialogOpen}
        onClose={() => {
          setEditTaskDialogOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        categories={categories}
        onUpdate={async (id, data) => {
          await updateTask(id, data);
        }}
      />

      {/* 类别管理弹窗 */}
      <CategoryManageDialog
        isOpen={categoryManageDialogOpen}
        onClose={() => setCategoryManageDialogOpen(false)}
        categories={categoriesList}
        onAddCategory={async (name) => {
          await createCategory(name);
        }}
        onDeleteCategory={async (id) => {
          await deleteCategory(id);
        }}
        onUpdateOrder={async (orders) => {
          await updateCategoryOrder(orders);
        }}
      />

      {/* 删除确认弹窗 */}
      <DeleteConfirmDialog
        isOpen={deleteConfirmOpen}
        title="删除任务"
        content={selectedTask ? `确定要删除任务「${selectedTask.name}」吗？` : ""}
        destructive
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setDeleteConfirmOpen(false);
          setSelectedTask(null);
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: 验证类型检查和构建**

Run: `rm -rf .next && pnpm build`

Expected: 编译成功，无类型错误

---

### Task 5: 移除废弃的 BottomMenu 组件引用

**Files:**
- Check: `src/components/parent/BottomMenu.tsx` 是否还被其他页面使用

- [ ] **Step 1: 检查 BottomMenu 使用情况**

Run: `grep -r "BottomMenu" src/ --include="*.tsx"`

Expected: 确认是否还有其他页面使用

- [ ] **Step 2: 如果没有其他使用，移除导入**

如果 BottomMenu 只在 tasks 页面使用，移除相关导入即可。
如果其他页面也使用，保留组件。

---

### Task 6: 验证完整功能

- [ ] **Step 1: 启动开发服务器**

Run: `pnpm dev`

- [ ] **Step 2: 手动验证功能**

检查以下功能：
1. 顶部操作栏显示「管理类别」和「添加任务」按钮
2. 点击「管理类别」弹出类别管理弹窗
3. 点击「添加任务」弹出添加任务弹窗
4. 类别分组可点击折叠/展开
5. 任务卡片显示编辑/删除按钮
6. 编辑按钮触发编辑弹窗
7. 删除按钮触发删除确认弹窗

- [ ] **Step 3: 提交代码**

```bash
git add src/components/parent/CategorySection.tsx src/components/parent/TaskCard.tsx src/components/parent/CategoryManageDialog.tsx src/app/parent/tasks/page.tsx
git commit -m "$(cat <<'EOF'
refactor(tasks): 重构任务页交互方式

按照高保真原型重构：
- 新增顶部操作栏（管理类别/添加任务按钮）
- 类别分组改为可折叠卡片结构
- 任务卡片直接显示编辑/删除按钮
- 类别管理改为居中弹窗形式
- 移除长按触发方式

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
EOF
)"
```
