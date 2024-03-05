/** @type {import('next').NextConfig} */
import mdx from '@next/mdx'

const withMDX = mdx()

const nextConfig = {
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
    ],
  },
}

export default withMDX(nextConfig)
