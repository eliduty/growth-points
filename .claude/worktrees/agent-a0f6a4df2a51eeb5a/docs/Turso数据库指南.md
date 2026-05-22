# Turso 数据库指南

本文档说明如何初始化 Turso 数据库以及后续的数据库迁移流程。

## 什么是 Turso

[Turso](https://turso.tech/) 是一个基于 libSQL（SQLite 分支）的边缘分布式数据库服务，核心特点：

- 与 SQLite 100% 兼容，无需修改 Prisma Schema
- 通过 HTTP 协议连接，适合边缘和 Serverless 环境
- 全球分布式低延迟、自动备份
- 免费套餐提供 9GB 存储和 500 个数据库

## 前置条件

- 已安装 Node.js 18+ 和 pnpm
- 已注册 [Turso 账号](https://turso.tech/sign-up)（支持 GitHub 登录）
- 本地项目已完成 `pnpm install`

## 一、安装 Turso CLI

**macOS / Linux：**

```bash
curl -sSfL https://get.tur.so/install.sh | bash
```

**Windows：**

使用 PowerShell 安装：

```powershell
irm https://get.tur.so/install.sh | iex
```

或者使用 [Scoop](https://scoop.sh/)：

```powershell
scoop install turso
```

或者使用 [Homebrew (Windows)](https://github.com/ScoopInstaller/Scoop)：

```powershell
brew install tursodatabase/tap/turso
```

安装完成后重新加载 shell：

```bash
# macOS / Linux
source ~/.zshrc

# Windows (PowerShell)
refreshenv
# 或重新打开 PowerShell 窗口
```

验证安装：

```bash
turso --version
```

## 二、登录 Turso

```bash
turso auth login
```

执行后会给出一个链接，在浏览器中打开并授权即可完成登录。

## 三、创建数据库

```bash
turso db create growth-points
```

该命令会在离你最近的区域创建数据库。

查看所有数据库：

```bash
turso db list
```

## 四、获取连接信息

```bash
# 获取数据库 URL
turso db show growth-points --url
# 输出示例：libsql://growth-points-abc123.turso.io

# 获取认证 Token
turso db tokens create growth-points
# 输出示例：eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9...
```

## 五、初始化数据库表结构

由于 Prisma Migrate 不支持直接对 Turso 远程数据库操作，需要先在本地生成迁移 SQL，再通过 Turso CLI 应用。

### 5.1 本地生成迁移

```bash
pnpm run db:migrate
```

执行时会提示输入迁移名称，如 `init`。该命令会：

1. 在本地创建 `dev.db` 并应用迁移
2. 在 `prisma/migrations/` 目录下生成 SQL 文件

### 5.2 将迁移应用到 Turso

查看生成的迁移目录：

```bash
ls prisma/migrations/
```

会看到类似 `20250101_000000_init` 的目录，将其中 `migration.sql` 应用到 Turso：

```bash
turso db shell growth-points < ./prisma/migrations/20250101_000000_init/migration.sql
```

> ⚠️ 请将 `20250101_000000_init` 替换为你实际生成的迁移目录名

### 5.3 验证表结构

```bash
turso db shell growth-points
```

进入交互式 shell 后执行：

```sql
.tables
```

应该能看到 `User`、`Task`、`Gift`、`TaskCompletion`、`GiftRedemption`、`Setting` 等表。

输入 `.quit` 退出。

## 六、配置环境变量

将获取的连接信息填入 `.env.local`：

```env
DATABASE_URL="file:./dev.db"
TURSO_DATABASE_URL="libsql://growth-points-abc123.turso.io"
TURSO_AUTH_TOKEN="eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9..."
```

同时，在 EdgeOne Pages 项目设置中也添加 `TURSO_DATABASE_URL` 和 `TURSO_AUTH_TOKEN` 环境变量。

> 💡 本地开发时，如果 `TURSO_DATABASE_URL` 和 `TURSO_AUTH_TOKEN` 留空，应用会自动使用本地 SQLite。

## 后续数据库迁移

当修改了 `prisma/schema.prisma`（如新增字段、新增表等），需要按以下步骤将变更同步到 Turso。

### 步骤一：本地生成迁移

```bash
pnpm run db:migrate
```

输入迁移名称（如 `add_avatar_field`），该命令会：

1. 对比 schema 变更，生成 SQL 迁移文件
2. 在本地 `dev.db` 上应用迁移

### 步骤二：应用到 Turso

```bash
turso db shell growth-points < ./prisma/migrations/<新的迁移目录>/migration.sql
```

### 步骤三：重新生成 Prisma Client

```bash
pnpm run db:generate
```

### 步骤四：部署

将代码推送到 GitHub，EdgeOne Pages 会自动构建部署。

### 迁移流程图

```
修改 prisma/schema.prisma
        │
        ▼
pnpm run db:migrate（本地生成 SQL + 应用到本地 SQLite）
        │
        ▼
turso db shell <db-name> < migration.sql（应用到 Turso 远程数据库）
        │
        ▼
pnpm run db:generate（重新生成 Prisma Client）
        │
        ▼
git push（触发 EdgeOne Pages 自动部署）
```

## 常用 Turso CLI 命令

| 命令 | 说明 |
|------|------|
| `turso db list` | 列出所有数据库 |
| `turso db show <name>` | 查看数据库详情 |
| `turso db show <name> --url` | 获取数据库连接 URL |
| `turso db tokens create <name>` | 创建认证 Token |
| `turso db shell <name>` | 进入数据库交互式 shell |
| `turso db shell <name> < file.sql` | 执行 SQL 文件 |
| `turso db destroy <name>` | 删除数据库 |

## 数据库交互式 Shell 常用操作

进入 shell：`turso db shell growth-points`

```sql
-- 查看所有表
.tables

-- 查看表结构
.schema User

-- 查询数据
SELECT * FROM User;

-- 退出
.quit
```

## 注意事项

1. **不要对 Turso 直接使用 `prisma migrate dev` 或 `prisma db push`**，这些命令只能操作本地 SQLite
2. **迁移顺序很重要**，必须按时间顺序依次应用所有迁移 SQL 到 Turso
3. **本地开发使用 SQLite**，生产环境使用 Turso，两者表结构需要手动保持同步
4. **`.env` 文件供 Prisma CLI 使用**（`DATABASE_URL`），`.env.local` 供 Next.js 应用运行时使用
5. **`.env` 和 `.env.local` 已在 `.gitignore` 中**，不会被提交到仓库，敏感信息不会泄露
