'use client'
import { useDictionary } from '@/context/use-dictionary'
import Image from '@/components/ui/image'
import Typography from '@/components/ui/typography'
import { Input } from '@/components/ui/input'
import Container from '@/components/common/container'
import Link from '@/components/ui/link'
import { ArrowRight } from 'lucide-react'

export default function HeroSection() {
  const {
    lang,
    dictionary: {
      index: { hero },
    },
  } = useDictionary()

  return (
    <div className="p-4 relative flex items-center justify-center h-[500px]">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-image.png"
          alt="restoreplus hero image"
          width={1920}
          height={500}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '500px',
          }}
        />
      </div>
      <Container className="relative text-center">
        <Typography as="h2" className="text-white mb-10">
          {hero.title}
        </Typography>
        <Input
          type="text"
          placeholder={hero.input.placeholder}
          className="mt-4 p-2 rounded-md mb-10"
        />
        <div className="flex items-center flex-wrap justify-center gap-3 text-white">
          <Typography as="p">{hero.join.text}</Typography>
          <div className="flex items-center gap-2">
            <Typography as="p">
              <Link className="text-primary" href={hero.join.href} lang={lang}>
                {hero.join.linkText}
              </Link>
            </Typography>
            <ArrowRight className="text-primary" />
          </div>
        </div>
      </Container>
    </div>
  )
}
