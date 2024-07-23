import DownloadDocument from '@/components/common/download-document'
import Section5 from '@/components/sections/index/section5'
import Section7 from '@/components/sections/index/section7'
import { Button } from '@/components/ui/button'
import Image, { ServerImage } from '@/components/ui/image'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { getCategoryWithDocumentsQuery } from '@/features/product-categories/queries/get-category-with-documents-query'
import SimpleProductCard from '@/features/product/components/simple-product-card'
import { getSectors } from '@/features/sectors/api/get-sectors'
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'

const bgImages = [
  {
    path: '/images/oils/i1.jpg',
    alt: 'oils',
  },
  {
    path: '/images/oils/i2.jpg',
    alt: 'oils',
  },
  {
    path: '/images/oils/i3.jpg',
    alt: 'oils',
  },
  {
    path: '/images/oils/i4.jpg',
    alt: 'oils',
  },
  {
    path: '/images/oils/i5.jpg',
    alt: 'oils',
  },
  {
    path: '/images/oils/i6.jpg',
    alt: 'oils',
  },
  {
    path: '/images/oils/i7.jpg',
    alt: 'oils',
  },
]

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale }
}) {
  const {
    indexV2: { hero, sections, sloganSection, findProductSection, b2bSection },
  } = await getDictionary(lang)

  const { data } = await sdk.productCategories.getAllByQuery(
    {
      ...getCategoryWithDocumentsQuery(lang),
      where: {
        id: {
          in: [13, 11, 9],
        },
      },
    },
    { lang }
  )

  const { data: productsData } = await sdk.products.getAllByQuery(
    { take: 6 },
    { lang }
  )

  const { data: sectorData } = await getSectors({
    lang,
    query: {
      where: {
        id: {
          in: [1, 2, 3, 4, 5, 6],
        },
      },
      select: {
        id: true,
        translations: {
          select: { name: true, slug: true, locale: true },
        },
        featuredImage: {
          select: {
            path: true,
            alt: true,
          },
        },
      },
    },
  })

  return (
    <div>
      <div className="relative flex items-center justify-center w-screen h-screen p-5">
        <div className="z-20">
          <Typography className="text-white text-6xl leading-[80px]" as="h1">
            {hero.title} <br />
            <span className="float-right">{hero.subTitle}</span>
          </Typography>
        </div>
        <div className="absolute top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.8)] z-10"></div>
        <div className="absolute top-0 left-0 bottom-0 right-0">
          <video
            className="w-screen h-screen object-cover"
            loop={true}
            muted={true}
            data-wf-ignore={true}
            data-object-fit="cover"
            autoPlay={true}
          >
            <source src="/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
      <div>
        <div className="flex relative overflow-hidden max-w-[100vw] flex-col md:flex-row ">
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.5)] z-20"></div>
          <div className="relative flex w-screen flex-1 py-20">
            <div className="z-30 flex flex-col py-5 px-5 lg:px-20">
              <div className="py-10">
                <Typography
                  dangerouslySetInnerHTML={{ __html: sloganSection.title }}
                  className="text-white text-4xl lg:text-6xl lg:leading-[80px] font-bold"
                  as="h2"
                ></Typography>
                <Typography
                  className="text-white text-2xl leading-8"
                  as="h3"
                  dangerouslySetInnerHTML={{ __html: sloganSection.subTitle }}
                />
              </div>
              <div>
                <Link href="/product/finder" lang={lang}>
                  <Button className="text-xl px-10 py-7 font-bold uppercase">
                    {sloganSection.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="absolute top-0 left-0 bottom-0 right-0 w-screen h-[2000px] lg:h-[1000px] flex items-center justify-center">
              <Image
                className="w-full object-cover h-full lg:h-[1000px]"
                src={bgImages[0].path}
                width={1500}
                height={1080}
                alt={bgImages[0].alt}
              />
            </div>
          </div>
          <div className="flex-1 z-30 p-10 lg:p-20">
            <Image
              className="lg:h-[600px] w-auto rounded-lg"
              src={'/images/11.png'}
              width={1000}
              height={1000}
              alt="restoreplus products image"
            />
          </div>
        </div>
        <div className="flex relative overflow-hidden max-w-[100vw]  flex-col md:flex-row bg-red-500">
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.5)] z-20"></div>
          <div className="flex w-screen flex-1 py-20">
            <div className="z-30 flex flex-col py-5 px-5 lg:px-20">
              <div className="py-10">
                <Typography
                  dangerouslySetInnerHTML={{ __html: findProductSection.title }}
                  className="text-white text-4xl lg:text-6xl lg:leading-[80px] font-bold"
                  as="h2"
                ></Typography>
                <Typography
                  className="text-white text-2xl lg:text-3xl lg:leading-10"
                  as="h3"
                  dangerouslySetInnerHTML={{
                    __html: findProductSection.subTitle,
                  }}
                />
              </div>
              <div>
                <Link href="/product/finder" lang={lang}>
                  <Button className="text-xl px-10 py-7 font-bold uppercase">
                    {sloganSection.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="absolute top-0 left-0 bottom-0 right-0 w-screen h-full ">
              <Image
                className="w-full h-full object-cover "
                src={bgImages[1].path}
                width={1500}
                height={1080}
                alt={bgImages[1].alt}
              />
            </div>
          </div>
          <div className="flex-1 z-30 p-10 py-20">
            <div className="grid grid-cols-2 lg:grid-cols-[150px_150px_150px] gap-5">
              {productsData?.map((item: any, i: number) => (
                <SimpleProductCard
                  className="text-white"
                  product={item}
                  key={i}
                  lang={lang}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row relative overflow-hidden max-w-[100vw]">
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.5)] z-20"></div>
          <div className="relative flex w-screen flex-1 py-10">
            <div className="z-30 flex flex-col p-5 lg:p-20">
              <div className="pb-5">
                <Typography
                  dangerouslySetInnerHTML={{ __html: b2bSection.title }}
                  className="text-white text-4xl lg:text-6xl lg:leading-[80px] font-bold"
                  as="h2"
                ></Typography>
                <Typography
                  className="text-white text-2xl lg:text-3xl lg:leading-10"
                  as="h3"
                  dangerouslySetInnerHTML={{
                    __html: b2bSection.subTitle,
                  }}
                />
              </div>
              <div>
                <Link href="/product/finder" lang={lang}>
                  <Button className="text-lg lg:text-xl px-10 py-7 font-bold uppercase">
                    {b2bSection.buttonText}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="py-20 absolute top-0 left-0 bottom-0 right-0 w-screen lg:h-[1000px] flex items-center justify-center">
              <Image
                className="w-full object-cover h-[1000px]"
                src={bgImages[2].path}
                width={1500}
                height={1080}
                alt={bgImages[2].alt}
              />
            </div>
          </div>
          <div className="flex-1 z-30 p-10"></div>
        </div>
        {data?.map((item: ProductCategory, i: number) => (
          <div className="relative flex w-screen overflow-hidden py-20" key={i}>
            <div className="z-30 flex flex-col py-5 px-20">
              <div className="py-10">
                <Typography
                  dangerouslySetInnerHTML={{ __html: sections[i].title }}
                  className="text-white text-6xl leading-[80px] font-bold"
                  as="h2"
                ></Typography>
                <Typography className="text-white text-4xl" as="h3">
                  {sections[i].subTitle}
                </Typography>
              </div>
              <div className="flex gap-5">
                {item.documents.map(
                  ({ translation, featuredImage, file }, i) => (
                    <DownloadDocument key={i} filename={file.name} lang={lang}>
                      <div className="w-[150px] rounded-md">
                        <div key={i}>
                          <ServerImage
                            className="rounded-md max-w-[150px]"
                            src={featuredImage?.path || '/'}
                            width={300}
                            height={300}
                            alt={featuredImage?.alt || 'image'}
                          />
                        </div>
                        <Typography className="p-2 text-white font-semibold">
                          {translation?.name}
                        </Typography>
                      </div>
                    </DownloadDocument>
                  )
                )}
              </div>
            </div>
            <div className="absolute top-0 left-0 bottom-0 right-0 bg-[rgba(0,0,0,0.5)] z-20"></div>
            <div className="absolute top-0 left-0 bottom-0 right-0 w-screen lg:h-[600px] flex items-center justify-center">
              <Image
                className="w-full object-cover h-[1000px]"
                src={bgImages[i + 3].path}
                width={1500}
                height={1080}
                alt={bgImages[i + 3].alt}
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <Section5 lang={lang} />
      </div>
      <div>
        <Section7 lang={lang} sectorData={sectorData} />
      </div>
    </div>
  )
}
