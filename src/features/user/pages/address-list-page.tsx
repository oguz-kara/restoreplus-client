import { Separator } from '@/components/ui/separator'
import { getDictionary, getDictionaryV2 } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import { AddressFormModal } from '../components/address-form-modal'
import { Button } from '@/components/ui/button'
import { getServerSideActiveUser } from '@/utils/get-server-side-active-user'
import AddressCard from '../components/address-card'
import Typography from '@/components/ui/typography'

export default async function AddressListPage({ lang }: PropsWithLang) {
  const dict = await getDictionaryV2(lang)
  const user = await getServerSideActiveUser()

  return (
    <div className="space-y-6">
      <Separator />
      <div className="flex flex-col lg:flex-row lg:w-[60%] gap-5">
        {user?.shippingAddress ? (
          <div className="flex-1">
            <Typography className="mb-2" as="h4">
              {dict.common.shipping_address_text}
            </Typography>
            <AddressCard
              className="w-full"
              addressData={user?.shippingAddress as any}
            />
          </div>
        ) : (
          <AddressFormModal type="shipping">
            <Button variant="outline">
              {dict.common.new_shipping_address_button_text}
            </Button>
          </AddressFormModal>
        )}
        {user?.billingAddress ? (
          <div className="flex-1">
            <Typography className="mb-2" as="h4">
              {dict.common.billing_address_text}
            </Typography>
            <AddressCard
              className="w-full"
              addressData={user?.billingAddress as any}
            />
          </div>
        ) : (
          <AddressFormModal type="billing">
            <Button variant="outline">
              {dict.common.new_billing_address_button_text}
            </Button>
          </AddressFormModal>
        )}
      </div>
    </div>
  )
}
