/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.fourcornerfunding.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.fourcornerfunding.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
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
