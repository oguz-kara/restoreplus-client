import Container from '@/components/common/container'
import { Button } from '@/components/ui/button'
import Image from '@/components/ui/image'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { getDictionaryV2 } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale(
    '/order-creation-result',
    lang
  )

  return seoData
}

export default async function Page({
  params: { lang, id },
}: ParamsWithLang & { searchParams: { success: string } } & ParamsWithId) {
  const dict = await getDictionaryV2(lang)

  const translation =
    id === '0'
      ? {
          title: dict.order_creation_result.error_title,
          description: dict.order_creation_result.error_description,
          viewButtonText: dict.order_creation_result.view_order_button_text,
          continueButtonText:
            dict.order_creation_result.continues_shopping_button_text,
        }
      : {
          title: dict.order_creation_result.success_title,
          description: dict.order_creation_result.success_description,
          viewButtonText: dict.order_creation_result.view_order_button_text,
          continueButtonText:
            dict.order_creation_result.continues_shopping_button_text,
        }

  return (
    <div className="flex items-center justify-center bg-gray-100 h-[100vh]">
      <Container className="max-w-[1024px]">
        <div
          className="bg-white p-5 lg:p-10 rounded-md h-[100vh] lg:h-[initial] "
          style={{
            boxShadow:
              'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
          }}
        >
          <div>
            <Image
              src={
                id !== '0'
                  ? '/images/order-success.svg'
                  : '/images/order-failed.svg'
              }
              alt="order success"
              width={1000}
              height={1000}
              priority
              style={{
                width: '100%',
              }}
            />
          </div>
          <div>
            <Typography
              as="h1"
              className="font-semibold text-4xl text-center mb-5"
            >
              {translation.title}
            </Typography>

            <div className="flex items-center justify-center mb-10">
              <Typography
                as="p"
                className="text-gray-400 text-lg text-center max-w-[65%]"
              >
                {translation.description}
              </Typography>
            </div>

            <div className="flex gap-5">
              <Link className="flex-1" href={`/profile/orders`} lang={lang}>
                <Button
                  className="w-full uppercase font-semibold lg:text-xl lg:p-7"
                  variant="outline"
                >
                  {translation.viewButtonText}
                </Button>
              </Link>
              <Link className="flex-1" href="/create-order" lang={lang}>
                <Button
                  className="w-full uppercase font-semibold lg:text-xl lg:p-7"
                  variant="default"
                >
                  {translation.continueButtonText}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
