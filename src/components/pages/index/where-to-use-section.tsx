'use client'
import { Button } from '@/components/ui/button'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { remoteUrl } from '@/config/get-env-fields'
import { useDictionary } from '@/context/use-dictionary-v2'
import { SupportedLocale } from '@/i18n'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function WhereToUseSection({
  lang,
  applicationScopes,
}: {
  lang: SupportedLocale
  applicationScopes: ApplicationScope[] | null | undefined | WithMessageType
}) {
  const router = useRouter()
  const { dictionary: dict } = useDictionary()

  const handleSeeDetailsButtonClick = (slug: string) => {
    router.push(`/application-scope/${slug}`)
  }
  const handleSeeProductsButtonClick = (slug: string) => {
    router.push(`/collections/application-scopes/${slug}`)
  }

  if ((applicationScopes as WithMessageType)?.message || !applicationScopes)
    return null

  return (
    <section className="mb-20">
      <Typography
        className="text-4xl md:text-5xl lg:text-6xl font-semibold py-5 px-2"
        as="h2"
      >
        {dict.index.section_one_title}
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-5 flex-col md:flex-row flex-wrap px-2 mb-10">
        {(applicationScopes as ApplicationScope[]).map((item) => (
          <div
            key={item.id}
            className="h-[250px] rounded-lg"
            style={{
              backgroundImage: `url(${remoteUrl}${item.featuredImage?.path})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
            }}
          >
            <Link
              href={`/application-scope/${item.translation.slug}`}
              lang={lang}
            >
              <div
                className="h-full p-5 flex flex-col justify-between rounded-lg"
                style={{
                  backgroundColor: 'rgba(0,0,0,0.4)',
                }}
              >
                <Typography
                  as="h3"
                  className="text-white text-3xl uppercase font-semibold"
                >
                  {item.translation.name}
                </Typography>
                <div className="flex gap-2">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSeeDetailsButtonClick(item.translation.slug)
                    }}
                    className="flex-1"
                    size="sm"
                    role="link"
                    aria-label={dict.index.see_details_text}
                  >
                    {dict.index.see_details_text}
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSeeProductsButtonClick(item.translation.slug)
                    }}
                    className="flex-1"
                    size="sm"
                    role="link"
                    aria-label={dict.index.explore_products_text}
                  >
                    {dict.index.explore_products_text}
                  </Button>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="text-center">
        <Link href={`/collections/application-scopes`} lang={lang}>
          <Button variant="bright-accent" size="xl" className="">
            {dict.index.see_more_use_cases_text}
          </Button>
        </Link>
      </div>
    </section>
  )
}
