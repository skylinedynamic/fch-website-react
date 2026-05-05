/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fourcornerfunding.com',
        pathname: '/storage/**',
      },
      {
        protocol: 'https',
        hostname: 'fourcornerfunding.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
