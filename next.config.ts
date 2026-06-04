import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  images: {
    qualities: [75, 100],
  },
  output: "standalone",
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
