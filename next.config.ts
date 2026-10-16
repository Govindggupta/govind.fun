import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    // A static export can't run the on-demand Image Optimizer, so images are
    // served as-is. remotePatterns are unnecessary while unoptimized.
    unoptimized: true,
  },
};

export default nextConfig;
