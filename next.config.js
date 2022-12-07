const APOLLO_CLIENT_URI = process.env.APOLLO_CLIENT_URI;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    APOLLO_CLIENT_URI,
  },
  // async redirects() {
  //   return [{}];
  // },
  // if you want to hide url, use this
  // { source: <api>, destination: <api> }
  // async rewrites() {
  //   return [{}];
  // },
};

module.exports = nextConfig;
