## 1. Toaster 配置

- [x] 1.1 `src/components/ui/toast.tsx`：启用 `richColors`，删除 `classNames`、`style`、`duration={5000}`，保留 `position="top-center"`

## 2. 清理手写样式

- [x] 2.1 `src/app/globals.css`：删除「Toast 通知样式」注释起的全部 `[data-sonner-toast]` 手写样式（约 50 行，含 `!important` 声明）

## 3. 验证

- [x] 3.1 验证四种类型通知的 richColors 视觉（success/error/warning/info 着色与图标正确）
- [x] 3.2 验证位置 top-center、默认 4s 消失与 hover 暂停；拖拽关闭为 sonner 上游手势，Playwright 合成事件无法复现（对照实验：改动前同样不触发），diff 未触碰交互代码，不构成回归
- [x] 3.3 抽查家长端与孩子端各一处触发场景（如创建任务成功、撤销失败），确认调用点无需改动
- [x] 3.4 运行 typecheck 与 build 通过
