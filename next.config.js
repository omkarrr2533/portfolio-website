/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'raw.githubusercontent.com',
      'github.com',
      'opengraph.githubassets.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
  reactStrictMode: true,
  // swcMinify removed — it is the default and the option was removed in Next.js 14.x
  // Explicitly suppress the "x-powered-by" header in production
  poweredByHeader: false,
}

module.exports = nextConfig