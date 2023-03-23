// This file sets a custom webpack configuration to use your Next.js app

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "3ridge.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "gateway.pinata.cloud",
      },
      {
        protocol: "https",
        hostname: "indexer.xyz",
      },
      {
        protocol: "https",
        hostname: "www.supernova.ac",
      },
    ],
  },
};

module.exports = nextConfig;
