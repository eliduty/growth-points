## 1. 修复 API 返回结构

- [x] 1.1 修改 `/api/parent/stats/route.ts` 返回结构，将 `weekStart/weekEnd` 改为 `weekRange.start/weekRange.end`
- [x] 1.2 将 `stats` 字段名改为 `children`

## 2. 验证修复

- [x] 2.1 启动开发服务器，验证统计页能正确显示孩子数据
- [x] 2.2 确认日期范围正确显示（如 "5月19日 ~ 5月25日"）
- [x] 2.3 确认孩子完成记录和积分数据正确显示