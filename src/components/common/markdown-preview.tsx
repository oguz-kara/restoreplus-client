import { cn } from '@/lib/utils'
import '@/styles/github-markdown.css'
import { markdownToHtml } from '@/utils/parser'
export default function MarkdownPreview({
  md,
  className,
}: { md: string } & PropsWithClassName) {
  return (
    <div className={cn('markdown-body', className)}>
      <div dangerouslySetInnerHTML={{ __html: markdownToHtml(md) }} />
    </div>
  )
}
