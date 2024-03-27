'use client'

import { useAuthenticateUser } from '@/context/auth/auth-context'
import AddressCard, { AddressType } from './address-card'

export default function AddressList() {
  const { user } = useAuthenticateUser()
  return (
    <div className="grid lg:grid-cols-2 gap-5">
      {user?.addressList?.map((address, i) => (
        <AddressCard data={address as AddressType} key={i} />
      ))}
    </div>
  )
}
