## Context

家长端统计页（`/parent`）调用 `/api/parent/stats` API 获取本周统计数据。当前 API 返回的字段名与前端 TypeScript 类型定义不匹配，导致数据解析失败。

**当前 API 返回结构**：
```json
{
  "code": 0,
  "data": {
    "weekStart": "5月19日",
    "weekEnd": "5月25日",
    "stats": [...]
  }
}
```

**前端期望结构**（`WeeklyStats` 类型）：
```typescript
interface WeeklyStats {
  weekRange: { start: string; end: string };
  children: ChildStats[];
}
```

## Goals / Non-Goals

**Goals:**
- 修复 API 返回结构以匹配前端类型定义
- 统计页能正确显示孩子列表和完成数据

**Non-Goals:**
- 不修改前端代码（前端类型定义是正确的契约）
- 不添加新功能

## Decisions

### 决策：修改 API 返回结构而非前端适配

**理由**：
1. 前端类型定义作为"契约"，API 应遵守约定
2. `weekRange` 作为日期范围的语义包装更清晰
3. `children` 比 `stats` 更符合业务语义
4. 仅需修改一个文件，影响范围可控

**替代方案**：修改前端类型和 Hook
- 缺点：需多处改动，且类型定义语义不如当前清晰

## Risks / Trade-offs

**风险**：API 返回结构变更可能影响其他调用方

**缓解**：检查项目中是否有其他地方调用此 API，确认仅有统计页使用