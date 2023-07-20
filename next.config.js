// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/
const { withSentryConfig } = require("@sentry/nextjs");

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
};

module.exports = nextConfig;

module.exports = withSentryConfig(
  module.exports,
  { silent: true },
  { hideSourcemaps: true }
);
