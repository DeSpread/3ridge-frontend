// This file sets a custom webpack configuration to use your Next.js app

// // @ts-check
// const { i18n } = require("./next-i18next.config.js");
//
// // You can remove the following 2 lines when integrating our example.
// const { loadCustomBuildParams } = require("./next-utils.config");
// const { esmExternals = false, tsconfigPath } = loadCustomBuildParams();

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
  trailingSlash: true,
};

module.exports = nextConfig;
