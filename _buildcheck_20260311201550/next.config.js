/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  reactStrictMode: true,
  // swcMinify: true,
  devIndicators: false, // Disable the React DevTools overlay in development mode
  images: {
    domains: [], // add external domains here if you host images off-site
  },
  compress: true,
  output: 'standalone',
};

module.exports = nextConfig;