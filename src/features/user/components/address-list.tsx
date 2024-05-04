'use client'

import { useAuthenticatedUser } from '@/context/auth/auth-context'
import AddressCard, { AddressType } from './address-card'
import { useEffect, useState } from 'react'

export default function AddressList({
  onChange,
  value,
}: {
  onChange?: any
  value?: any
}) {
  const { user } = useAuthenticatedUser()
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(value)

  useEffect(() => {
    onChange && onChange(selectedAddress)
  }, [selectedAddress, onChange])

  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {user?.addressList?.map((address, i) => (
        <AddressCard
          data={address as AddressType}
          key={i}
          onClick={() => setSelectedAddress(address)}
          selected={selectedAddress?.id === address.id}
        />
      ))}
    </div>
  )
}
