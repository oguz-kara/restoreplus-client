import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

export default function Typography({
  as,
  className,
  children,
}: TypographyProps & PropsWithClassName & PropsWithChildren) {
  if (as === 'h1')
    return (
      <h1
        className={cn(
          'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
          className
        )}
      >
        {children}
      </h1>
    )

  if (as === 'h2')
    return (
      <h2
        className={cn(
          'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
          className
        )}
      >
        {children}
      </h2>
    )

  if (as === 'h3')
    return (
      <h3
        className={cn(
          'scroll-m-20 text-2xl font-semibold tracking-tight',
          className
        )}
      >
        {children}
      </h3>
    )

  if (as === 'h4')
    return (
      <h4
        className={cn(
          'scroll-m-20 text-xl font-semibold tracking-tight',
          className
        )}
      >
        {children}
      </h4>
    )

  if (as === 'h5')
    return (
      <h5
        className={cn(
          'scroll-m-20 text-lg font-extrabold tracking-tight',
          className
        )}
      >
        {children}
      </h5>
    )

  if (as === 'h6')
    return (
      <h6
        className={cn(
          'scroll-m-20 text-md font-extrabold tracking-tight ',
          className
        )}
      >
        {children}
      </h6>
    )

  if (as === 'p') return <p className="leading-7">{children}</p>

  if (as === 'code')
    return (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
        {children}
      </code>
    )

  if (as === 'blockquote')
    return (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {children}
      </blockquote>
    )

  if (as === 'lead')
    return <p className="text-xl text-muted-foreground">{children}</p>

  if (as === 'large')
    return <div className="text-lg font-semibold">{children}</div>

  if (as === 'small')
    <small className="text-sm font-medium leading-none">{children}</small>

  if (as === 'muted')
    <p className="text-sm text-muted-foreground">{children}</p>

  return <p className={cn('leading-7', className)}>{children}</p>
}

interface TypographyProps {
  as?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'blockquote'
    | 'code'
    | 'lead'
    | 'large'
    | 'small'
    | 'muted'
}
