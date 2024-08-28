import { Separator } from '@/components/ui/separator'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import { AddressFormModal } from '../components/address-form-modal'
import AddressList from '../components/address-list'
import { Button } from '@/components/ui/button'
import { getServerSideActiveUser } from '@/utils/get-server-side-active-user'
import AddressCard from '../components/address-card'
import Typography from '@/components/ui/typography'

export default async function AddressListPage({ lang }: PropsWithLang) {
  const {
    profile: { addressList },
  } = await getDictionary(lang)
  const user = await getServerSideActiveUser()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{addressList.title}</h3>
        <p className="text-sm text-muted-foreground">
          {addressList.description}
        </p>
      </div>
      <Separator />
      <div className="flex flex-col lg:flex-row lg:w-[60%] gap-5">
        {user?.shippingAddress ? (
          <div className="flex-1">
            <Typography className="mb-2" as="h4">
              Shipping Address
            </Typography>
            <AddressCard
              className="w-full"
              addressData={user?.shippingAddress as any}
            />
          </div>
        ) : (
          <AddressFormModal type="shipping">
            <Button variant="outline">
              {addressList.newShippingAddressText}
            </Button>
          </AddressFormModal>
        )}
        {user?.billingAddress ? (
          <div className="flex-1">
            <Typography className="mb-2" as="h4">
              Billing Address
            </Typography>
            <AddressCard
              className="w-full"
              addressData={user?.billingAddress as any}
            />
          </div>
        ) : (
          <AddressFormModal type="billing">
            <Button variant="outline">
              {addressList.newBillingAddressText}
            </Button>
          </AddressFormModal>
        )}
      </div>
    </div>
  )
}
