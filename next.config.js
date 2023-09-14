/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental:{
        serverActions: true
    },
    experimental:{
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
}

module.exports = nextConfig
