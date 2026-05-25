## MODIFIED Requirements

### Requirement: 家长可以撤销任务完成记录

家长可以在孩子详情页撤销任务完成记录，撤销后积分将被扣除。

#### Scenario: 撤销按钮可见
- **WHEN** 家长查看孩子详情页的任务完成记录
- **THEN** 每条未撤销的记录右侧显示「撤销」按钮

#### Scenario: 点击撤销按钮触发确认
- **WHEN** 家长点击记录右侧的「撤销」按钮
- **THEN** 系统弹出确认弹窗，显示任务名称和将扣回的积分值
- **AND** 弹窗包含「取消」和「确认撤销」按钮

#### Scenario: 确认撤销成功
- **WHEN** 家长在确认弹窗点击「确认撤销」
- **THEN** 系统撤销该完成记录
- **AND** 孩子积分扣除对应数值
- **AND** 记录显示「已撤销」状态

#### Scenario: 已撤销记录无撤销按钮
- **WHEN** 家长查看已撤销的完成记录
- **THEN** 记录右侧不显示撤销按钮
- **AND** 记录显示「已撤销」标记

## ADDED Requirements

### Requirement: 详情页顶部导航显示页面标题

详情页顶部导航栏 SHALL 显示页面标题「完成记录」。

#### Scenario: 详情页标题显示
- **WHEN** 家长进入孩子详情页 `/parent/stats/[childId]`
- **THEN** TopNavbar 显示标题「完成记录」

#### Scenario: 详情页无手动返回按钮
- **WHEN** 家长查看孩子详情页
- **THEN** 页面内容区域不显示额外的返回按钮
- **AND** 返回功能由 TopNavbar 的返回按钮提供