## Why

当前 Toast 通知组件样式朴素，缺乏设计感，没有颜色和状态类型区分，用户无法快速识别通知的语义（成功、错误、警告、信息）。需要优化以提升用户体验和界面一致性。

## What Changes

- 新增四种状态类型区分：`success`、`error`、`warning`、`info`
- 采用左侧色条 + 图标 + 浅色背景的视觉风格
- 使用固定功能色（不跟随角色主题变化）：
  - success: `#4ECDC4`（青绿）
  - error: `#FF6B6B`（珊瑚红）
  - warning: `#FFD93D`（金黄）
  - info: `#60A5FA`（天蓝）
- 调整现有调用以匹配正确的状态类型：
  - 条件不满足提示（如"该类别下还有任务，无法删除")改为 `warning`
  - 中性状态通知（如"已退出登录")改为 `info`
  - 表单校验提示（如"请输入类别名称")改为 `warning`

## Capabilities

### New Capabilities

- `toast-notification`: Toast 通知组件的状态类型区分与视觉样式规范

### Modified Capabilities

<!-- 无现有 spec 需修改 -->

## Impact

- `src/components/ui/toast.tsx` - Toast 组件样式配置
- `globals.css` - 可能添加 toast 相关 CSS 样式
- 所有调用 `toast.success()` / `toast.error()` 的文件需审查并调整类型