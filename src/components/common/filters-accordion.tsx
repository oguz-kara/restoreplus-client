'use client'

import { Filter } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../ui/accordion'
import Typography from '../ui/typography'
import { PropsWithChildren } from 'react'
import { useDictionary } from '@/context/use-dictionary'

export default function FiltersAccordion({ children }: PropsWithChildren) {
  const {
    dictionary: { common },
  } = useDictionary()

  return (
    <Accordion type="multiple" className="lg:hidden">
      <AccordionItem value="filters">
        <AccordionTrigger>
          <div>
            <Typography>{common.filter}</Typography>
            <Filter />
          </div>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
