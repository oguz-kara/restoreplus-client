import Container from '@/components/common/container'
import Section from '@/components/common/section'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale, PropsWithLang } from '@/i18n/types'

interface InfoPanelProps {
  theme: 'normal' | 'gradient'
  infoPanelTranslation: {
    heading: string
    boldText: string
    text: string
    buttonText: string
  }
}

export default function InfoSection({
  theme = 'normal',
  infoPanelTranslation,
}: InfoPanelProps) {
  const classNames =
    theme === 'normal'
      ? 'bg-white text-black'
      : 'bg-gradient-to-r from-[#1e1e27] to-[#313140] text-white'

  const { boldText, buttonText, heading, text } = infoPanelTranslation

  return (
    <div className={classNames}>
      <Section>
        <Container>
          <div className="lg:flex lg:items-center lg:gap-20">
            <div>
              <Typography as="h3" className="mb-5">
                {heading}
              </Typography>
              <Typography as="p" className="mb-5">
                <span className="font-bold">{boldText}</span>
                <span>{text}</span>
              </Typography>
            </div>
            <div className="flex justify-center">
              <Button className="p-7 text-lg">{buttonText}</Button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
