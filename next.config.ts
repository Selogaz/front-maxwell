import type { NextConfig } from "next";

const BACKEND_URL = process.env.BACKEND_URL ?? 'https://test.dndmaxwell.online';

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        // Прокси на реальный бэк — ДО файловых маршрутов (local route.ts).
        {
          source: '/api/auth/:path*',
          destination: `${BACKEND_URL}/api/auth/:path*`,
        },
        {
          source: '/api/me',
          destination: `${BACKEND_URL}/api/me`,
        },
        {
          source: '/api/character-builder/:path*',
          destination: `${BACKEND_URL}/api/character-builder/:path*`,
        },
        {
          source: '/api/character',
          destination: `${BACKEND_URL}/api/character`,
        },
      ],
    };
  },
};

export default nextConfig;
