/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
