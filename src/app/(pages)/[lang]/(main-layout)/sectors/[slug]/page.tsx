import Container from '@/components/common/container'
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale } from '@/i18n/types'
import { Metadata } from 'next'
import { sdk } from '@/restoreplus-sdk'
import { getWithApplicationScopesQuery } from '@/features/sectors/queries/get-with-application-scopes.query'
import { serverUrl } from '@/config/get-env-fields'
import { ListersHeroSection } from '@/components/common/listers-hero-section'
import DocumentContentSection from '@/components/common/document-content-section'
import { getProperLanguage } from '@/i18n/utils'
import i18n from '@/i18n'
import { notFound } from 'next/navigation'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug = params.slug
  const lang = params.lang
  const properLang = getProperLanguage(lang)

  const sector = await sdk.sectors.getSingleByQuery(
    {
      where: {
        translations: {
          some: {
            slug,
            locale: {
              locale: properLang,
            },
          },
        },
      },
    },
    { lang }
  )

  const localesData = await sdk.supportedLocales.getAllByQuery({
    where: { locale: { not: i18n.defaultLocale } },
  })
  const languages = localesData.data.map((locale: any) => locale.locale)
  const alternateLangs = Object.fromEntries(
    languages.map((lang: SupportedLocale) => [
      lang,
      `${serverUrl}/${lang}/sectors/${sector?.translation?.slug}`,
    ])
  )

  const canonicalUrl =
    properLang === i18n.defaultLocale
      ? `${serverUrl}/sectors/${sector?.translation?.slug}`
      : `${serverUrl}/${lang}/sectors/${sector?.translation?.slug}`

  return {
    title: sector?.translation?.metaTitle,
    description: sector?.translation?.metaDescription,
    keywords: sector?.translation?.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLangs,
    },
  }
}

export default async function Page({
  params: { lang, slug },
}: {
  params: { slug: string; id: string; lang: Locale }
}) {
  const properLang = getProperLanguage(lang)
  const sector = await sdk.sectors.getSingleByQuery(
    {
      where: {
        translations: {
          some: {
            slug,
            locale: {
              locale: properLang,
            },
          },
        },
      },
      ...getWithApplicationScopesQuery,
    },
    { lang }
  )

  if (!sector || sector.message) return notFound()

  const { data: applicationScopes } = await sdk.applicationScopes.getAllByQuery(
    {
      where: {
        id: {
          not: sector.id,
        },
      },
    },
    {
      lang,
    }
  )

  if (sector.message) return 'no sector data found!'

  const dict = await getDictionary(lang)

  const content = {
    sidebarTitle: dict.product.sector_for_scopes_text || '',
    discoverProductsText:
      dict.product.product_category_discover_restoreplus_products_for_text,
  }

  return (
    <div>
      <ListersHeroSection data={sector as Sector} />
      <Container>
        <DocumentContentSection
          content={content}
          lang={lang}
          listOfOtherContent={applicationScopes || []}
          mainContent={sector}
          products={[]}
        />
      </Container>
    </div>
  )
}
