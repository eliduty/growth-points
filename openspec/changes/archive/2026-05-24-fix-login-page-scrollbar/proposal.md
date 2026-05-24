## Why

家长和孩子登录页出现不必要的滚动条，影响用户体验。原因是布局层为登录页添加了导航预留padding（顶部56px + 底部56px），但登录页没有导航栏，导致总高度超过视口。

## What Changes

- 修改家长端布局 (`src/app/parent/layout.tsx`)：登录页时不添加导航padding
- 修改孩子端布局 (`src/app/child/layout.tsx`)：登录页时不添加导航padding
- 登录页自身样式保持不变，无需修改

## Capabilities

### New Capabilities

无新能力引入。

### Modified Capabilities

无现有能力的需求变更。这是一个纯实现层面的bug修复。

## Impact

- `src/app/parent/layout.tsx` - 条件渲染布局容器样式
- `src/app/child/layout.tsx` - 条件渲染布局容器样式