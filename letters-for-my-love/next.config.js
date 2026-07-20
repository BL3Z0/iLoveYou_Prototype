/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    unoptimized: true,
  },
  trailingSlash: true,
  output: 'standalone',
}

module.exports = nextConfig
