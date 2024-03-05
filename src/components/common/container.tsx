import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

export default function Container({
  children,
  className,
}: PropsWithChildren & PropsWithClassName) {
  return (
    <div className={cn('max-w-[1500px] mx-auto', className)}>{children}</div>
  )
}
