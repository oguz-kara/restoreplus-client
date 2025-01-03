'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Typography from '@/components/ui/typography'
import { AddressFormModal } from './address-form-modal'
import { cn } from '@/lib/utils'
import { useDictionary } from '@/context/use-dictionary-v2'

export interface AddressType {
  title: string
  authorizedPerson: string
  address: string
  city: string
  district: string
  state?: string
  zipCode: string
  country: string
}

interface AddressCardProps {
  addressData: AddressType
  className?: string
  type?: 'billing' | 'shipping'
}

export default function AddressCard({
  addressData,
  className,
  type = 'shipping',
  ...rest
}: AddressCardProps & { onClick?: () => void; selected?: boolean }) {
  const { dictionary: dict } = useDictionary()

  return (
    <Card
      className={cn('p-0 max-w-[300px] rounded-sm relative', className)}
      {...rest}
    >
      {/* overlay */}
      <Typography
        as="h5"
        className="flex items-center justify-between bg-gray-100 p-4 text-sm font-[500]"
      >
        {addressData.title}
      </Typography>
      <div className="p-4 text-xs">
        <Typography className="font-[500]" as="p">
          {addressData.authorizedPerson}
        </Typography>
        <Typography as="p">{addressData.address}</Typography>
        <Typography as="p">{addressData.zipCode}</Typography>
        <Typography as="p">
          {addressData.district}/{addressData.city}
        </Typography>
      </div>
      {/* actions */}
      <div className="flex justify-between items-center p-4">
        <AddressFormModal type={type} address={addressData}>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-black"
          >
            {dict.common.edit_address_button_text}
          </Button>
        </AddressFormModal>
      </div>
    </Card>
  )
}
