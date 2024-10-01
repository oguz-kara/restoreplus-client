import { remoteUrl } from '@/config/get-env-fields'
import React from 'react'
import Typography from '../../../components/ui/typography'
import Link from '../../../components/ui/link'
import { PropsWithLang } from '@/i18n/types'
import '../../../styles/collection-card-hover-effect.css'
import { cn } from '@/lib/utils'

interface CollectionCardProps extends PropsWithLang {
  imagePath?: string
  title: string
  href?: string
}

export default function CollectionCard({
  imagePath,
  title,
  href,
  lang,
}: CollectionCardProps) {
  return (
    <div
      className={cn(
        'product-series-item h-[300px]',
        !imagePath ? 'bg-[rgba(0,0,0,0.2)]' : null
      )}
      style={{
        ...(imagePath && {
          backgroundImage: `url(${remoteUrl}${imagePath})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }),
      }}
    >
      <Link href={href || '/'} lang={lang}>
        <div className="product-series-item-content h-full">
          <div
            className="h-full p-5 flex items-center"
            style={{
              backgroundColor: 'rgba(0,0,0,0.2)',
            }}
          >
            <Typography
              as="h3"
              className="product-series-item-title text-white text-5xl uppercase font-semibold"
            >
              {title}
            </Typography>
          </div>
        </div>
      </Link>
    </div>
  )
}
