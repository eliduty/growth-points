## MODIFIED Requirements

### Requirement: Toast 支持四种状态类型

Toast 通知组件 SHALL 支持四种状态类型：`success`、`error`、`warning`、`info`，每种类型采用 sonner `richColors` 内置着色，具有可辨识的视觉差异。

#### Scenario: 显示成功通知
- **WHEN** 调用 `toast.success("任务创建成功")`
- **THEN** 显示浅绿色着色背景、深绿色文字、Check 图标的通知

#### Scenario: 显示错误通知
- **WHEN** 调用 `toast.error("网络异常，请重试")`
- **THEN** 显示浅红色着色背景、深红色文字、X 图标的通知

#### Scenario: 显示警告通知
- **WHEN** 调用 `toast.warning("该类别下还有任务，无法删除")`
- **THEN** 显示浅黄色着色背景、深黄色文字、AlertTriangle 图标的通知

#### Scenario: 显示信息通知
- **WHEN** 调用 `toast.info("已退出登录")`
- **THEN** 显示浅蓝色着色背景、深蓝色文字、Info 图标的通知

### Requirement: Toast 使用固定功能色

Toast 类型色 SHALL 使用 sonner `richColors` 内置色板，不随角色主题（家长端/孩子端）变化。

#### Scenario: 家长端查看成功通知
- **WHEN** 用户在家长端页面调用 `toast.success()`
- **THEN** 使用 sonner 内置成功色板，而非家长端主题色

#### Scenario: 孩子端查看成功通知
- **WHEN** 用户在孩子端页面调用 `toast.success()`
- **THEN** 使用 sonner 内置成功色板，而非孩子端主题色

### Requirement: Toast 视觉结构统一

Toast 通知 SHALL 采用 sonner 原生卡片视觉结构，不叠加手写覆盖样式。

#### Scenario: 视觉结构验证
- **WHEN** 显示任意类型的 Toast
- **THEN** 结构包含：
  - sonner 原生卡片（默认圆角与阴影，无左侧色条）
  - 状态图标位于文字左侧
  - `richColors` 类型着色背景与对应深色文字

#### Scenario: 无手写覆盖样式
- **WHEN** 检查全局样式表
- **THEN** 不存在针对 `[data-sonner-toast]` 的手写覆盖样式（含 `!important` 声明）
