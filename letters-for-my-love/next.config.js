/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
    formats: ['image/webp'],
  },
  trailingSlash: true,
  output: 'standalone',
  // Reduce bundle size
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Optimize images
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
