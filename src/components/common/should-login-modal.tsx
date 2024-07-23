'use client'
import React, { PropsWithChildren } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useDictionary } from '@/context/use-dictionary'
import Link from '../ui/link'
import { Button } from '../ui/button'

export default function ShouldLoginModal({
  children,
  onOpenChange,
  open,
}: {
  onOpenChange?: (val: boolean) => void
  open?: boolean
} & PropsWithChildren) {
  const {
    lang,
    dictionary: { shoulLoginModal },
  } = useDictionary()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-5">
        <DialogHeader className="p-4">
          <DialogDescription>{shoulLoginModal.title}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="text-sm">{shoulLoginModal.close}</DialogClose>
          <Link href="/login" lang={lang}>
            <Button>{shoulLoginModal.login}</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
