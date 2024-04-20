import { cn } from '@/lib/utils'
import 'github-markdown-css'
import { MDXRemote } from 'next-mdx-remote/rsc'

interface MdxRendererAsyncProps extends PropsWithClassName {
  mdxText: string | undefined
}

export default function MdxRenderer({
  mdxText,
  className,
}: MdxRendererAsyncProps) {
  if (!mdxText) return null

  return (
    <div className={cn('markdown-body', className)}>
      <MDXRemote source={mdxText} />
    </div>
  )
}
