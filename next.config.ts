import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: "img.drz.lazcdn.com", protocol: "https" }],
  },
};

export default nextConfig;
