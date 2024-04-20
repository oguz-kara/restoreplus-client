'use client'
import { useFormContext } from 'react-hook-form'
import '@/styles/github-markdown.css'
import { FormControl, FormField, FormItem } from '../ui/form'
import { Textarea } from '../ui/textarea'
import MarkdownPreview from './markdown-preview'
import Typography from '../ui/typography'

interface MarkdownEditorProps {
  name: string
  title: string
}

export default function MarkdownEditor({ name, title }: MarkdownEditorProps) {
  const formCtx = useFormContext()

  return (
    <div>
      <Typography as="h5" className="my-5">
        {title}
      </Typography>
      <div className="flex gap-5">
        <div className="flex-1">
          <FormField
            control={formCtx.control}
            name={name}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea className="h-screen" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div
          className="markdown-body flex-1 max-h-screen overflow-scroll border-gray-200 border-[1px] rounded-sm p-3"
          style={{ background: 'white', color: '#313131' }}
        >
          <MarkdownPreview
            md={formCtx.getValues(name)}
            className="markdown-body"
          />
        </div>
      </div>
    </div>
  )
}
