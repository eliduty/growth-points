## 1. 准备工作

- [x] 1.1 创建 `public/` 目录

## 2. 应用图标

- [x] 2.1 创建应用图标 SVG 设计源文件（蓝紫背景 + 白色家图标 + 金色星星）
- [x] 2.2 生成 `public/icon-192.png`（Android 标准）
- [x] 2.3 生成 `public/icon-512.png`（Android 大图）
- [x] 2.4 生成 `public/apple-touch-icon.png`（iOS 180x180）
- [x] 2.5 生成 `public/favicon.png`（浏览器标签）

## 3. Web App Manifest

- [x] 3.1 创建 `public/manifest.json`（定义应用名称、图标、启动行为）

## 4. Layout 配置

- [x] 4.1 修改 `src/app/layout.tsx`，添加 manifest 和图标链接配置

## 5. 验证

- [x] 5.1 本地启动应用，验证 manifest 加载成功
- [x] 5.2 使用 Chrome DevTools 验证 PWA 安装提示
- [x] 5.3 测试移动端添加到主屏幕功能