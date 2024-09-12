import Container from '@/components/common/container'
import InfoCard from '@/components/common/info-card'
import Section from '@/components/common/section'
import Typography from '@/components/ui/typography'
import ListSectorsMain from '@/features/sectors/components/list-sectors-main'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/sectors', lang)

  return seoData
}

export default async function Page({ params: { lang } }: ParamsWithLang) {
  const dict = await getDictionary(lang)

  return (
    <div>
      <Container>
        <Section>
          <Typography
            as="h2"
            className="font-normal leading-10 border-b border-dashed border-gray-300 py-5 text-center text-2xl"
          >
            {dict.sector.title}
          </Typography>
        </Section>
        <Section>
          <ListSectorsMain lang={lang} />
        </Section>
        <InfoCard
          className="lg:hidden"
          data={{
            title: dict.blog.found_by_users_title,
            buttonText: dict.blog.get_listed_button_text,
            text: dict.blog.found_by_users_description,
          }}
          lang={lang}
        />
      </Container>
    </div>
  )
}
