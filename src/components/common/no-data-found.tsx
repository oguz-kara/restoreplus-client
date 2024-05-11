'use client'
import React from 'react'
import Typography from '../ui/typography'
import { Search } from 'lucide-react'
import { useDictionary } from '@/context/use-dictionary'

export default function NoDataFound() {
  const {
    dictionary: {
      common: { noDataFound },
    },
  } = useDictionary()
  return (
    <div className="bg-gray-100 p-5 flex items-center justify-center gap-1">
      <Search size="25px" />
      <Typography as="p">{noDataFound}</Typography>
    </div>
  )
}
