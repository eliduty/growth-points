## Why

家长端确认礼物兑换的弹窗使用手写的 `fixed` 定位实现，没有处理内容溢出情况。当弹窗内容高度超过屏幕高度时，弹窗顶部会超出视口，用户无法看到完整内容或关闭弹窗。同时，这种实现方式与项目其他弹窗（使用 shadcn/ui Dialog）不一致，增加了维护成本。

## What Changes

- 将确认兑换弹窗从手写实现改为使用 shadcn/ui Dialog 组件
- 移除 `AnimatePresence` 和手写的遮罩层、弹窗层
- 添加溢出处理（`max-h-[85vh] overflow-y-auto`）确保内容不会超出屏幕
- 保持现有视觉样式和交互逻辑不变

## Capabilities

### New Capabilities

无。这是一个纯实现层面的修复，不引入新功能。

### Modified Capabilities

无。弹窗的交互逻辑和视觉样式保持不变，只是底层实现方式改变，不涉及 spec 级别的需求变更。

## Impact

- **代码影响**：`src/app/parent/gifts/page.tsx` 第 286-368 行的弹窗实现代码
- **依赖变更**：需要导入 `Dialog` 和 `DialogContent` 组件（已存在于项目中）
- **API 影响**：无
- **用户体验**：修复后弹窗在任何屏幕尺寸下都能正常显示