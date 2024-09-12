import React from 'react'
import Logo from './logo'
import Typography from '../ui/typography'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import Link from '../ui/link'

interface InfoCardProps {
  data: {
    title: string
    text: string
    buttonText: string
  }
  lang: string
}

export default function InfoCard({
  data,
  className,
  lang,
}: InfoCardProps & PropsWithClassName) {
  return (
    <div
      className={cn(
        'border-b border-dashed border-gray-400 lg:border-none h-full w-full lg:w-64 flex-1 bg-foreground text-white p-5 lg:rounded-sm',
        className
      )}
    >
      <Logo className="mb-5" width={100} height={100} />
      <Typography as="h3" className="mb-5">
        {data.title}
      </Typography>
      <Typography as="p" className="mb-5">
        {data.text}
      </Typography>
      <Link href="/register" lang={lang as any}>
        <Button className="w-full lg:w-auto">{data.buttonText}</Button>
      </Link>
    </div>
  )
}
