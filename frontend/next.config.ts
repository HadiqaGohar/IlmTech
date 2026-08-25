import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel sets VERCEL=1 automatically — skip standalone for Vercel
  // Docker builds without VERCEL env — standalone is used for docker/server.js
  output: process.env.VERCEL ? undefined : "standalone",
};

export default nextConfig;
