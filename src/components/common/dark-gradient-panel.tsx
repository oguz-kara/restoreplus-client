import Container from '@/components/common/container'
import Section from '@/components/common/section'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'

interface DarkGradientPanelProps {
  theme?: 'normal' | 'gradient'
  lang?: string
}

export default async function DarkGradientPanel({
  theme = 'normal',
  lang,
}: DarkGradientPanelProps) {
  const dict = await getDictionary(lang as any)
  const classNames =
    theme === 'normal'
      ? 'bg-white text-black'
      : 'bg-gradient-to-r from-[#1e1e27] to-[#313140] text-white'

  return (
    <div className={classNames}>
      <Container>
        <Section className="lg:px-0">
          <div className="lg:flex lg:items-center lg:gap-20">
            <div>
              <Typography as="h3" className="mb-5 text-inherit">
                {dict.about.for_industry_text}
              </Typography>
              <Typography as="p" className="mb-5">
                <span className="font-bold">
                  {dict.about.restoreplus_lubricants_text}
                </span>
                <span>{dict.about.short_about_text}</span>
              </Typography>
            </div>
            <div className="flex justify-center">
              <Button className="text-lg">
                {dict.about.learn_more_about_us_button_text}
              </Button>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  )
}
