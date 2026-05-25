## ADDED Requirements

### Requirement: 家长可设置任务可用日期

系统 SHALL 允许家长为任务设置可用日期（周一至周日）。未设置日期的任务 SHALL 处于"待安排"状态，孩子端不显示。

#### Scenario: 设置任务为每天可用
- **WHEN** 家长选择"每天"选项
- **THEN** 任务 availableDays 存储为 "0,1,2,3,4,5,6"

#### Scenario: 设置任务为特定日期可用
- **WHEN** 家长勾选"周二"和"周四"复选框
- **THEN** 任务 availableDays 存储为 "1,3"（排序后）

#### Scenario: 任务未设置日期
- **WHEN** 家长创建任务但未选择可用日期
- **THEN** 任务 availableDays 为 null，家长端显示"待安排"标记，孩子端不显示

### Requirement: 孩子端任务按日期分组显示

系统 SHALL 按三层结构显示任务：今日待办（今天可用的未完成任务）、已完成（今天完成的任务）、其他时间（今天不可用的任务）。

#### Scenario: 查看今日待办任务
- **WHEN** 孩子打开任务列表且今天是周二
- **AND** 有任务的 availableDays 包含 "1"（周二）
- **THEN** 这些任务显示在"今日待办"分组

#### Scenario: 查看其他时间任务
- **WHEN** 孩子打开任务列表且今天是周二
- **AND** 有任务的 availableDays 为 "3,5"（周三、周五）
- **THEN** 这些任务显示在"其他时间"分组，灰色样式，标注"周三、周五"

#### Scenario: 完成任务后移到已完成区域
- **WHEN** 孩子完成一个"今日待办"任务
- **THEN** 任务从"今日待办"消失，出现在"已完成"分组

### Requirement: 不可用任务有交互限制

系统 SHALL 对今天不可用的任务显示灰色样式，点击时提示限制信息，不允许完成操作。

#### Scenario: 点击不可用任务
- **WHEN** 孩子点击"其他时间"分组的任务
- **THEN** 弹窗显示"这个任务周三才能做哦"
- **AND** 不允许完成操作

#### Scenario: 点击今日待办任务
- **WHEN** 孩子点击"今日待办"分组的任务
- **THEN** 弹窗确认完成，允许完成操作

### Requirement: 后端校验可用日期格式

系统 SHALL 校验 availableDays 格式：必须是逗号分隔的数字字符串，每个数字 ∈ {0,1,2,3,4,5,6}。校验失败返回 400 错误。

#### Scenario: 提交有效日期格式
- **WHEN** 家长提交 availableDays 为 "1,3,5"
- **THEN** 后端去重、排序后存储为 "1,3,5"

#### Scenario: 提交无效日期格式
- **WHEN** 家长提交 availableDays 为 "1,7,8"
- **THEN** 后端返回 400 错误

#### Scenario: 提交非数字格式
- **WHEN** 家长提交 availableDays 为 "a,b,c"
- **THEN** 后端返回 400 错误

### Requirement: 家长端显示任务状态

系统 SHALL 在家长端任务列表显示任务状态：待安排（availableDays 为 null）显示标记，已安排显示可用日期摘要。

#### Scenario: 查看待安排任务
- **WHEN** 家长查看任务列表
- **AND** 任务的 availableDays 为 null
- **THEN** 显示"待安排"标记

#### Scenario: 查看已安排任务
- **WHEN** 家长查看任务列表
- **AND** 任务的 availableDays 为 "0,1,2,3,4,5,6"
- **THEN** 显示"每天"

#### Scenario: 查看特定日期任务
- **WHEN** 家长查看任务列表
- **AND** 任务的 availableDays 为 "1"
- **THEN** 显示"仅周二"