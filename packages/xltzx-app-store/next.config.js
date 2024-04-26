/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "luoyuanjie.xltzx.com"
      },
      {
        protocol: "http",
        hostname: "localhost"
      }
    ]
  }
};

module.exports = nextConfig;
