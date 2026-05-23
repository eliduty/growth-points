## Context

项目部署在 EdgeOne 边缘环境时返回 545 错误。根因是 middleware.ts 使用了 iron-session 库，该库依赖 Node.js 原生模块（`node:async_hooks`、`node:buffer`），而 EdgeOne 边缘运行时基于 V8/Worker，不支持这些模块。

当前 session 实现：
- `src/lib/auth/session.ts`：使用 iron-session，提供 createSession, clearSession, getCurrentUserId 等 API
- `src/middleware.ts`：使用 getIronSession(request, response, options) 验证 session
- 25 个 API routes 通过 guard.ts 间接使用 session API

Cookie API 差异：
- middleware：`request.cookies.get()` / `response.cookies.set()`（同步）
- API routes：`await cookies().get()` / `await cookies().set()`（异步）

## Goals / Non-Goals

**Goals:**
- 实现 Edge 兼容的 session 管理（使用 jose + Web Crypto API）
- 保持现有 API 接口不变（createSession, clearSession, getCurrentUserId 等）
- middleware 在边缘环境正常运行
- 保持 7 天有效期

**Non-Goals:**
- 不添加版本号/黑名单机制（简化方案，登出后删除 cookie 即可）
- 不修改 API routes 的调用方式
- 不改变 session 数据结构（userId, role, familyId）

## Decisions

### 1. JWT 库选择：jose

**选择理由：**
- jose 使用 Web Crypto API，Edge/Node.js 双兼容
- 轻量（~30KB vs iron-session ~100KB+）
- 完整的 JWT 功能（签名、验证、各种算法）

**替代方案：**
- jsonwebtoken：Node.js 原生模块，Edge 不兼容 ❌
- iron-session：当前方案，Edge 不兼容 ❌

### 2. 签名算法：HS256

**选择理由：**
- HMAC-SHA256 足够安全
- 简单，无需密钥管理（RS256 需要公钥/私钥）
- 性能好

### 3. Cookie 配置

```typescript
{
  httpOnly: true,       // 防 XSS
  secure: production,   // HTTPS only
  sameSite: "lax",      // 防 CSRF
  maxAge: 7 * 24 * 60 * 60,  // 7 天
  path: "/"
}
```

### 4. middleware 实现方式

middleware 直接使用 jose.jwtVerify()，不调用 session.ts：
- 原因：session.ts 使用 `cookies()` from `next/headers`，middleware 无法使用（同步/异步差异）
- 实现：从 `request.cookies.get()` 读取 token，用 jose 验证

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| 登出后 JWT 本身仍有效 | 对于家庭系统风险低；用户信任度高；操作有日志追溯 |
| JWT_SECRET 泄露 | 从环境变量读取；不提交到代码库 |
| middleware 和 session.ts 两处验证逻辑 | 共用 JWT_SECRET 和 COOKIE_NAME 常量；逻辑简单一致 |