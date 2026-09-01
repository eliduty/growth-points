/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15：experimental.serverComponentsExternalPackages 已提升为稳定配置 serverExternalPackages
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-libsql", "@libsql/client", "prisma"],
};

module.exports = nextConfig;
