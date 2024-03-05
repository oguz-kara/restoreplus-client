import Container from '@/components/common/container'
import Section from '@/components/common/section'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'

interface DarkGradientPanelProps {
  theme?: 'normal' | 'gradient'
  dictionary: {
    heading: string
    aboutBold: string
    about: string
    aboutButton: string
  }
}

export default async function DarkGradientPanel({
  dictionary,
  theme = 'normal',
}: DarkGradientPanelProps) {
  const classNames =
    theme === 'normal'
      ? 'bg-white text-black'
      : 'bg-gradient-to-r from-[#1e1e27] to-[#313140] text-white'

  return (
    <div className={classNames}>
      <Container>
        <Section>
          <div className="lg:flex lg:items-center lg:gap-20">
            <div>
              <Typography as="h3" className="mb-5">
                {dictionary.heading}
              </Typography>
              <Typography as="p" className="mb-5">
                <span className="font-bold">{dictionary.aboutBold}</span>
                <span>{dictionary.about}</span>
              </Typography>
            </div>
            <div className="flex justify-center">
              <Button className="p-7 text-lg">{dictionary.aboutButton}</Button>
            </div>
          </div>
        </Section>
      </Container>
    </div>
  )
}
