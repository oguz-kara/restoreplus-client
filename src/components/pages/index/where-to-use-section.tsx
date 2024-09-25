import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import { remoteUrl } from '@/config/get-env-fields'
import { SupportedLocale } from '@/i18n'
import { getDictionary } from '@/i18n/get-dictionary'
import React from 'react'

interface WithMessageType {
  message: string
}

export default async function WhereToUseSection({
  lang,
  applicationScopes,
}: {
  lang: SupportedLocale
  applicationScopes: ApplicationScope[] | null | undefined | WithMessageType
}) {
  const dict = await getDictionary(lang)

  if ((applicationScopes as WithMessageType)?.message || !applicationScopes)
    return null

  return (
    <section>
      <Typography
        className="text-4xl md:text-5xl lg:text-6xl font-semibold py-5 px-2"
        as="h2"
      >
        {dict.index.section_one_title}
      </Typography>
      <div className="flex gap-x-2 gap-y-5 flex-col md:flex-row flex-wrap px-2">
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
              <div className="text-center">
                <Button size="lg">{dict.index.section_one_button_text}</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
