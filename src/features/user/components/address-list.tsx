'use client'

import { useAuthenticatedUser } from '@/context/auth/auth-context'
import AddressCard from './address-card'
import { useEffect, useState } from 'react'
import Typography from '@/components/ui/typography'
import { useDictionary } from '@/context/use-dictionary'

export default function AddressList({
  onChange,
  value,
}: {
  onChange?: any
  value?: any
}) {
  const {
    dictionary: {
      profile: {
        addressList: { billingAddressText },
      },
    },
  } = useDictionary()
  const { user } = useAuthenticatedUser()
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(value)

  useEffect(() => {
    onChange && onChange(selectedAddress)
  }, [selectedAddress, onChange])

  return (
    user?.billingAddress && (
      <div>
        <Typography className="mb-3" as="h3">
          {billingAddressText}
        </Typography>
        <AddressCard
          data={user?.billingAddress as any}
          onClick={() => setSelectedAddress(user?.billingAddress as any)}
          selected={selectedAddress?.id === user?.billingAddress?.id}
        />
      </div>
    )
  )
}
