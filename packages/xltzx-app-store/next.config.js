/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ankangxinlexiang.cn"
      },
      {
        protocol: "http",
        hostname: "localhost"
      }
    ]
  }
};

module.exports = nextConfig;
