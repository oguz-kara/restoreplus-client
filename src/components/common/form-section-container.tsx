import { forwardRef } from 'react'
import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

type DivProps = React.HTMLProps<HTMLDivElement>

export const FormSectionContainer = forwardRef<HTMLDivElement, DivProps>(
  function FormSectionContainer(
    props: PropsWithChildren & { className?: string; label?: string },
    ref
  ) {
    const { className, children } = props

    return (
      <div ref={ref} className={cn('py-5 border-b border-gray-200', className)}>
        {children}
      </div>
    )
  }
)
