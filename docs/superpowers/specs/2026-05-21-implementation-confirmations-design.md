# 家庭积分兑换系统 - 实现前确认事项

## 1. CSS 变量与主题切换

### 1.1 实现方式

采用 **UnoCSS 配置引用 CSS 变量**，运行时通过 `data-role` 属性切换主题。

```typescript
// uno.config.ts
export default defineConfig({
  theme: {
    colors: {
      primary: 'var(--color-primary)',
      secondary: 'var(--color-secondary)',
      accent: 'var(--color-accent)',
      success: 'var(--color-success)',
      warning: 'var(--color-warning)',
      error: 'var(--color-error)',
      info: 'var(--color-info)',
    },
    fontSize: {
      xs: 'var(--font-size-xs)',
      sm: 'var(--font-size-sm)',
      base: 'var(--font-size-base)',
      lg: 'var(--font-size-lg)',
      xl: 'var(--font-size-xl)',
      '2xl': 'var(--font-size-2xl)',
    },
  },
})
```

### 1.2 CSS 变量定义位置

全局 CSS 文件：`assets/css/variables.css`

```css
/* 孩子端主题 */
:root[data-role='child'] {
  --color-primary: #FF6B6B;
  --color-secondary: #4ECDC4;
  --color-accent: #FFE66D;
  /* 其他孩子端变量 */
}

/* 家长端主题 */
:root[data-role='parent'] {
  --color-primary: #5B7FFF;
  --color-secondary: #34D399;
  /* 其他家长端变量 */
}
```

---

## 2. 动画实现

### 2.1 动画库

使用 **@vueuse/motion** 处理动画。

### 2.2 页面切换动画

采用 **滑动切换**，方向基于导航索引顺序：

| 导航顺序 | 切换行为 |
|---------|---------|
| 向前（低索引 → 高索引） | 左滑进入 |
| 向后（高索引 → 低索引） | 右滑进入 |

示例：
```
导航：[任务] [礼物] [我的]
当前「任务」，点击「礼物」 → 左滑进入
当前「礼物」，点击「任务」 → 右滑进入
```

### 2.3 积分变化动画

采用 **简单放大弹回** 效果：

```typescript
// 使用 @vueuse/motion
useMotion(target, {
  initial: { scale: 1 },
  enter: { scale: 1.2 },
  leave: { scale: 1 },
})
```

---

## 3. 反馈组件

### 3.1 Toast 提示

| 配置项 | 值 |
|--------|-----|
| 位置 | 底部居中 |
| 自动消失时长 | 2.5 秒 |
| 多触发处理 | 只显示最新的，新 Toast 覆盖旧的 |

### 3.2 Loading 加载状态

| 场景 | 样式 |
|------|------|
| 按钮内 loading | spinner 旋转图标 + 禁用按钮状态 |
| 列表区域 loading | 骨架屏，灰色块模拟内容结构 |
| 全局 loading | 半透明遮罩 + 中央 spinner |

### 3.3 确认弹窗

| 配置项 | 值 |
|--------|-----|
| 实现方式 | 自定义组件，完全按 UI 设计规范实现 |
| 调用方式 | Composable 函数调用 |

API 设计：

```typescript
// 在组件中使用
const { showConfirm } = useConfirm()

const confirmed = await showConfirm({
  title: '确认完成这个任务？',
  content: '任务：阅读书籍\n获得：10 积分',
  confirmText: '确认完成',
  cancelText: '取消',
})

// 返回 Promise<boolean>
if (confirmed) {
  // 用户点击确认
}
```

---

## 4. 表单验证

### 4.1 验证时机

采用 **blur + 提交双验证**：

| 时机 | 行为 |
|------|------|
| 输入框 blur 时 | 验证该字段，有错误立即显示 |
| 提交时 | 统一验证所有字段，有错误阻止提交 |

### 4.2 错误提示样式

- 位置：输入框下方
- 样式：红色文字
- 字号：14px

示例：
```
┌─────────────────────────────┐
│  用户名                      │
│  [________________]          │
│  用户名至少2个字符 ← 红色小字 │
└─────────────────────────────┘
```

---

## 5. 网络请求失败处理

采用 **仅 Toast 提示**：

- 显示"网络异常，请重试"或"操作失败"
- 用户可自行刷新页面或重新操作

---

## 6. 代码组织规范

### 6.1 组件命名

采用 **PascalCase**，如 `TaskCard.vue`。

### 6.2 组件目录组织

以组件为单位文件夹，`index.vue` 对外暴露，内部子组件不暴露：

```
components/
├── TaskCard/
│   ├── index.vue           # 对外暴露的主组件
│   ├── TaskButton.vue      # 内部子组件，不暴露
│   └── TaskDescription.vue # 内部子组件，不暴露
├── GiftCard/
│   ├── index.vue
│   └── GiftInfo.vue        # 内部子组件
├── PointsCard/
│   ├── index.vue
│   ├── PointsNumber.vue    # 积分数字展示（内部）
│   └── PointsStats.vue     # 累计/本周统计（内部）
├── Toast/
│   ├── index.vue           # 对外暴露
│   └── ToastItem.vue       # 单条 Toast（内部）
├── Confirm/
│   ├── index.vue           # 对外暴露
│   └── ConfirmDialog.vue   # 弹窗本体（内部）
├── Loading/
│   ├── index.vue           # 全局 loading（对外）
│   ├── Spinner.vue         # spinner 图标（内部）
│   ├── ButtonSpinner.vue   # 按钮 spinner（内部）
│   ├── Skeleton.vue        # 骨架屏（内部）
├── ...
```

使用方式：
- Nuxt 自动导入 `<TaskCard />` 或 `import TaskCard from '@/components/TaskCard'`
- 内部子组件不被自动导入，只在主组件内部引用

### 6.3 Composables 组织

采用 **扁平结构**：

```
composables/
├── useConfirm.ts      # 确认弹窗
├── useToast.ts        # Toast 提示
├── useLoading.ts      # Loading 控制
├── usePoints.ts       # 积分相关逻辑
├── useAuth.ts         # 认证相关逻辑
├── useTask.ts         # 任务相关逻辑
└── ...
```

Nuxt 自动导入，使用时直接调用 `useXxx()`。

### 6.4 类型定义

**就近使用位置定义**，在组件或 API 文件内部定义类型。

---

## 7. 状态管理

遵守 Nuxt/Vue 最佳实践：

| 场景 | 做法 |
|------|------|
| 页面数据获取 | `useFetch('/api/xxx')`，自动处理 loading/error |
| 操作后刷新 | 调用 `refresh()` 刷新数据 |
| 跨组件共享状态 | `useState('key', initialValue)` |
| 临时表单状态 | `reactive({...})` 组件内部管理 |

---

**文档版本：** v1.0
**创建日期：** 2026-05-21
**讨论参与：** 用户与 Claude Code
**关联文档：** [[UI设计规范]]、[[2026-05-21-tech-stack-design]]