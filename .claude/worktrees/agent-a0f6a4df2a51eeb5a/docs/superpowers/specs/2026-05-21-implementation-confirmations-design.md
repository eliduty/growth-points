# 家庭积分兑换系统 - 实现前确认事项

## 1. CSS 变量与主题切换

### 1.1 实现方式

采用 **Tailwind CSS 配置引用 CSS 变量**，运行时通过 `data-role` 属性切换主题。

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
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
  },
}
```

### 1.2 CSS 变量定义位置

全局 CSS 文件：`app/globals.css`

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

使用 **Framer Motion** 处理动画。

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
// 使用 Framer Motion
<motion.div
  initial={{ scale: 1 }}
  animate={{ scale: 1.2 }}
  transition={{ duration: 0.2, repeat: 1, repeatType: 'reverse' }}
>
  {points}
</motion.div>
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
| 调用方式 | React Hook 调用 |

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

采用 **PascalCase**，如 `TaskCard.tsx`。

### 6.2 组件目录组织

以组件为单位文件夹，`index.tsx` 对外暴露，内部子组件不暴露：

```
components/
├── TaskCard/
│   ├── index.tsx           # 对外暴露的主组件
│   ├── TaskButton.tsx      # 内部子组件，不暴露
│   └── TaskDescription.tsx # 内部子组件，不暴露
├── GiftCard/
│   ├── index.tsx
│   └── GiftInfo.tsx        # 内部子组件
├── PointsCard/
│   ├── index.tsx
│   ├── PointsNumber.tsx    # 积分数字展示（内部）
│   └── PointsStats.tsx     # 累计/本周统计（内部）
├── Toast/
│   ├── index.tsx           # 对外暴露
│   └── ToastItem.tsx       # 单条 Toast（内部）
├── Confirm/
│   ├── index.tsx           # 对外暴露
│   └── ConfirmDialog.tsx   # 弹窗本体（内部）
├── Loading/
│   ├── index.tsx           # 全局 loading（对外）
│   ├── Spinner.tsx         # spinner 图标（内部）
│   ├── ButtonSpinner.tsx   # 按钮 spinner（内部）
│   ├── Skeleton.tsx        # 骨架屏（内部）
├── ...
```

使用方式：
- 直接导入 `import TaskCard from '@/components/TaskCard'`
- 内部子组件只在主组件内部引用

### 6.3 Hooks 组织

采用 **扁平结构**：

```
hooks/
├── useConfirm.ts      # 确认弹窗
├── useToast.ts        # Toast 提示
├── useLoading.ts      # Loading 控制
├── usePoints.ts       # 积分相关逻辑
├── useAuth.ts         # 认证相关逻辑
├── useTask.ts         # 任务相关逻辑
└── ...
```

使用时直接调用 `useXxx()`。

### 6.4 类型定义

**就近使用位置定义**，在组件或 API 文件内部定义类型。

---

## 7. 状态管理

遵守 React/Next.js 最佳实践：

| 场景 | 做法 |
|------|------|
| 页面数据获取 | Server Components 直接查询，或 Client Components 使用 `useSWR` / `useQuery` |
| 操作后刷新 | 调用 `mutate()` 或重新获取数据 |
| 跨组件共享状态 | React Context 或 Zustand |
| 临时表单状态 | `useState` / `useReducer` 组件内部管理 |

---

## 8. 输入规则

### 8.1 用户名规则

| 规则 | 值 |
|------|-----|
| 最小长度 | 2 字符 |
| 最大长度 | 20 字符 |
| 字符限制 | 仅允许中文、英文、数字 |

### 8.2 密码规则

| 规则 | 值 |
|------|-----|
| 最小长度 | 6 位 |
| 最大长度 | 32 位 |
| 复杂度要求 | 无强制要求 |

### 8.3 积分范围

| 类型 | 规则 |
|------|------|
| 任务积分 | 不限制 |
| 礼物积分 | 不限制 |

### 8.4 类别名称

不限制长度。

---

## 9. API 响应格式

### 9.1 统一响应结构

```typescript
{
  code: number,     // 0 成功，其它失败
  data: T,          // 成功时返回数据
  message: string   // 提示信息
}
```

### 9.2 错误码定义方式

实现时按需定义，每个错误对应一个 code，message 是匹配的提示信息。

---

## 10. 里程碑庆祝动画

UI 设计规范定义了积分里程碑（100、500、1000）的庆祝动画（星星飞舞、彩带飘落等）。

**决策：MVP 不实现，后续迭代添加。**

---

**文档版本：** v2.0
**创建日期：** 2026-05-21
**更新日期：** 2026-05-22
**讨论参与：** 用户与 Claude Code
**关联文档：** [[UI设计规范]]、[[2026-05-21-family-mechanism-design]]
**更新内容：** 技术栈调整为 Next.js/React