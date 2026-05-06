/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.fourcornerfunding.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.skylinedynamic.dev',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
