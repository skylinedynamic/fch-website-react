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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'X-Requested-With, Content-Type, Authorization' },
        ],
      },
    ];
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
