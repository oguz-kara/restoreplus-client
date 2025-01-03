import React from 'react'
import serverConfig from '@/config/server-config.json'
import Image from '@/components/ui/image'
import Typography from '@/components/ui/typography'
import Link from '@/components/ui/link'
import { PropsWithLang } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'

export default async function ListSectorsMain({ lang }: PropsWithLang) {
  const res = await sdk.sectors.getAllByQuery({}, { lang })

  if (!res) return 'no data found!'

  const { data } = res

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-5">
      {data.map((item: Sector, i: number) => (
        <SectorCard key={i} sector={item} lang={lang} />
      ))}
    </div>
  )
}

function SectorCard({ sector, lang }: { sector: Sector } & PropsWithLang) {
  return (
    <Link href={`/sectors/${sector.id}/${sector.translation.slug}`} lang={lang}>
      <div className="flex gap-5 flex-col items-center text-center border border-gray-300 p-5 mb-5">
        <div>
          <Typography as="h5" className="font-[500] text-md">
            {sector.translation.name}
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
