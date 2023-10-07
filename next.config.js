/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions: true,
        forceSwcTransforms: true
    },
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/300',
      },
    ],
  },
  webpack:(config, { isServer }) => {
    config.module.rules.push({
      test: /\.html$/,
      use: 'raw-loader',
    });
    // config.resolve.fallback = { fs: false };
    return config;
  },
}

module.exports = nextConfig
