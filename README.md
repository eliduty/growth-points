# 家庭积分兑换系统

一个面向家庭的教育激励应用，通过积分机制激励孩子完成日常任务，并通过兑换礼物的形式给予正向反馈。

## 功能概览

- **用户认证** — 支持家长和孩子两种角色，注册/登录/登出
- **任务管理** — 家长创建任务并设定积分，孩子完成任务获取积分
- **礼物兑换** — 家长创建礼物，孩子在兑换日用积分兑换
- **兑换日设置** — 家长可设置每周哪些日子允许兑换礼物
- **倒计时显示** — 实时显示距离兑换日的时间
- **本周统计** — 课表式展示本周任务完成情况，家长可撤销当天完成记录

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端框架 | Next.js 16 (App Router) |
| 编程语言 | TypeScript 5 |
| 样式方案 | Tailwind CSS 4 |
| UI 组件库 | shadcn/ui (New York 风格) |
| 图标库 | Lucide React |
| 数据库 | Turso (libSQL) |
| ORM | Prisma |
| 认证 | 自定义 Cookie 认证 |
| 表单处理 | React Hook Form + Zod |
| 状态管理 | React Hooks + Zustand |
| 部署平台 | EdgeOne Pages |

## 项目结构

```
growth-points/
├── prisma/
│   └── schema.prisma          # 数据库模型定义
├── public/                    # 静态资源（图标、manifest 等）
├── src/
│   ├── app/
│   │   ├── api/               # API 路由
│   │   ├── globals.css        # 全局样式
│   │   ├── layout.tsx         # 根布局
│   │   └── page.tsx           # 主页面（单页应用）
│   ├── components/ui/         # shadcn/ui 组件
│   ├── hooks/                 # 自定义 Hooks
│   └── lib/
│       ├── db.ts              # Prisma 客户端（自动适配 Turso/SQLite）
│       └── utils.ts           # 工具函数
├── docs/                      # 项目文档
└── package.json
```

## 快速开始

### 环境要求

- Node.js 18+
- pnpm

### 安装与运行

```bash
# 安装依赖
pnpm install

# 生成 Prisma Client
pnpm run db:generate

# 初始化本地数据库
pnpm run db:push

# 启动开发服务器
pnpm run dev
```

开发服务器默认运行在 `http://localhost:3000`。

### 环境变量

在项目根目录创建 `.env` 文件：

**本地开发（使用 SQLite）：**

```env
DATABASE_URL="file:./dev.db"
```

**生产环境（使用 Turso）：**

```env
DATABASE_URL="file:./dev.db"
TURSO_DATABASE_URL="libsql://your-db-name-org.turso.io"
TURSO_AUTH_TOKEN="your-auth-token"
```

> 当同时配置了 `TURSO_DATABASE_URL` 和 `TURSO_AUTH_TOKEN` 时，应用会自动使用 Turso 远程数据库；否则使用本地 SQLite。

## 部署

### EdgeOne Pages

1. 将代码推送到 GitHub 仓库
2. 登录 [EdgeOne Pages 控制台](https://console.tencentcloud.com/edgeone/pages)
3. 连接 GitHub 仓库，选择该项目
4. 配置构建设置：
   - **构建命令**：`pnpm run build`
   - **输出目录**：`.next`
5. 添加环境变量：`TURSO_DATABASE_URL` 和 `TURSO_AUTH_TOKEN`
6. 点击部署

也可以使用 EdgeOne CLI 部署：

```bash
npm install -g edgeone
edgeone login
edgeone pages link
edgeone pages deploy
```

### 数据库迁移到 Turso

```bash
# 安装 Turso CLI
curl -sSfL https://get.tur.so/install.sh | bash

# 登录 Turso
turso auth login

# 创建数据库
turso db create growth-points

# 获取连接信息
turso db show growth-points --url
turso db tokens create growth-points

# 在本地生成迁移 SQL
pnpm run db:migrate

# 将迁移应用到 Turso
turso db shell growth-points < ./prisma/migrations/<migration-folder>/migration.sql
```

## 可用脚本

| 命令 | 说明 |
|------|------|
| `pnpm run dev` | 启动开发服务器（端口 3000） |
| `pnpm run build` | 生成 Prisma Client + 生产构建 |
| `pnpm run start` | 启动生产服务器 |
| `pnpm run lint` | 运行 ESLint 检查 |
| `pnpm run db:push` | 推送数据库模型（本地 SQLite） |
| `pnpm run db:generate` | 生成 Prisma Client |
| `pnpm run db:migrate` | 运行数据库迁移（本地 SQLite） |
| `pnpm run db:reset` | 重置数据库 |

## 更多文档

- [需求说明书](docs/需求说明书.md) — 完整的功能需求与界面设计规范
- [技术栈说明](docs/技术栈说明.md) — 各项技术的用途与配置说明
- [技术文档](docs/技术文档.md) — API 接口、数据库模型、业务规则
- [Turso 数据库指南](docs/Turso数据库指南.md) — Turso 初始化与数据迁移
