## ADDED Requirements

### Requirement: 应用可添加到主屏幕

应用 SHALL 支持移动端用户将其添加到设备主屏幕，作为独立应用图标启动。

#### Scenario: Android Chrome 安装提示
- **WHEN** 用户在 Android Chrome 上访问应用
- **THEN** 浏览器自动检测 manifest 并弹出"添加到应用"提示

#### Scenario: iOS Safari 手动添加
- **WHEN** 用户在 iOS Safari 上点击"分享" → "添加到主屏幕"
- **THEN** 应用图标出现在主屏幕，点击后独立启动

### Requirement: 应用图标清晰可辨识

应用 SHALL 提供多种尺寸的图标，确保在各设备上清晰显示。

#### Scenario: Android 标准图标
- **WHEN** Android 设备显示应用图标
- **THEN** 使用 192x192 PNG 图标

#### Scenario: Android 大图标
- **WHEN** Android 设备在启动器或商店展示大图
- **THEN** 使用 512x512 PNG 图标

#### Scenario: iOS 图标
- **WHEN** iOS 设备显示应用图标
- **THEN** 使用 180x180 PNG 图标（apple-touch-icon）

#### Scenario: 浏览器标签图标
- **WHEN** 用户在浏览器标签页查看应用
- **THEN** 显示 favicon.ico

### Requirement: 应用名称和品牌一致

Manifest SHALL 定义与应用品牌一致的应用名称和视觉风格。

#### Scenario: 应用名称
- **WHEN** 用户查看应用图标下的名称
- **THEN** 显示"积分系统"或"家庭积分"（简短名称）

#### Scenario: 启动行为
- **WHEN** 用户点击主屏幕图标启动应用
- **THEN** 应用以 standalone 模式启动（无浏览器 UI）
- **AND** 从首页 `/` 开始

#### Scenario: 主题色
- **WHEN** 应用在 Android 上显示状态栏
- **THEN** 状态栏使用蓝紫色 (#5B7FFF) 主题色