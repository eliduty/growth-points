## Context

家长端礼物兑换确认弹窗当前使用手写实现：
- 使用 `fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]` 居中定位
- 使用 Framer Motion `AnimatePresence` 和 `motion.div` 实现动画
- 没有设置最大高度和溢出处理

项目中大多数弹窗使用 shadcn/ui Dialog 组件（基于 Radix UI），该组件自动处理视口边界和内容溢出。

## Goals / Non-Goals

**Goals:**
- 将确认兑换弹窗改为使用 shadcn/ui Dialog 组件
- 确保弹窗在任何屏幕尺寸下都能完整显示
- 保持现有视觉样式和交互逻辑不变
- 与项目其他弹窗实现保持一致

**Non-Goals:**
- 不改变弹窗的视觉设计（图标、颜色、文案等）
- 不添加新的弹窗功能
- 不重构其他使用手写实现的弹窗

## Decisions

### 决策 1：使用 shadcn/ui Dialog 替代手写实现

**理由**：
- 项目中已有 7 个弹窗使用 Dialog（AddGiftDialog、ExchangeDaysDialog 等）
- Dialog 基于 Radix UI，自动处理视口边界和溢出
- 统一的实现方式便于维护

**替代方案**：
- 方案 B：在手写弹窗上添加 `max-h-[85vh] overflow-y-auto` → 改动小但不一致，未来可能再次出现类似问题

### 决策 2：DialogContent 样式配置

使用 `max-h-[85vh] overflow-y-auto` 处理溢出（参考 ExchangeDaysDialog 的实现）。

**样式对照**：
| 属性 | 手写实现 | Dialog 实现 |
|------|----------|-------------|
| 宽度 | `w-[90%] max-w-[340px]` | `sm:max-w-[340px]` |
| 最大高度 | 无 | `max-h-[85vh]` |
| 溢出 | 无 | `overflow-y-auto` |

## Risks / Trade-offs

- **视觉差异**：Dialog 默认有关闭按钮（X），手写实现没有 → 可接受，其他弹窗都有关闭按钮
- **动画差异**：Radix 内置动画 vs Framer Motion scale 动画 → 可接受，动画效果相似