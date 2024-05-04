import { cn } from '@/lib/utils'
import React, { PropsWithChildren } from 'react'

export default function Container({
  children,
  className,
  ...rest
}: PropsWithChildren & PropsWithClassName & { style?: any }) {
  return (
    <div className={cn('max-w-[1344px] mx-auto', className)} {...rest}>
      {children}
    </div>
  )
}
