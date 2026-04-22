/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'raw.githubusercontent.com',
      'github.com',
      'opengraph.githubassets.com',
      'res.cloudinary.com',          // ← ADD THIS
    ],
    remotePatterns: [
      { protocol: 'https', hostname: '**.githubusercontent.com' },
      { protocol: 'https', hostname: 'github.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },   // ← ADD THIS
    ],
  },
  reactStrictMode: true,
  poweredByHeader: false,
}

module.exports = nextConfig