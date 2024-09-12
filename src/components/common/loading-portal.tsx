'use client'

import { Loader2 } from 'lucide-react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Typography from '../ui/typography'
import { useDictionary } from '@/context/use-dictionary'
import { useDictionary } from '@/context/use-dictionary-v2'

export default function LoadingPortal({
  isOpen,
  hideScrollBar = false,
}: {
  isOpen: boolean
  hideScrollBar?: boolean
}) {
  const { dictionary: dict } = useDictionary()

  useEffect(() => {
    if (hideScrollBar) {
      if (isOpen) document.body.style.overflow = 'hidden'
      else document.body.style.overflow = 'initial'
    }
  }, [isOpen])

  if (!isOpen) return null

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
      }}
    >
      <div className="flex items-center justify-center flex-col">
        <div
          className="flex items-center justify-center w-20 h-20 rounded-full bg-primary p-3"
          style={{
            boxShadow:
              'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px',
          }}
        >
          <Loader2
            className="animate-spin h-full w-full"
            style={{
              zIndex: 10000,
            }}
          />
        </div>
        <Typography className="text-white" as="h4">
          {dict.common.wait_text}
        </Typography>
      </div>
    </div>,
    document.body
  )
}
