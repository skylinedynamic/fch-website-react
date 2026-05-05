/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.fourcornerfunding.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
