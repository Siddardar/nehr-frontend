import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/nehrfe/demo/:path*",
        destination: "http://localhost:52775/nehrfe/demo/:path*"
      }
    ];
  },
};

export default nextConfig;
