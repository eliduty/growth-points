# 家长端设置页样式重构设计文档

## 目标

将家长端设置页（src/app/parent/settings/page.tsx）按照 parent-settings.html 设计稿进行完整重构，统一视觉风格，优化用户交互体验。

## 当前实现 vs 设计稿差异

| 模块 | 当前实现 | 设计稿 |
|------|----------|--------|
| 成员管理 | 两个独立区块（孩子成员、家长成员） | 统一区块，内部分组展示 |
| 成员展示 | 2列卡片网格（网格布局） | 单列列表（每行一个成员） |
| 删除交互 | 长按卡片触发 | 点击删除按钮触发 |
| 兑换日设置 | 图标+文本+按钮横向排列 | "当前设置"标签+值左右布局 |
| 个人信息 | 头像+用户名+角色三行 | 仅用户名一行 |
| 退出登录 | 红色破坏按钮 | 白色背景带边框，hover变红 |

## 设计规范

### 色彩规范

```css
--color-primary: #5B7FFF;
--color-primary-light: #7B9FFF;
--color-secondary: #34D399;
--color-success: #34D399;
--color-error: #EF4444;
--text-primary: #1F2937;
--text-secondary: #6B7280;
--text-muted: #9CA3AF;
--bg-card: #FFFFFF;
```

### 间距与圆角

```css
--radius-card: 12px;
--radius-button: 8px;
--radius-input: 8px;
--nav-height: 56px;
```

### 阴影

```css
--shadow-card: 0 2px 8px rgba(91, 127, 255, 0.08), 0 1px 2px rgba(91, 127, 255, 0.04);
```

## 组件结构

### 1. 成员管理区块 (SettingsSection)

#### 区块头部
- 背景：线性渐变 #F9FAFB → #F5F7FF
- 标题：带 Users 图标（SVG）
- 圆角：顶部 12px

#### 成员分组

**孩子分组：**
- 标签：Smile 图标 + "孩子"文字
- 成员列表：单列，每项有底部边框 1px #E5E7EB
- 成员项结构：
  - 头像：32x32px，圆角 8px，橙色渐变（#FFF0E8 → #FFE8DC），内含 Smile 图标
  - 用户名：14px，text-primary
  - 删除按钮：边框按钮，hover 边框和文字变 #EF4444
- 添加按钮：渐变蓝色（#5B7FFF → #7B9FFF），白色文字，圆角 8px，带阴影

**家长分组：**
- 标签：UserCog 图标 + "家长"文字
- 成员项结构同上，但：
  - 头像：蓝色渐变（#E8F0FE → #F0F4FF），内含 User 图标
  - 当前用户显示 "(你)" 标签
  - 当前用户删除按钮隐藏（visibility: hidden）

### 2. 兑换日设置区块

#### 当前设置行
- 左侧：Clock 图标 + "当前设置"标签（text-secondary）
- 右侧：值（text-primary，font-weight: 500）
- 底部分割线：1px #E5E7EB

#### 修改设置按钮
- 背景：白色
- 边框：1px #E5E7EB
- 文字：主色 #5B7FFF
- 图标：Settings 图标
- hover：背景变主色，文字变白，图标变白

### 3. 个人信息区块

- 单行布局：User 图标 + "用户名"标签左侧，值右侧
- 无分割线

### 4. 退出登录区块

- 按钮：全宽，白色背景，边框 1px #E5E7EB
- 图标：LogOut 图标（text-secondary）
- 文字：text-secondary
- hover：边框和文字变 #EF4444，图标同步变红

## 交互设计

### 删除成员

1. 用户点击成员行右侧"删除"按钮
2. 弹出删除确认弹窗：
   - 警告图标（红色背景）
   - 标题："确认删除 [成员类型] 账号？"
   - 内容："将删除：[用户名] 的账号"
   - 补充说明："包括：所有完成记录、兑换记录"
   - 提示："此操作不可恢复"（红色文字，带 Info 图标）
   - 按钮：取消（边框）+ 确认删除（红色填充）

### 添加成员

1. 用户点击"添加孩子/添加家长"按钮
2. 弹出添加弹窗：
   - 头部：对应图标 + 标题（添加孩子/添加家长）
   - 表单：用户名输入框、密码输入框
   - 底部按钮：取消 + 确认添加（渐变蓝色主按钮）

### 兑换日设置

1. 用户点击"修改设置"按钮
2. 弹出兑换日设置弹窗：
   - 头部：Calendar 图标 + "设置兑换日"
   - 内容：说明文字 + 星期选择网格（4列）
   - 选中项：渐变蓝色背景，白色文字
   - 未选中：#F9FAFB 背景，边框 1px #E5E7EB
   - 底部按钮：取消 + 确认保存

## 动画规范

### 页面加载
- 各区块依次淡入：
  - 动画：fadeIn 0.4s ease-out backwards
  - 关键帧：opacity 0→1, translateY 8px→0
  - 延迟：第1个 0.1s，第2个 0.2s，第3个 0.3s

### 弹窗动画
- 遮罩：fadeInOverlay 200ms ease-out（opacity 0→1）
- 弹窗：popIn 200ms ease-out（scale 0.9→1, opacity 0→1）

### 按钮交互
- 所有按钮：150ms ease-out 过渡
- hover 效果：translateY(-1px) + 阴影增强

## 文件结构

```
src/app/parent/settings/page.tsx          # 主页面（需大幅重构）
src/components/parent/MemberListItem.tsx    # 新增：成员列表项组件
src/components/parent/MemberGroup.tsx       # 新增：成员分组组件（可选）
```

## 依赖

- lucide-react：图标（Users, Smile, UserCog, User, Trash2, UserPlus, Clock, Settings, LogOut, Calendar, CheckCircle2, AlertTriangle, Info, BarChart3, ListTodo, Gift）
- framer-motion：页面加载动画（可复用现有）

## 验收标准

- [ ] 成员管理统一为一个区块，内部按孩子/家长分组
- [ ] 成员展示为单列列表，每项包含方形头像+用户名+删除按钮
- [ ] 删除按钮点击触发确认弹窗（非长按）
- [ ] 兑换日设置改为"当前设置"标签+值左右布局
- [ ] 个人信息仅显示用户名一行
- [ ] 退出登录按钮样式为白色背景带边框，hover变红
- [ ] 所有动画效果与设计稿一致
- [ ] 弹窗样式与设计稿一致（标题图标、表单布局、按钮样式）
