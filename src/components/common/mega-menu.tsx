import { cn } from '@/lib/utils'
import React, { useState } from 'react'

interface MegaMenuProps {
  onOpen: () => void
  onClose: () => void
  open: boolean
  trigger: React.ReactNode
  content: React.ReactNode
  top: number | undefined
}

export default function MegaMenu({
  onOpen,
  onClose,
  open,
  trigger,
  content,
  top,
}: MegaMenuProps) {
  const [contentHovered, setContentHovered] = useState(false)
  const triggerRef = React.useRef<HTMLDivElement>(null)
  const calculatedTop = top
    ? top
    : triggerRef.current?.getBoundingClientRect().height && 0

  const openedClasses =
    'overflow-initial opacity-1 transition duration-300 ease-in-out h-auto'
  const closeClasses =
    'overflow-hidden opacity-0 transition duration-300 ease-in-out h-0'

  return (
    <>
      <div className="text-white" onMouseLeave={() => onClose()}>
        <div
          className={cn('inline-block')}
          ref={triggerRef}
          onMouseOver={() => onOpen()}
        >
          {trigger}
        </div>
        <div
          className={cn(
            'fixed z-50 bg-white text-black left-0 right-0',
            calculatedTop ? `top-[125px]` : 0,
            open || contentHovered ? openedClasses : closeClasses
          )}
          onMouseOver={() => setContentHovered(true)}
          onMouseLeave={() => setContentHovered(false)}
          style={{
            boxShadow:
              'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
          }}
        >
          {content}
        </div>
      </div>
    </>
  )
}
