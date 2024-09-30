import React, { PropsWithChildren, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'

import { cn } from '@/lib/utils'

interface CarouselProps {
  navigation?: boolean
  loop?: boolean
}

export function Carousel({
  children,
  className,
  loop = true,
  navigation = false,
}: PropsWithChildren & PropsWithClassName & CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop,
      duration: 20,
      align: 'start',
      direction: 'ltr',
      axis: 'x',
      containScroll: 'trimSnaps',
      dragFree: false,
    },
    [Autoplay({ delay: 7000 })]
  )
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

/*************  ✨ Codeium Command ⭐  *************/
/******  077fedaa-0794-4ec8-9b24-584b37b65821  *******/
  const onSelect = () => {
    if (emblaApi) {
      setSelectedIndex(emblaApi.selectedScrollSnap())
    }
  }

  useEffect(() => {
    if (emblaApi) {
      setScrollSnaps(emblaApi.scrollSnapList())
      emblaApi.on('select', onSelect) // Add event listener for carousel changes
      onSelect() // Set initial index on mount
    }

    return () => {
      if (emblaApi) {
        emblaApi.off('select', onSelect) // Clean up event listener
      }
    }
  }, [emblaApi])

  return (
    <div className="carousel-container relative max-w-[100vw] overflow-hidden ease-in-out">
      <div className={cn('overflow-hidden', className)} ref={emblaRef}>
        <div className="flex">
          {React.Children.map(children, (child) => (
            <div className="flex-none w-full min-w-0">{child}</div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-5 left-0 right-0 flex gap-3 justify-center">
        {scrollSnaps.map((_, i) => (
          <div
            key={i}
            className={cn(
              'w-5 h-5 border-[2px] border-white rounded-full transition-colors cursor-pointer',
              selectedIndex === i ? 'bg-white' : 'bg-transparent'
            )}
            onClick={() => emblaApi?.scrollTo(i)}
          ></div>
        ))}
      </div>
    </div>
  )
}
