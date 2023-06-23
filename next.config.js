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
    ],
  },
  experimental: { esmExternals: true },
  async redirects() {
    return [
      {
        source: "/c/aptos-community-first",
        destination: "/event/64882d186bd6711523e2a803",
        permanent: true,
      },
    ];
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination:
  //         "https://leo-e32fa2.es.us-central1.gcp.cloud.es.io:9243/:path*",
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
