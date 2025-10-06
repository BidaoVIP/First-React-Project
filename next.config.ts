import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/my-app",
  assetPrefix: "/my-app/",
};

export default nextConfig;
