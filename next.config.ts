import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  output: "standalone",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
