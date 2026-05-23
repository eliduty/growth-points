## 1. 准备工作

- [x] 1.1 添加 jose 依赖到 package.json
- [x] 1.2 移除 iron-session 依赖
- [x] 1.3 在 `.env.example` 添加 JWT_SECRET 配置说明
- [x] 1.4 在 `src/lib/constants.ts` 添加 JWT 配置常量（JWT_SECRET_NAME, COOKIE_NAME, TOKEN_EXPIRY）

## 2. 核心 Session 实现

- [x] 2.1 重写 `src/lib/auth/session.ts`：使用 jose.SignJWT 创建 JWT token
- [x] 2.2 实现 jwtVerify 验证逻辑，提取 userId, role, familyId
- [x] 2.3 实现 createSession 函数：签名 JWT 并设置 cookie
- [x] 2.4 实现 clearSession 函数：删除 cookie
- [x] 2.5 实现 getCurrentUserId, getCurrentRole, getCurrentFamilyId 函数
- [x] 2.6 删除废弃的 `src/lib/session.ts`（如果存在）

## 3. Middleware 实现

- [x] 3.1 修改 `src/middleware.ts`：从 request.cookies.get() 读取 token
- [x] 3.2 使用 jose.jwtVerify() 验证 token（不依赖 session.ts）
- [x] 3.3 验证失败时重定向到登录页

## 4. 验证测试

- [x] 4.1 测试登录功能：token 正确创建并存储到 cookie
- [x] 4.2 测试 middleware：有效 token 通过验证，无效 token 重定向
- [x] 4.3 测试 API routes 兼容性：所有 requireAuth/requireParent/requireChild 正常工作
- [x] 4.4 验证 Edge 环境兼容性：middleware 在边缘运行时正常执行