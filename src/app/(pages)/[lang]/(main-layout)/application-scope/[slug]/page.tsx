import Container from '@/components/common/container'
import { ParamsWithLang } from '@/i18n/types'
import React from 'react'
import { getDictionary } from '@/i18n/get-dictionary'
import { Metadata } from 'next'
import { sdk } from '@/restoreplus-sdk'
import { serverUrl } from '@/config/get-env-fields'
import DocumentContentSection from '@/components/common/document-content-section'
import { ListersHeroSection } from '@/components/common/listers-hero-section'

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

  const applicationScope = await sdk.applicationScopes.getSingleByQuery(
    {
      where: {
        translations: {
          some: {
            slug,
          },
        },
      },
    },
    {
      lang,
    }
  )

  const localesData = await sdk.supportedLocales.getAll()
  const languages = localesData.data.map((locale: any) => locale.locale)
  const alternateLangs = Object.fromEntries(
    languages.map((lang: SupportedLocale) => [
      lang,
      `${serverUrl}/${lang}/application-scope/${applicationScope?.translation?.slug}`,
    ])
  )

  const canonicalUrl = `${serverUrl}/${lang}/application-scope/${applicationScope?.translation?.slug}`

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
  const { data: products } = (await sdk.products.getAllByQuery(
    {
      where: {
        applicationScopes: {
          some: {
            translations: {
              some: {
                slug,
              },
            },
          },
        },
      },
    },
    { lang }
  )) as {
    data: Product[]
    pagination: Pagination
  }

  const applicationScope = await sdk.applicationScopes.getSingleByQuery(
    {
      where: {
        translations: {
          some: {
            slug,
          },
        },
      },
    },
    {
      lang,
    }
  )

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
