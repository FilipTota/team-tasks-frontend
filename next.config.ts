import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    // this remoes dev indicator from nextjs (icon botom left corner)
    appIsrStatus: false,
  },
};

export default nextConfig;
