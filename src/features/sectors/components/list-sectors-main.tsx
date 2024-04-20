import React from 'react'
import serverConfig from '@/config/server-config.json'
import Image from '@/components/ui/image'
import Typography from '@/components/ui/typography'
import Link from '@/components/ui/link'
import { Locale, PropsWithLang } from '@/i18n/types'
import { getSectors } from '../api/get-sectors'
import { getProperLanguage } from '@/i18n/utils'

export default async function ListSectorsMain({ lang }: PropsWithLang) {
  const properLang = getProperLanguage(lang)
  const res = await getSectors({ lang: properLang as Locale })

  if (!res) return 'no data found!'

  const { data } = res

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
      {data.map((item, i) => (
        <SectorCard key={i} sector={item} lang={lang} />
      ))}
    </div>
  )
}

function SectorCard({
  sector,
  lang,
}: { sector: SectorWithTranslation } & PropsWithLang) {
  return (
    <Link href={`/sectors/${sector.id}/${sector.translation.slug}`} lang={lang}>
      <div className="flex gap-5 flex-col items-center text-center border border-gray-300 p-5 mb-5">
        <div>
          <Typography as="h5" className="font-[500] text-md">
            {sector.translation.title}
          </Typography>
        </div>
        <div>
          <Image
            className="h-[150px] object-cover"
            src={`${serverConfig.remoteUrl}/${sector.featuredImage?.path}`}
            width={500}
            height={500}
            alt={sector.featuredImage?.alt ? sector.featuredImage.alt : 'image'}
          />
        </div>
      </div>
    </Link>
  )
}
