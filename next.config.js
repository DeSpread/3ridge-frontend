/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
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
  // async redirects() {
  //   return [
  //     {
  //       source: "/api/google-auth",
  //       destination: "https://www.googleapis.com/auth/userinfo.email",
  //       permanent: true,
  //     },
  //   ];
  // },
  // if you want to hide url, use this
  // { source: <api>, destination: <api> }
  // async rewrites() {
  //   return [{}];
  // },
};

module.exports = nextConfig;
