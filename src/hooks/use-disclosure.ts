import { useState } from 'react'

export const useDisclosure = () => {
  const [open, setOpen] = useState(false)

  const onOpen = () => {
    if (!open) setOpen(true)
  }

  const onClose = () => {
    if (open) setOpen(false)
  }

  return { open, onOpen, onClose }
}
