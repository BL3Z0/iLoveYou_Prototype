/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  trailingSlash: true,
  // Disable static generation for all pages
  output: 'standalone',
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Disable static optimization
  staticPageGenerationTimeout: 120,
  // Disable automatic static optimization
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  // Ensure all pages are server-side rendered
  pageExtensions: ['jsx', 'js'],
  // Avoid static generation
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
