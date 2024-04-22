import Section from '@/components/common/section'
import { Button } from '@/components/ui/button'
import Image from '@/components/ui/image'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'

export default async function Section2({ lang }: PropsWithLang) {
  const {
    index: { section2 },
    common,
  } = await getDictionary(lang)
  return (
    <div className="bg-foreground text-white mt-10 lg:mt-20">
      <Section className="pt-20">
        <div className="flex flex-col-reverse lg:flex-row gap-10">
          <div className="lg:flex-1">
            <Typography as="h4" className="text-primary mb-5">
              {section2.blueText}
            </Typography>
            <Typography as="h2" className="leading-10 mb-5">
              {section2.heading}
            </Typography>
            <ul className="mb-5">
              {section2.list.map((item, i) => (
                <li key={i} className="mb-4">
                  <b>
                    {item.title} {` `}
                  </b>
                  <span>{item.content}</span>
                </li>
              ))}
            </ul>
            <Button>{common.learnMore}</Button>
          </div>
          <div className="lg:flex-1">
            <Image
              className="w-full"
              src="/images/5989.jpg"
              alt={section2.image.alt}
              width={500}
              height={500}
            />
          </div>
        </div>
      </Section>
    </div>
  )
}
