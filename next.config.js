/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 15：experimental.serverComponentsExternalPackages 已提升为稳定配置 serverExternalPackages
  // @libsql/isomorphic-ws 必须加入：OpenNext Cloudflare 打包时需复制其 workerd 专用文件（web.mjs），否则 esbuild 报 Could not resolve 错误
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-libsql", "@libsql/client", "@libsql/isomorphic-ws", "prisma"],
};

module.exports = nextConfig;
