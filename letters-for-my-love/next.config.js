/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  trailingSlash: true,
  output: 'standalone',
  swcMinify: true,
  // Disable static optimization for pages with client-side only content
  staticPageGenerationTimeout: 120,
}

module.exports = nextConfig
