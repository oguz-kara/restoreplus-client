'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { AddressForm } from './address-form'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useDictionary } from '@/context/use-dictionary'
import { PropsWithChildren } from 'react'
import { AddressType } from './address-card'

interface AddressFormModalProps {
  address?: AddressType
  type: 'billing' | 'shipping'
}

export function AddressFormModal({
  children,
  type,
  address: companyAddress,
}: PropsWithChildren & AddressFormModalProps) {
  const {
    dictionary: {
      profile: {
        addressList: {
          addressForm: { address },
        },
      },
    },
  } = useDictionary()
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-5">
        <DialogHeader className="p-4">
          <DialogTitle>{address.title}</DialogTitle>
          <DialogDescription>{address.description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[500px]">
          <div className="grid gap-4 p-4">
            <AddressForm addressObj={companyAddress} type={type} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
