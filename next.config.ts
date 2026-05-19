import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
