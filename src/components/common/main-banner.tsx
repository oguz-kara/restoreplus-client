import { PropsWithChildren } from 'react'
import Typography from '../ui/typography'
import Container from './container'
import Link from '../ui/link'
import { Button } from '../ui/button'
import Image from '../ui/image'
import { PropsWithLang } from '@/i18n/types'
import { cn } from '@/lib/utils'

interface MainBannerProps {
  backgroundUrl: string
  buttonText?: string
  productImageUrl?: string
  decorationImageUrl?: string
}

export default function MainBanner({
  backgroundUrl,
  children,
  lang,
  buttonText,
  decorationImageUrl,
  productImageUrl,
  className,
}: MainBannerProps & PropsWithChildren & PropsWithLang & PropsWithClassName) {
  return (
    <div
      className={cn('w-full h-[60vh]', className)}
      style={{
        background: backgroundUrl,
        backgroundSize: 'cover',
      }}
    >
      <div
        className="relative h-full top-0"
        style={{
          background:
            'linear-gradient(to top, rgba(250, 183, 0, 1) 0%, rgba(250, 183, 0, 0.1) 50%, rgba(31, 31, 31, 0.6) 100%)',
        }}
      >
        <Container className="py-10 px-5 lg:py-20">
          <div className="mb-10">
            <Typography
              className="text-primary text-4xl lg:text-[5rem] lg:leading-[85px] font-semibold font-barlowCondensed uppercase"
              as="h2"
            >
              {children}
            </Typography>
          </div>
          {buttonText && (
            <Link href="/product/finder" lang={lang}>
              <Button
                variant="bright-accent"
                className="rounded-none lg:px-10 lg:py-7"
                size="lg"
              >
                {buttonText}
              </Button>
            </Link>
          )}
        </Container>
      </div>
      <div className="relative">
        {decorationImageUrl && (
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] lg:h-[650px] lg:w-[650px]">
            <Image
              className="h-full w-full object-contain"
              src={decorationImageUrl}
              alt="slider decoration"
              width={300}
              height={300}
            />
          </div>
        )}
        {productImageUrl && (
          <div className="absolute bottom-5 right-5 h-[220px] w-[220px] lg:h-[350px] lg:w-[350px]">
            <Image
              className="h-full w-full object-contain"
              src={productImageUrl}
              alt="restoreplus product list image"
              width={500}
              height={500}
            />
          </div>
        )}
      </div>
    </div>
  )
}
