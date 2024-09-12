'use client'
import React, { PropsWithChildren } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import Link from '../ui/link'
import { Button } from '../ui/button'
import { useDictionary } from '@/context/use-dictionary-v2'

export default function ShouldLoginModal({
  children,
  onOpenChange,
  open,
}: {
  onOpenChange?: (val: boolean) => void
  open?: boolean
} & PropsWithChildren) {
  const { dictionary: dict, lang } = useDictionary()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-5">
        <DialogHeader className="p-4">
          <DialogDescription>
            {dict.product.should_login_to_dowload_login_text}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="text-sm">
            {dict.common.close_text}
          </DialogClose>
          <Link href="/login" lang={lang}>
            <Button>{dict.common.login_text}</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
