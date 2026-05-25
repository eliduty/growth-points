## ADDED Requirements

### Requirement: Toast 支持四种状态类型

Toast 通知组件 SHALL 支持四种状态类型：`success`、`error`、`warning`、`info`，每种类型具有独特的视觉样式。

#### Scenario: 显示成功通知
- **WHEN** 调用 `toast.success("任务创建成功")`
- **THEN** 显示左侧青绿色条、Check 图标、浅青绿背景的通知

#### Scenario: 显示错误通知
- **WHEN** 调用 `toast.error("网络异常，请重试")`
- **THEN** 显示左侧珊瑚红色条、X 图标、浅红背景的通知

#### Scenario: 显示警告通知
- **WHEN** 调用 `toast.warning("该类别下还有任务，无法删除")`
- **THEN** 显示左侧金黄色条、AlertTriangle 图标、浅黄背景的通知

#### Scenario: 显示信息通知
- **WHEN** 调用 `toast.info("已退出登录")`
- **THEN** 显示左侧天蓝色条、Info 图标、浅蓝背景的通知

### Requirement: Toast 使用固定功能色

Toast 状态色 SHALL 使用固定的功能色，不跟随角色主题（家长端/孩子端）变化。

#### Scenario: 家长端查看成功通知
- **WHEN** 用户在家长端页面调用 `toast.success()`
- **THEN** 使用固定的青绿色 `#4ECDC4`，而非家长端主题色

#### Scenario: 孩子端查看成功通知
- **WHEN** 用户在孩子端页面调用 `toast.success()`
- **THEN** 使用固定的青绿色 `#4ECDC4`，而非孩子端主题色

### Requirement: Toast 视觉结构统一

Toast 通知 SHALL 采用左侧色条 + 图标 + 浅色背景的统一视觉结构。

#### Scenario: 视觉结构验证
- **WHEN** 显示任意类型的 Toast
- **THEN** 结构包含：
  - 左侧 4px 宽的状态色条
  - 16px 状态图标位于文字左侧
  - 背景为状态色 10% 透明度叠加白色
  - 圆角 16px