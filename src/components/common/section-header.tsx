import React, { PropsWithChildren } from 'react'
import Typography from '../ui/typography'
import { cn } from '@/lib/utils'

export default function SectionHeader({
  className,
  children,
}: PropsWithClassName & PropsWithChildren) {
  return (
    <Typography
      as="h4"
      className={cn('font-bold capitalize lg:text-3xl', className)}
    >
      {children}
    </Typography>
  )
}
