/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true, // 修复 EdgeOne Pages 部署后的 307 重定向问题
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "@prisma/adapter-libsql", "@libsql/client", "prisma"],
  },
};

module.exports = nextConfig;
