/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
