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
  },
  images: {
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
        protocol: 'https',
        hostname: '1b34-31-142-82-40.ngrok-free.app',
      },
    ],
  },
}

export default withMDX(nextConfig)
