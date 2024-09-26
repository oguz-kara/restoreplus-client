'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { useDictionary } from '@/context/use-dictionary-v2'
import { cn } from '@/lib/utils'

export default function BackButton({ className }: PropsWithClassName) {
  const { dictionary: dict, lang } = useDictionary()
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  if (window.history.length <= 1) return null

  return (
    <div className={cn('py-10', className)}>
      <Button
        variant="ghost"
        className="p-0 hover:bg-transparent hover:text-gray-500"
        onClick={() => handleBack()}
      >
        <ArrowLeft className="mr-1" />
        {dict.product.single_product_back_button_text}
      </Button>
    </div>
  )
}
