import { MDXRemote } from 'next-mdx-remote/rsc'

interface MdxRendererAsyncProps {
  mdxText: string | undefined
}

export default function MdxRenderer({ mdxText }: MdxRendererAsyncProps) {
  if (!mdxText) return null

  return <MDXRemote source={mdxText} />
}
