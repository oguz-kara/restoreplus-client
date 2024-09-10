import { PropsWithLang } from '@/i18n/types'
import { getDictionary } from '@/i18n/get-dictionary'
import Typography from '@/components/ui/typography'
import Image from '@/components/ui/image'
import Section from '@/components/common/section'
import Container from '@/components/common/container'
import './style.css'

const links = [
  {
    image: {
      src: '/images/product.png',
      alt: 'industrial lubricants',
    },
  },
  {
    image: {
      src: '/images/satisfied.png',
      alt: 'satisfied customers',
    },
  },
  {
    image: {
      src: '/images/experience.png',
      alt: 'years of experience',
    },
  },
]

export default async function HeroSection({ lang }: PropsWithLang) {
  const {
    aboutPage: { hero },
  } = await getDictionary(lang)

  return (
    <div className="about-page-hero-container min-h-[500px] lg:min-h-[700px]">
      <Section>
        <Container>
          <div className="text-center lg:p-10">
            <Typography as="h5" className="text-2xl font-semibold mb-2">
              {hero.topTitle}
            </Typography>
            <Typography as="h3" className="text-4xl font-semibold mb-5">
              {hero.title}
            </Typography>
            <Typography as="p" className="text-lg lg:text-2xl lg:leading-10">
              {hero.description}
            </Typography>
          </div>
          <div className="grid lg:grid-cols-3">
            {hero.columns.map((item, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center py-5 lg:py-0"
              >
                <div className="mb-5">
                  <Image
                    src={links[i].image.src}
                    alt={links[i].image.alt}
                    width={250}
                    height={250}
                  />
                </div>
                <div>
                  <Typography as="h4" className="text-5xl mb-3 font-normal">
                    {item.title}
                  </Typography>
                  <Typography as="p" className="text-2xl">
                    {item.text}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}
