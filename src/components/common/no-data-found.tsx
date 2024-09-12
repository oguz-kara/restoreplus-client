'use client'
import React from 'react'
import Typography from '../ui/typography'
import { Search } from 'lucide-react'
import { useDictionary } from '@/context/use-dictionary-v2'

export default function NoDataFound() {
  const { dictionary: dict } = useDictionary()

  return (
    <div className="bg-gray-100 p-5 flex items-center justify-center gap-1">
      <Search size="25px" />
      <Typography as="p">{dict.common.no_data_found_text}</Typography>
    </div>
  )
}
