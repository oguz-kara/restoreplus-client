'use client'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from '@/components/ui/link'
import { Locale } from '@/i18n/types'
import React from 'react'
import { cn } from '@/lib/utils'
import { useDictionary } from '@/context/use-dictionary-v2'

export default function OrderFilterLinks({ lang }: { lang: Locale }) {
  const { dictionary: dict } = useDictionary()
  const pathname = usePathname()

  return (
    <div
      className="bg-gray-100 p-1 inline-block rounded-md mb-5"
      style={{
        boxShadow:
          'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
      }}
    >
      <Link href="/profile/orders" lang={lang}>
        <Button
          style={{
            boxShadow: pathname.endsWith('profile/orders')
              ? 'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px'
              : '',
          }}
          variant="ghost"
          className={cn(
            'font-semibold text-sm h-8',
            pathname.endsWith('profile/orders') && 'bg-white'
          )}
        >
          {dict.profile.order_history_tabs_all_text}
        </Button>
      </Link>
      <Link href="/profile/orders/not-shipped" lang={lang}>
        <Button
          style={{
            boxShadow: pathname.includes('profile/orders/not-shipped')
              ? 'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px'
              : '',
          }}
          variant="ghost"
          className={cn(
            'font-semibold text-sm h-8',
            pathname.includes('profile/orders/not-shipped') && 'bg-white'
          )}
        >
          {dict.profile.order_history_tabs_pending_text}
        </Button>
      </Link>
      <Link href="/profile/orders/cancelled" lang={lang}>
        <Button
          style={{
            boxShadow: pathname.includes('profile/orders/cancelled')
              ? 'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px'
              : '',
          }}
          variant="ghost"
          className={cn(
            'font-semibold text-sm h-8',
            pathname.includes('profile/orders/cancelled') && 'bg-white'
          )}
        >
          {dict.profile.order_history_tabs_cancelled_text}
        </Button>
      </Link>
    </div>
  )
}
