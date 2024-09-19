import { cn } from '@/lib/utils'
import { MDXRemote } from 'next-mdx-remote/rsc'
import '@/styles/github-markdown.css'

interface MdxRendererAsyncProps extends PropsWithClassName {
  mdxText: string | undefined
}

export default function MdxRenderer({
  mdxText,
  className,
}: MdxRendererAsyncProps) {
  if (!mdxText) return null

  return (
    <div
      className={cn('markdown-body', className)}
      style={{ backgroundColor: 'white', color: 'black' }}
    >
      <MDXRemote source={mdxText} />
    </div>
  )
}
