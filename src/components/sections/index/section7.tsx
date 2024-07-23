'use client'
import Typography from '@/components/ui/typography'
import { PropsWithLang } from '@/i18n/types'
import Section from '@/components/common/section'
import Container from '@/components/common/container'
import { useDictionary } from '@/context/use-dictionary'
import { ServerImage } from '@/components/ui/image'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/common/section-header'
import Link from '@/components/ui/link'

export default function Section7({
  lang,
  sectorData,
}: PropsWithLang & { sectorData: Sector[] | null }) {
  const {
    dictionary: {
      index: {
        section7: { title },
      },
    },
  } = useDictionary()

  if (!sectorData || !sectorData.length) return 'No category data found!'

  return (
    <div className="bg-white pb-20">
      <Section>
        <Container>
          <SectionHeader className="py-10 text-center">{title}</SectionHeader>
          <div className="grid md:grid-cols-3 auto-rows-fr gap-5">
            {sectorData.map(({ id, featuredImage, translation }) => (
              <Link
                key={id}
                lang={lang}
                href={`/sectors/${id}/${translation.slug}`}
              >
                <div className="mb-5">
                  <div className="mb-3">
                    <ServerImage
                      className="w-full object-cover aspect-video"
                      src={featuredImage?.path || ''}
                      width={500}
                      height={500}
                      alt={featuredImage?.alt || ''}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Typography as="h5" className="font-[500] capitalize">
                      {translation.name}
                    </Typography>
                    <ArrowRight size="15px" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
