import { notFound } from 'next/navigation'
import Container from '@/components/common/container'
import { ParamsWithLang } from '@/i18n/types'
import React from 'react'
import { getDictionary } from '@/i18n/get-dictionary'
import { Metadata } from 'next'
import { sdk } from '@/restoreplus-sdk'
import { serverUrl } from '@/config/get-env-fields'
import DocumentContentSection from '@/components/common/document-content-section'
import { ListersHeroSection } from '@/components/common/listers-hero-section'
import { serverFetcher } from '@/lib/server-fetcher'
import { getProperLanguage } from '@/i18n/utils'
import i18n from '@/i18n'
import { consoleLog } from '@/utils/log-to-console'

type PageProps = ParamsWithId &
  ParamsWithSlug &
  ParamsWithLang & {
    params: {
      id: string
      slug: string
    }
  }

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const slug = params.slug
  const lang = params.lang
  const properLang = getProperLanguage(lang)

  const applicationScope = await sdk.applicationScopes.getSingleByQuery(
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
    {
      lang,
    }
  )

  const { data } = await serverFetcher(
    `/application-scopes/single/${applicationScope?.id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        include: {
          translations: {
            include: {
              locale: true,
            },
          },
        },
      }),
    }
  )

  const localesData = await sdk.supportedLocales.getAll()
  const languages = localesData.data.map((locale: any) => locale.locale)
  const alternateLangs = Object.fromEntries(
    languages.map((lang: SupportedLocale) => [
      lang,
      `${serverUrl}/${lang}/application-scope/${
        data?.translations.find((item: any) => item.locale.locale === lang)
          ?.slug
      }`,
    ])
  )

  const canonicalUrl =
    properLang === i18n.defaultLocale
      ? `${serverUrl}/application-scope/${applicationScope?.translation?.slug}`
      : `${serverUrl}/${lang}/application-scope/${applicationScope?.translation?.slug}`

  return {
    title: applicationScope?.translation?.metaTitle,
    description: applicationScope?.translation?.metaDescription,
    keywords: applicationScope?.translation?.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLangs,
    },
  }
}

export default async function Page({ params: { lang, slug } }: PageProps) {
  const properLang = getProperLanguage(lang)
  const applicationScope = await sdk.applicationScopes.getSingleByQuery(
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
    {
      lang,
    }
  )

  if (!applicationScope || applicationScope.message) return notFound()

  const { data: products } = (await sdk.products.getAllByQuery(
    {
      where: {
        applicationScopes: {
          some: {
            id: applicationScope.id,
          },
        },
      },
    },
    { lang }
  )) as {
    data: Product[]
    pagination: Pagination
  }

  const { data: otherApplicationScopes } =
    await sdk.applicationScopes.getAllByQuery(
      {
        where: {
          id: {
            not: applicationScope.id,
          },
        },
      },
      {
        lang,
      }
    )

  const dict = await getDictionary(lang)
  const content = {
    sidebarTitle: dict.product.application_scope_other_scopes_text || '',
    discoverProductsText:
      dict.product.product_category_discover_restoreplus_products_for_text,
  }

  if (applicationScope.lang !== lang) return notFound()

  return (
    <div>
      <ListersHeroSection data={applicationScope} />
      <Container>
        <DocumentContentSection
          content={content}
          lang={lang}
          listOfOtherContent={otherApplicationScopes || []}
          mainContent={applicationScope}
          products={products || []}
        />
      </Container>
    </div>
  )
}
