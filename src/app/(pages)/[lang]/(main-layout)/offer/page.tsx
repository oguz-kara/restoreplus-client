import Typography from '@/components/ui/typography'
import { ParamsWithLang } from '@/i18n/types'
import { getDictionary } from '@/i18n/get-dictionary'
import ContactForm from '@/features/contact/components/contact-form'
import TermsConditionsPrivacyText from '@/components/common/term-conditions-privacy'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { Metadata } from 'next'
import ListProducts from '@/features/offer-products/components/list-products'
import Container from '@/components/common/container'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/contact', lang)

  return seoData
}

export default async function Page({ params: { lang } }: ParamsWithLang) {
  const { contactPage } = await getDictionary(lang)

  return (
    <Container>
      <div className="flex flex-col-reverse lg:flex-row gap-5 lg:gap-10 py-10 px-5">
        <div className="flex-[2.5] ">
          <div className="bg-gray-100 rounded-md p-5">
            <div>
              <Typography
                className="text-center font-normal text-xl lg:text-4xl text-[#ccae00] mb-3 lg:mb-10"
                as="h2"
              >
                {contactPage.title}
              </Typography>
              <Typography className="text-center text-sm lg:text-lg" as="p">
                {contactPage.text}
              </Typography>
            </div>
            <div className="py-5">
              <ContactForm lang={lang} path="/offer-products" />
            </div>
            <div className="p-5">
              <div className="mb-5">
                <Typography as="p" className="text-xs text-center">
                  {contactPage.aggreeForm}
                </Typography>
              </div>
              <div className="text-center">
                <TermsConditionsPrivacyText lang={lang} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <Typography as="h3" className="text-xl font-bold text-gray-700 pb-5">
            {contactPage.products}
          </Typography>
          <ListProducts />
        </div>
      </div>
    </Container>
  )
}
