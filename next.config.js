/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "@prisma/adapter-libsql", "@libsql/client", "prisma"],
  },
};

module.exports = nextConfig;
