## 1. 准备工作

- [x] 1.1 添加 Dialog 和 DialogContent 导入（从 `@/components/ui/dialog`）
- [x] 1.2 移除不再需要的 AnimatePresence 导入（检查是否还有其他使用）

## 2. 弹窗实现修改

- [x] 2.1 将手写弹窗代码替换为 `<Dialog open={...} onOpenChange={...}>` 结构
- [x] 2.2 配置 DialogContent 样式：`className="sm:max-w-[340px] max-h-[85vh] overflow-y-auto"`
- [x] 2.3 保持弹窗内部内容结构不变（图标、标题、详情、提示、按钮）

## 3. 代码清理

- [x] 3.1 移除 AnimatePresence 包裹和手写遮罩层代码
- [x] 3.2 移除手写弹窗层（motion.div）相关代码
- [x] 3.3 验证无其他地方使用 AnimatePresence 后移除导入