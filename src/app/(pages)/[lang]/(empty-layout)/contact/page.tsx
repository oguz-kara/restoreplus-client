import Logo from '@/components/common/logo'
import heroImage from '../../../../../../public/images/hero-image.png'
import Typography from '@/components/ui/typography'
import { ParamsWithLang } from '@/i18n/types'
import { getDictionary } from '@/i18n/get-dictionary'
import { Quote } from 'lucide-react'
import ContactForm from '@/features/contact/components/contact-form'
import TermsConditionsPrivacyText from '@/components/common/term-conditions-privacy'
import { ScrollArea } from '@/components/ui/scroll-area'
import Link from '@/components/ui/link'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/contact', lang)

  return seoData
}

export default async function Page({ params: { lang } }: ParamsWithLang) {
  const { contactPage } = await getDictionary(lang)
  return (
    <div className="flex">
      <div
        className="hidden lg:block lg:h-screen w-[400px] flex-1"
        style={{
          backgroundImage: `url(${heroImage.src})`,
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
        }}
      >
        <div className="flex items-center justify-center p-4">
          <Link lang={lang} href="/">
            <Logo width={150} />
          </Link>
        </div>
        <div className="text-white p-4">
          <Typography as="h3" className="font-normal leading-10 flex gap-5">
            <span>
              <Quote />
            </span>{' '}
            <span>{contactPage.sideInfo.text} </span>
            <span className="self-end">
              <Quote />
            </span>
          </Typography>
        </div>
        <div className="flex justify-end">
          <Typography
            as="h3"
            className="font-normal leading-10 flex gap-5 text-white p-4"
          >
            - {contactPage.sideInfo.author}
          </Typography>
        </div>
      </div>
      <div className="flex-[2.5]">
        <ScrollArea className="h-screen">
          <div className="flex lg:hidden justify-center bg-foreground p-5 w-full">
            <Link lang={lang} href="/">
              <Logo width={100} />
            </Link>
          </div>
          <div className="p-5 lg:p-10">
            <Typography
              className="text-center font-normal text-xl lg:text-4xl text-blue-400 mb-3 lg:mb-10"
              as="h2"
            >
              {contactPage.title}
            </Typography>
            <Typography className="text-center text-sm lg:text-lg" as="p">
              {contactPage.text}
            </Typography>
          </div>
          <div className="p-5">
            <ContactForm lang={lang} />
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
        </ScrollArea>
      </div>
    </div>
  )
}
