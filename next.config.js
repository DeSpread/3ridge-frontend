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

// const withTM = require("next-transpile-modules")([
//   "@mui/material",
//   "@mui/system",
//   "@mui/icons-material", // If @mui/icons-material is being used
// ]);
//
// module.exports = withTM({
//   webpack: (config) => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       "@mui/styled-engine": "@mui/styled-engine-sc",
//     };
//     return config;
//   },
//   reactStrictMode: true,
//   swcMinify: true,
//   env: {
//     APOLLO_CLIENT_URI,
//   },
// });

module.exports = nextConfig;
