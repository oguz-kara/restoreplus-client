/** @type {import('next').NextConfig} */
import mdx from '@next/mdx'
import remarkGfm from 'remark-gfm'

const withMDX = mdx({
  options: {
    remarkPlugins: [remarkGfm],
  },
})

const nextConfig = {
  env: {
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_REMOTE_URL: process.env.NEXT_PUBLIC_REMOTE_URL,
    NEXT_PUBLIC_NODE_ENV: process.env.NEXT_PUBLIC_NODE_ENV,
    X_API_KEY: process.env.X_API_KEY,
    X_API_KEY_NAME: process.env.X_API_KEY_NAME,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 828, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96],
    domains: [
      'localhost',
      'localhost:5000',
      'localhost:3000',
      'localhost:3001',
      'restoreplus.store',
    ],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost:5000',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: 'localhost:3000',
      },
      {
        protocol: 'http',
        hostname: 'localhost:3001',
      },
      {
        protocol: 'https',
        hostname: 'data.restoreplus.store',
      },
    ],
  },
}

export default withMDX(nextConfig)
