## Context

这是一个 Next.js 14 项目，目前缺少 PWA 相关配置。用户希望在移动端能够将应用添加到主屏幕，像原生 App 一样启动。

当前状态：
- 无 `public/` 目录
- 无 `manifest.json`
- 无应用图标文件
- `layout.tsx` 仅有基础 metadata

设计约束：
- 使用 Next.js 14 的 Metadata API（不使用 next-pwa 插件，保持简单）
- 图标设计需与应用现有视觉风格一致（家长蓝紫 #5B7FFF、孩子橙红 #FF6B35）
- 暂不添加 Service Worker（后续可扩展）

## Goals / Non-Goals

**Goals:**
- 实现基础的"添加到主屏幕"功能
- Android Chrome 自动弹出安装提示
- iOS Safari 手动添加支持
- 图标设计与应用品牌一致

**Non-Goals:**
- 离线访问能力（需要 Service Worker，后续扩展）
- 推送通知
- 后台同步

## Decisions

### D1: 不使用 next-pwa 插件

**选择**: 手动配置 manifest + 图标
**原因**:
- 功能需求简单，只需 manifest 和图标
- next-pwa 引入 Service Worker 复杂性
- 避免额外的构建配置
- 后续需要离线能力时可升级

**替代方案**: next-pwa 插件
- 优点：自动化，支持离线缓存
- 缺点：引入 Workbox 依赖，构建配置复杂

### D2: 图标设计采用简约单色方案

**选择**: 蓝紫色 (#5B7FFF) 背景 + 白色家图标 + 金色星星点缀
**原因**:
- 与首页现有 Logo 风格一致
- 单色背景在小尺寸时更清晰
- 更稳重，适合作为品牌标识

**替代方案**: 双色渐变（蓝紫到橙红）
- 优点：体现双角色特点
- 缺点：小尺寸时渐变效果不清晰

### D3: 使用 Next.js Metadata API

**选择**: 在 `layout.tsx` 中配置 manifest 和图标
**原因**:
- Next.js 14 内置支持
- 无需额外配置文件
- 类型安全

## Risks / Trade-offs

**图标更新维护** → 设计源文件（SVG）保留，方便后续修改

**iOS 无自动提示** → 用户需手动操作（Safari 分享 → 添加到主屏幕），这是平台限制

**无离线能力** → 首期不实现，后续需要时可升级到 next-pwa