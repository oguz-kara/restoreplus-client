'use client'
import { Button } from '@/components/ui/button'
import { Grid, List } from 'lucide-react'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import ListCategoryProductAccordion from './list-category-product-accordion'
import ListProductsCardsV2 from './list-products-cards-v2'
import { cn } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'
import OfferProductsDrawer from '@/features/offer-products/components/offer-products-drawer'

const convertStringToBool = (str: string | undefined | null) => {
  if (str === 'true') return true
  else return false
}

export default function ListProductTabs({
  listCategoryData,
  children,
}: {
  listCategoryData: any
  children: any
}) {
  const [showList, setShowList] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)

  const handleShowList = (val: boolean) => {
    localStorage.setItem('showList', val.toString())
    setShowList(val)
  }

  useEffect(() => {
    const showList = convertStringToBool(localStorage.getItem('showList'))
    setShowList(showList)
    setLoading(false)
  }, [])

  if (loading)
    return (
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <Skeleton key={item} className="h-[75px] bg-gray-200" />
        ))}
      </div>
    )

  return (
    <div>
      <OfferProductsDrawer />
      <div className="flex items-center justify-between py-5">
        {children}
        <div className="flex">
          <Button
            className={cn('mr-1', showList ? 'bg-primary' : '')}
            variant="outline"
            onClick={() => handleShowList(true)}
          >
            <List />
          </Button>

          <Button
            className={cn(!showList ? 'bg-primary' : '')}
            variant="outline"
            onClick={() => handleShowList(false)}
          >
            <Grid />
          </Button>
        </div>
      </div>
      <div>
        {showList ? (
          <ListCategoryProductAccordion listCategoryData={listCategoryData} />
        ) : (
          <ListProductsCardsV2 />
        )}
      </div>
    </div>
  )
}
