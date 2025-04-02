/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify: true,
  devIndicators: false, // Disable the React DevTools overlay in development mode
  images: {
    domains: [],
  },
};

module.exports = nextConfig;