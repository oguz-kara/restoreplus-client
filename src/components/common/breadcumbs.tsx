import React from 'react'
import Link from '../ui/link'
import Typography from '../ui/typography'
import { PropsWithLang } from '@/i18n/types'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BreadcumbsProps extends PropsWithLang {
  data: {
    title: string
    href?: string
  }[]
}

export default function Breadcumbs({
  data,
  lang,
  className,
}: BreadcumbsProps & PropsWithClassName) {
  return (
    <div
      aria-label="page breadcumbs"
      className={cn(
        'flex flex-wrap gap-1 items-center pt-8 pb-5 border-b-[1px] border-b-gray-200',
        className
      )}
    >
      {data.map((item, i) => (
        <div key={i} className="inline-flex items-center gap-1">
          {item.href ? (
            <Link href={item.href} lang={lang}>
              <Typography
                as="p"
                className={cn(
                  'font-[600] text-xs text-gray-400',
                  i === data.length - 1
                    ? 'font-semibold text-md text-foreground'
                    : null
                )}
              >
                {item.title}
              </Typography>
            </Link>
          ) : (
            <Typography
              as="p"
              className={cn(
                'font-[600] text-xs text-gray-400',
                i === data.length - 1
                  ? 'font-semibold text-sm text-foreground'
                  : null
              )}
            >
              {item.title}
            </Typography>
          )}
          {i !== data.length - 1 && (
            <ChevronRight size="14px" className="text-gray-400" />
          )}
        </div>
      ))}
    </div>
  )
}
