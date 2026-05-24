## ADDED Requirements

### Requirement: 底部导航激活指示器

孩子端底部导航栏 SHALL 在激活项上方显示橙色横条指示器。

#### Scenario: 激活项显示指示器
- **WHEN** 用户位于孩子端任意页面（任务、礼物、个人）
- **THEN** 对应导航项上方 SHALL 显示24px宽、3px高的橙色横条
- **AND** 横条 SHALL 从透明渐变到可见（opacity transition）

#### Scenario: 切换页面时指示器变化
- **WHEN** 用户点击底部导航切换页面
- **THEN** 原激活项的指示器 SHALL 消失（opacity → 0）
- **AND** 新激活项的指示器 SHALL 出现（opacity → 1）

### Requirement: 底部导航hover上浮效果

孩子端底部导航项 SHALL 在鼠标悬停时产生上浮效果。

#### Scenario: hover时图标上浮
- **WHEN** 用户鼠标悬停在底部导航项上
- **THEN** 导航图标 SHALL 向上移动2px（translateY -2px）
- **AND** transition SHALL 为0.2秒

### Requirement: 登录页装饰星星

孩子端登录页 SHALL 显示四颗装饰星星并带有闪烁动画。

#### Scenario: 显示装饰星星
- **WHEN** 用户访问孩子端登录页
- **THEN** 登录卡片 SHALL 在四角显示黄色星星（左上、右上、左下、右下各一颗）
- **AND** 星星 SHALL 交替闪烁（scale + rotate动画，2秒周期）

### Requirement: 登录页底部渐变装饰条

孩子端登录卡片 SHALL 在底部显示彩色渐变装饰条。

#### Scenario: 显示渐变装饰条
- **WHEN** 用户访问孩子端登录页
- **THEN** 登录卡片底部 SHALL 显示渐变装饰条
- **AND** 渐变 SHALL 为 橙→青→黄→橙 组合
- **AND** 装饰条高度 SHALL 为10px

### Requirement: 登录按钮光泽动画

孩子端登录按钮 SHALL 在hover时显示光泽扫过效果。

#### Scenario: hover时光泽扫过
- **WHEN** 用户鼠标悬停在登录按钮上
- **THEN** 按钮 SHALL 显示白色半透明光泽从左向右扫过
- **AND** 光泽 SHALL 在0.5秒内完成扫过动画

### Requirement: 礼物卡片彩色渐变背景

孩子端礼物卡片 SHALL 使用彩色渐变背景。

#### Scenario: 显示渐变背景
- **WHEN** 用户查看礼物兑换页面
- **THEN** 每个礼物卡片 SHALL 使用彩色渐变背景
- **AND** 渐变颜色 SHALL 包括：橙(#FF6B35→#FF8A50)、青(#4ECDC4→#7FDBDA)、黄(#FFD93D→#FFE066)、蓝(#60A5FA→#93C5FD)、紫(#A78BFA→#C4B5FD)

#### Scenario: 礼物颜色分配
- **WHEN** 系统渲染礼物列表
- **THEN** 礼物 SHALL 按顺序轮换使用不同渐变背景色

### Requirement: 礼物卡片布局优化

孩子端礼物卡片 SHALL 使用原型图设计的布局结构。

#### Scenario: 卡片布局结构
- **WHEN** 用户查看礼物卡片
- **THEN** 卡片 SHALL 分为两部分：上方彩色背景区域、下方积分信息区域
- **AND** 彩色背景区域 SHALL 显示礼物图标和礼物名称
- **AND** 积分信息区域 SHALL 显示积分数值和星形图标

### Requirement: 个人页用户信息卡片渐变背景

孩子端个人页用户信息卡片 SHALL 使用橙色渐变背景。

#### Scenario: 显示渐变背景
- **WHEN** 用户访问孩子端个人中心页面
- **THEN** 用户信息卡片 SHALL 使用橙色渐变背景(#FF6B35→#FF8A50)
- **AND** 卡片 SHALL 有旋转动画背景效果（20秒周期）

### Requirement: Tab样式优化

孩子端个人页Tab SHALL 显示图标和激活底部边框。

#### Scenario: Tab显示图标
- **WHEN** 用户查看个人中心Tab区域
- **THEN** 每个Tab SHALL 显示对应图标（任务历史：列表图标，礼物历史：礼物图标）
- **AND** 激活Tab SHALL 有底部边框（橙色，2px）

### Requirement: 周分组样式优化

孩子端历史记录周分组 SHALL 显示日历图标和折叠箭头。

#### Scenario: 显示周分组图标
- **WHEN** 用户查看历史记录周分组
- **THEN** 每个周分组 SHALL 显示日历图标
- **AND** 折叠状态 SHALL 显示右箭头，展开状态 SHALL 显示下箭头（旋转180度）

### Requirement: 周统计卡片样式

孩子端历史记录周统计卡片 SHALL 使用渐变背景。

#### Scenario: 显示周统计卡片
- **WHEN** 用户展开某周的历史记录
- **THEN** 周统计区域 SHALL 显示渐变背景(#FFF8F0→#FFEDD8)
- **AND** 统计信息 SHALL 包括：完成任务数、获得积分