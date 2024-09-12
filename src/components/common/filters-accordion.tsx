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
import { useDictionary } from '@/context/use-dictionary-v2'

export default function FiltersAccordion({ children }: PropsWithChildren) {
  const { dictionary: dict } = useDictionary()

  return (
    <Accordion type="multiple" className="lg:hidden">
      <AccordionItem value="filters">
        <AccordionTrigger>
          <div>
            <Typography>{dict.common.filter_text}</Typography>
            <Filter />
          </div>
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
