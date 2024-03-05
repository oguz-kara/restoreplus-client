import Container from '@/components/common/container'
import Section from '@/components/common/section'
import { Button } from '@/components/ui/button'
import Image from '@/components/ui/image'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import { ArrowRight } from 'lucide-react'

export default async function Section4({ lang }: PropsWithLang) {
  const {
    index: { section4 },
  } = await getDictionary(lang)
  return (
    <Section>
      <Container>
        <div>
          <Typography as="h3" className="font-normal pb-10 text-center">
            {section4.heading}
          </Typography>
          <div className="flex flex-col items-center">
            <div className="flex flex-wrap gap-5 mb-10">
              {section4.lubricantTypes.map((item, i) => (
                <div key={i} className="bg-black">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={60}
                    height={60}
                  />
                </div>
              ))}
            </div>
            <div>
              <Button variant="outline" className="text-lg">
                <Typography as="p" className="mr-3">
                  {section4.buttonText}
                </Typography>
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}
