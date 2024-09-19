import { cn } from '@/lib/utils'
import { MDXRemote } from 'next-mdx-remote/rsc'
import '@/styles/sakura.css'

interface MdxRendererAsyncProps extends PropsWithClassName {
  mdxText: string | undefined
}

export default function MdxRenderer({
  mdxText,
  className,
}: MdxRendererAsyncProps) {
  if (!mdxText) return null

  return (
    <div className={cn('sakura', className)}>
      <MDXRemote source={mdxText} />
    </div>
  )
}
