import * as React from 'react'
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

import { cn } from '@/lib/utils'
import { ButtonProps, buttonVariants } from '@/components/ui/button'
import Link from './link'
import { LinkProps } from 'next/link'
import { Locale } from '@/i18n/types'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<'ul'>
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn('flex flex-row items-center gap-1', className)}
    {...props}
  />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<'li'>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn('', className)} {...props} />
))
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
  isActive?: boolean
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'> &
  LinkProps &
  PropsWithClassName &
  React.PropsWithChildren & { disabled?: boolean } & { lang: Locale }

const PaginationLink = ({
  className,
  isActive,
  size = 'icon',
  disabled,
  ...props
}: PaginationLinkProps) => {
  const disabledClassNames = 'opacity-60 pointer-events-none'
  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        disabled ? disabledClassNames : '',
        className
      )}
      {...props}
    />
  )
}
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => {
  const disabledClassNames = 'opacity-60 pointer-events-none'
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn(
        'gap-1 pl-2.5',
        disabled ? disabledClassNames : '',
        className
      )}
      {...props}
    >
      <ChevronLeft className="h-4 w-4" />
      <span>Önceki</span>
    </PaginationLink>
  )
}

PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { disabled?: boolean }) => {
  const disabledClassNames = 'opacity-60 pointer-events-none'
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn(
        'gap-1 pl-2.5',
        disabled ? disabledClassNames : '',
        className
      )}
      {...props}
    >
      <span>Sonraki</span>
      <ChevronRight className="h-4 w-4" />
    </PaginationLink>
  )
}
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
}
