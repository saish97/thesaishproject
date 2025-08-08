/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
  reactStrictMode: true,
  // swcMinify: true,
  devIndicators: false, // Disable the React DevTools overlay in development mode
  images: {
  domains: ['upload.wikimedia.org'], // allow Wikipedia-hosted logos
  },
  compress: true,
  output: 'standalone',
};

module.exports = nextConfig;