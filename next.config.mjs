/** @type {import('next').NextConfig} */
import mdx from '@next/mdx'
import remarkGfm from 'remark-gfm'

const withMDX = mdx({
  options: {
    remarkPlugins: [remarkGfm],
  },
})

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
