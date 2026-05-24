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
      // Local dev hosts commonly used for CMS / image servers
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.fourcornerfunding.com',
          },
        ],
        destination: 'https://fourcornerfunding.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
