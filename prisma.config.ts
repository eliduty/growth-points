import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // SQLite 数据库路径相对于 prisma.config.ts 所在目录（根目录）
    url: process.env.DATABASE_URL || "file:prisma/dev.db",
  },
});