/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  trailingSlash: true,
  // Use server-side rendering instead of static
  output: 'standalone',
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Disable static optimization
  staticPageGenerationTimeout: 120,
  // Ensure all pages are server-side rendered
  pageExtensions: ['jsx', 'js'],
  // Disable automatic static optimization
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
}

module.exports = nextConfig
