## Why

项目部署在 EdgeOne 边缘环境时返回 545 错误（Error return from script）。原因是 middleware.ts 使用了 iron-session 库，而 iron-session 依赖 Node.js 原生模块（`node:async_hooks`、`node:buffer`）。EdgeOne 边缘运行时基于 V8/Worker，不支持这些 Node.js 原生模块。

需要将 iron-session 替换为使用 Web Crypto API 的 JWT 实现（jose 库），确保边缘环境兼容。

## What Changes

- 移除 iron-session 依赖，替换为 jose（JWT 库）
- 重写 `src/lib/auth/session.ts`：使用 jose 实现 JWT 签名和验证
- 修改 `src/middleware.ts`：直接从 request.cookies 读取 JWT 并验证
- 更新 `src/lib/constants.ts`：移除 SESSION_CONFIG，添加 JWT 配置
- 删除废弃的 `src/lib/session.ts`
- 更新 `.env` 环境变量配置

## Capabilities

### New Capabilities

- `jwt-session`: JWT + Cookie 的 session 管理机制，使用 jose 库实现

### Modified Capabilities

无。session 接口保持不变（createSession, clearSession, getCurrentUserId 等），只是实现方式改变。

## Impact

- **middleware.ts**：使用 jose.jwtVerify() 验证 JWT，无数据库查询
- **session.ts**：使用 jose.SignJWT() 创建 token，使用 jose.jwtVerify() 验证
- **API routes**：接口不变，无需修改 25 个使用 requireAuth/requireParent/requireChild 的 API
- **依赖**：添加 jose，移除 iron-session
- **环境变量**：添加 JWT_SECRET（至少 32 字节的密钥）