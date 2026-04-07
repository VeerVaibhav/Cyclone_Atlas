import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow all local network connections for remote mobile/tablet testing
  allowedDevOrigins: ['192.168.56.1', 'localhost', '127.0.0.1'],
};

export default nextConfig;
