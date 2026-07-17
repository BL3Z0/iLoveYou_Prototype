/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true // This helps with Vercel deployment
  },
  trailingSlash: true,
  output: 'standalone', // Better for Vercel
}

module.exports = nextConfig