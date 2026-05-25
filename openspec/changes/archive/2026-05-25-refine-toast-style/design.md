## Context

当前使用 `sonner` 库（v2.0.7）实现 Toast 通知。组件位于 `src/components/ui/toast.tsx`，仅配置了统一的白色背景样式，无状态区分。

项目已有功能色定义于 `globals.css`：
- `--color-success: #4ECDC4`
- `--color-error: #FF6B6B`
- `--color-warning: #FFD93D`
- `--color-info: #60A5FA`

图标库 `lucide-react` 已在项目中使用。

## Goals / Non-Goals

**Goals:**
- 四种状态类型视觉区分
- 左侧色条 + 图标 + 浅色背景的统一风格
- 保持与现有圆角卡片风格一致

**Non-Goals:**
- 不随角色主题变化颜色
- 不添加交互按钮（如"查看详情"）
- 不支持自定义持续时间

## Decisions

### 状态类型映射

| 类型 | 颜色 | 图标 | 适用场景 |
|-----|------|-----|---------|
| success | #4ECDC4 | Check | 操作成功完成 |
| error | #FF6B6B | X | 操作失败、网络异常 |
| warning | #FFD93D | AlertTriangle | 条件不满足、表单校验 |
| info | #60A5FA | Info | 状态变更通知 |

### 视觉结构

```
┌──────────────────────────────┐
│█│ ✓  任务创建成功              │
│█│    (状态色淡化背景)          │
└──────────────────────────────┘
```

- 左侧 4px 色条，使用状态色
- 图标使用 `lucide-react`，尺寸 16px
- 背景：状态色 10% 透明度叠加白色
- 圆角：16px，与项目卡片一致

### 实现方案

使用 `sonner` 的 `toastOptions.classes` 配合 CSS 自定义样式。通过 `classNames` 属性为不同状态添加特定类名，然后在 `globals.css` 中定义样式。

## Risks / Trade-offs

- **Sonner 版本兼容**: `classNames` API 在不同版本可能有差异 → 查阅 sonner v2.0.7 文档确认 API
- **图标渲染**: 每个 toast 都会渲染图标组件 → 性能影响可忽略，toast 数量有限