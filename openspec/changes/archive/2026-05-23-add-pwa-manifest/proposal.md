## Why

移动端用户希望能够将应用"添加到主屏幕"，像原生 App 一样从图标启动。这是 PWA（Progressive Web App）的核心体验，能提升用户粘性和使用便捷性。当前应用缺少 Web App Manifest 和应用图标，无法支持此功能。

## What Changes

- 创建 `public/` 目录存放静态资源
- 新增 `manifest.json` — Web App Manifest，定义应用名称、图标、启动行为
- 新增应用图标文件 — 多种尺寸适配 Android/iOS
- 修改 `src/app/layout.tsx` — 引入 manifest 和图标链接

## Capabilities

### New Capabilities

- `pwa-install`: PWA 添加到主屏幕能力，包含 manifest 配置和图标资源

### Modified Capabilities

无现有能力需要修改。

## Impact

- 新增目录：`public/`
- 新增文件：`public/manifest.json`, `public/icon-192.png`, `public/icon-512.png`, `public/apple-touch-icon.png`, `public/favicon.ico`
- 修改文件：`src/app/layout.tsx`（添加 metadata 配置）
- 无 API 或数据库变更
- 无破坏性变更