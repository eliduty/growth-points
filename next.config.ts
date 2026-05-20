import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  serverExternalPackages: ['sharp', '@prisma/client', 'prisma'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'recharts', 'framer-motion'],
  },
  outputFileTracingExcludes: {
    '/api/**': [
      'node_modules/.pnpm/@prisma+client*/**/query_engine_bg.*.wasm-base64.*',
      'node_modules/.pnpm/@prisma+client*/**/query_compiler_bg.*.wasm-base64.*',
      'node_modules/.pnpm/@img+sharp-libvips*/**',
    ],
  },
};

export default nextConfig;
