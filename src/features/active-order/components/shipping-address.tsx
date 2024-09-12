'use client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import Typography from '@/components/ui/typography'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { useDictionary } from '@/context/use-dictionary-v2'
import AddressCard from '@/features/user/components/address-card'
import { AddressFormModal } from '@/features/user/components/address-form-modal'
import { useEffect, useState } from 'react'

export default function ShippingAddress() {
  const [selectedAddress, setSelectedAddress] = useState<any>()
  const [isSame, setIsSame] = useState<boolean>(true)
  const [initialSetter, setInitialSetter] = useState<boolean>(false)
  const { dictionary: dict } = useDictionary()
  const { user } = useAuthenticatedUser()
  const hasShippingAddress = Boolean(user?.shippingAddress)

  useEffect(() => {
    if (user?.billingAddress && !initialSetter) {
      setInitialSetter(true)
      setIsSame(false)
    }
    if (!user?.billingAddress && !initialSetter) {
      setInitialSetter(true)
      setIsSame(true)
    }
  }, [user])

  return (
    <div>
      <Typography as="h4" className="pb-5">
        {dict.common.shipping_address_text}
      </Typography>
      {hasShippingAddress ? (
        hasShippingAddress && (
          <>
            <AddressCard
              addressData={user?.shippingAddress as any}
              onClick={() => setSelectedAddress(user?.shippingAddress as any)}
            />
            <div className="flex items-center gap-2 pt-5">
              <Label htmlFor="isSame">
                {dict.b2b_registration.is_same_with_shipping_address_text}
              </Label>
              <Switch
                checked={isSame}
                onCheckedChange={(val) => {
                  setIsSame(val)
                }}
                name="isSame"
              />
            </div>
          </>
        )
      ) : (
        <AddressFormModal type="shipping">
          <Button className="mb-5" variant="outline">
            {dict.common.new_shipping_address_button_text}
          </Button>
        </AddressFormModal>
      )}
    </div>
  )
}
