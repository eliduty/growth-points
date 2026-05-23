## Why

家长端统计页显示"暂无孩子数据"，即使已添加孩子也无法显示统计数据。原因是统计 API 返回的字段名与前端类型定义不匹配，导致前端无法正确解析数据。

这是一个紧急的数据渲染 bug，需要立即修复。

## What Changes

- **修复 API 返回结构**：将 `/api/parent/stats` API 的返回字段名调整为与前端类型定义一致
  - `weekStart/weekEnd` → `weekRange.start/weekRange.end`
  - `stats` → `children`

## Capabilities

### New Capabilities

无新增能力。

### Modified Capabilities

- `parent-stats-api`: 修改 API 返回结构以匹配前端类型约定

## Impact

- **代码影响**：
  - `src/app/api/parent/stats/route.ts` - 修改返回数据结构
- **API 影响**：返回结构变更，但仅影响家长端统计页，无其他调用方
- **用户影响**：修复后家长端统计页将正确显示孩子数据和完成记录