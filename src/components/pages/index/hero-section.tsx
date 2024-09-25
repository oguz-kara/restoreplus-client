'use client'
import { Carousel } from '@/components/common/carousel'
import Container from '@/components/common/container'
import { Button } from '@/components/ui/button'
import Image from '@/components/ui/image'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { useDictionary } from '@/context/use-dictionary-v2'
import { SupportedLocale } from '@/i18n'

export default function HeroSection({ lang }: { lang: SupportedLocale }) {
  const { dictionary: dict } = useDictionary()
  return (
    <Carousel className="max-h-[60vh]">
      <div
        className="w-full h-[60vh]"
        style={{
          background:
            'url(/images/index-slides/slide-3.jpg) no-repeat center center/cover',
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
                className="text-[#fed500] text-4xl lg:text-[5rem] lg:leading-[85px] font-semibold font-barlowCondensed uppercase"
                as="h2"
              >
                {dict.index.hero_title} <br />{' '}
                <span className="text-white">{dict.index.hero_subtitle}</span>
              </Typography>
            </div>
            <Link href="/product/finder" lang={lang}>
              <Button
                variant="bright-accent"
                className="rounded-none lg:px-10 lg:py-7"
                size="lg"
              >
                {dict.index.section_one_button_text}
              </Button>
            </Link>
          </Container>
        </div>
        <div className="relative">
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] lg:h-[500px] lg:w-[500px]">
            <Image
              className="h-full w-full object-contain"
              src="/images/index-slides/slider-decoration-foreground.png"
              alt="slider decoration"
              width={300}
              height={300}
            />
          </div>
          <div className="absolute bottom-5 right-5 h-[220px] w-[220px] lg:h-[350px] lg:w-[350px]">
            <Image
              className="h-full w-full object-contain"
              src="/images/index-slides/slide-1-product-image.png"
              alt="slider decoration"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>

      <div
        className="w-full h-[60vh]"
        style={{
          background:
            'url(/images/index-slides/slide-1.jpg) no-repeat center center/cover',
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
                className="text-[#fed500] text-4xl lg:text-[5rem] lg:leading-[85px] font-semibold font-barlowCondensed uppercase"
                as="h2"
              >
                {dict.index.hero_2_title_1} <br />{' '}
                <span className="text-white">{dict.index.hero_2_title_2}</span>{' '}
                <br /> {dict.index.hero_2_title_3}
              </Typography>
            </div>
            <Link href="/product/finder" lang={lang}>
              <Button
                variant="bright-accent"
                className="rounded-none lg:px-10 lg:py-7"
              >
                {dict.index.section_one_button_text}
              </Button>
            </Link>
          </Container>
        </div>
        <div className="relative">
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] lg:h-[500px] lg:w-[500px]">
            <Image
              className="h-full w-full object-contain"
              src="/images/index-slides/slider-decoration-foreground.png"
              alt="slider decoration"
              width={300}
              height={300}
            />
          </div>
          <div className="absolute bottom-5 right-5 h-[220px] w-[220px] lg:h-[350px] lg:w-[350px]">
            <Image
              className="h-full w-full object-contain"
              src="/images/index-slides/slide-2-product-image.png"
              alt="slider decoration"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>

      <div
        className="h-[60vh]"
        style={{
          background:
            'url(/images/index-slides/slide-2.jpg) no-repeat center center/cover',
          backgroundSize: 'cover',
        }}
      >
        <div
          className="h-full"
          style={{
            background:
              'linear-gradient(to top, rgba(250, 183, 0, 1) 0%, rgba(250, 183, 0, 0.1) 50%, rgba(31, 31, 31, 0.6) 100%)',
          }}
        >
          <Container className="py-10 px-5 lg:py-20">
            <div className="mb-10">
              <Typography
                className="text-[#fed500] text-4xl lg:text-[5rem] lg:leading-[85px] font-semibold font-barlowCondensed uppercase"
                as="h2"
              >
                {dict.index.hero_3_title_1} <br />{' '}
                <span className="text-white">{dict.index.hero_3_title_2}</span>{' '}
                <br /> {dict.index.hero_3_title_3}
              </Typography>
            </div>
            <Link href="/product/finder" lang={lang}>
              <Button
                variant="bright-accent"
                className="rounded-none lg:px-10 lg:py-7"
              >
                {dict.index.hero_3_button_text}
              </Button>
            </Link>
          </Container>
        </div>
        <div className="relative">
          <div className="absolute bottom-0 right-0 h-[300px] w-[300px] lg:h-[500px] lg:w-[500px]">
            <Image
              className="h-full w-full object-contain"
              src="/images/index-slides/slider-decoration-foreground.png"
              alt="slider decoration"
              width={300}
              height={300}
            />
          </div>
          <div className="absolute bottom-5 right-5 h-[220px] w-[220px] lg:h-[350px] lg:w-[350px]">
            <Image
              className="h-full w-full object-contain"
              src="/images/index-slides/slide-2-product-image.png"
              alt="slider decoration"
              width={500}
              height={500}
            />
          </div>
        </div>
      </div>
    </Carousel>
  )
}
