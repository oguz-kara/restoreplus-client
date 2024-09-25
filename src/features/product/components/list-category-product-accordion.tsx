'use client'
import React from 'react'
import { Accordion } from '@/components/ui/accordion'
import { useSearchParams } from 'next/navigation'
import ListCategoryProductAccordionItem from './list-category-product-accordion-item'

export interface ListCategoryDataType {
  id: number
  name: string
  description?: string | null
  shortDescription?: string | null
  metaDescription: string | null
  productCount: number
  icon?: { id: number; path: string; alt: string }
}

export default function ListCategoryProductAccordion({
  listCategoryData,
}: {
  listCategoryData: ListCategoryDataType[]
}) {
  const searchParams = useSearchParams()
  const sectorId = searchParams.get('sectorId')
  const applicationScopeId = searchParams.get('applicationScopeId')

  return (
    <div>
      <Accordion type="multiple">
        {listCategoryData && listCategoryData.length > 0
          ? listCategoryData.map((category: any, i: number) => (
              <ListCategoryProductAccordionItem
                category={category}
                i={i}
                key={category.id}
                filters={{ sectorId, applicationScopeId }}
              />
            ))
          : null}
      </Accordion>
    </div>
  )
}
