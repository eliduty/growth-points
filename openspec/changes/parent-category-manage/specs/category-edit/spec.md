## ADDED Requirements

### Requirement: 分类管理入口可见
系统 SHALL 在任务页面提供分类管理的入口按钮，确保用户在有数据时也能进入分类管理弹窗。

#### Scenario: TopNavbar 显示管理按钮
- **WHEN** 用户进入家长端任务页面
- **THEN** TopNavbar 右侧显示"管理分类"按钮（齿轮图标）

#### Scenario: CategorySection 显示快捷入口
- **WHEN** 任务页面有分类数据
- **THEN** 每个分类标题右侧显示小齿轮图标按钮

#### Scenario: 点击入口打开管理弹窗
- **WHEN** 用户点击 TopNavbar 或 CategorySection 的管理按钮
- **THEN** 系统打开分类管理弹窗

### Requirement: 分类名称可修改
系统 SHALL 允许用户修改已有分类的名称。

#### Scenario: 点击名称进入编辑模式
- **WHEN** 用户在分类管理弹窗中点击某个分类的名称
- **THEN** 名称变为输入框，自动聚焦，原有名称作为初始值

#### Scenario: 输入新名称并保存
- **WHEN** 用户在编辑状态下输入新名称并按下回车或点击保存按钮
- **THEN** 系统调用 API 更新分类名称，显示成功提示

#### Scenario: 取消编辑
- **WHEN** 用户在编辑状态下按下 Esc 或点击取消按钮
- **THEN** 系统恢复原有名称，退出编辑模式

#### Scenario: 名称重复检查
- **WHEN** 用户输入的名称与其他分类重复
- **THEN** 系统显示错误提示"类别名称已存在"，不保存更改

#### Scenario: 编辑状态禁用拖拽
- **WHEN** 分类处于编辑状态
- **THEN** 该分类项禁用拖拽功能，防止误操作

### Requirement: API 支持分类名称更新
系统 SHALL 提供 API 接口用于更新分类名称。

#### Scenario: 成功更新分类名称
- **WHEN** 调用 `PUT /api/parent/categories/[id]` 请求体包含有效的 `{ name: string }`
- **THEN** 系统更新分类名称并返回成功响应

#### Scenario: 名称重复拒绝更新
- **WHEN** 调用 API 传入的名称与同家庭其他分类重复
- **THEN** 系统返回错误响应，错误码 4002，消息"类别名称已存在"

#### Scenario: 分类不存在
- **WHEN** 调用 API 传入不存在的分类 ID
- **THEN** 系统返回错误响应，错误码 4003，消息"类别不存在"