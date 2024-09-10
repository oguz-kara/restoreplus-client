'use client'

import { useDictionary } from '@/context/use-dictionary'
import Image from '../../ui/image'
import Typography from '../../ui/typography'
import { Input } from '../../ui/input'
import Container from '../../common/container'
import Link from '../../ui/link'
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
          src="/images/490724.jpg"
          alt="restoreplus hero image"
          width={1920}
          height={500}
          style={{
            objectFit: 'cover',
            width: '100%',
            height: '500px',
          }}
        />
        <div className="absolute left-0 right-0 top-0 bottom-0 bg-[rgba(0,0,0,0.6)]"></div>
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
              <Link className="text-primary" href="/" lang={lang}>
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
