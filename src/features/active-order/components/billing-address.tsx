'use client'
import { Button } from '@/components/ui/button'
import Typography from '@/components/ui/typography'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { useDictionary } from '@/context/use-dictionary'
import AddressCard from '@/features/user/components/address-card'
import { AddressFormModal } from '@/features/user/components/address-form-modal'
import { useState } from 'react'

export default function BillingAddress() {
  const [selectedAddress, setSelectedAddress] = useState<any>()
  const {
    dictionary: {
      orderAddressPickers: {
        billingAddress: { billingAddressText, newBillingAddressText },
      },
    },
  } = useDictionary()
  const { user } = useAuthenticatedUser()
  const hasBillingAddress = Boolean(user?.billingAddress)

  return (
    <div>
      <Typography as="h4" className="pb-5">
        {billingAddressText}
      </Typography>
      {hasBillingAddress ? (
        hasBillingAddress && (
          <AddressCard
            addressData={user?.billingAddress as any}
            onClick={() => setSelectedAddress(user?.billingAddress as any)}
          />
        )
      ) : (
        <AddressFormModal type="billing">
          <Button className="mb-5" variant="outline">
            {newBillingAddressText}
          </Button>
        </AddressFormModal>
      )}
    </div>
  )
}
