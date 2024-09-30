'use client'
import { Carousel } from '@/components/common/carousel'
import MainBanner from '@/components/common/main-banner'
import { useDictionary } from '@/context/use-dictionary-v2'
import { SupportedLocale } from '@/i18n'

export default function HeroSection({
  lang,
  categorySlug,
}: {
  lang: SupportedLocale
  categorySlug?: string
}) {
  const { dictionary: dict } = useDictionary()

  return (
    <Carousel className="max-h-[60vh]">
      <MainBanner
        backgroundUrl="url(/images/index-slides/slide-3.jpg) no-repeat center center/cover"
        buttonText={dict.common.see_products_text}
        linkHref="/product/finder"
        decorationImageUrl="/images/index-slides/slider-decoration-foreground.png"
        lang={lang}
        productImageUrl="/images/index-slides/slide-4-product-image.png"
      >
        {dict.index.hero_title} <br />{' '}
        <span className="text-white">{dict.index.hero_subtitle}</span>
      </MainBanner>
      <MainBanner
        backgroundUrl="url(/images/index-slides/slide-1.jpg) no-repeat center center/cover"
        buttonText={dict.common.data_sheets_text}
        linkHref="/data-sheets"
        decorationImageUrl="/images/index-slides/slider-decoration-foreground.png"
        lang={lang}
        productImageUrl="/images/index-slides/slide-2-product-image.png"
      >
        {dict.index.hero_2_title_1} <br />{' '}
        <span className="text-white">{dict.index.hero_2_title_2}</span> <br />{' '}
        {dict.index.hero_2_title_3}
      </MainBanner>
      <MainBanner
        backgroundUrl="url(/images/index-slides/slide-2.jpg) no-repeat center center/cover"
        buttonText={dict.index.hero_3_button_text}
        linkHref={
          categorySlug ? `/collections/product-categories/${categorySlug}` : '/'
        }
        decorationImageUrl="/images/index-slides/slider-decoration-foreground.png"
        lang={lang}
        productImageUrl="/images/index-slides/slide-1-product-image.png"
      >
        {dict.index.hero_3_title_1} <br />{' '}
        <span className="text-white">{dict.index.hero_3_title_2}</span> <br />{' '}
        {dict.index.hero_3_title_3}
      </MainBanner>
    </Carousel>
  )
}
