import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/rossy-cookies-website",
  assetPrefix: "/rossy-cookies-website/",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;