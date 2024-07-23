import { Separator } from '@/components/ui/separator'
import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import { AddressFormModal } from '../components/address-form-modal'
import AddressList from '../components/address-list'
import { Button } from '@/components/ui/button'
import { getServerSideActiveUser } from '@/utils/get-server-side-active-user'

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
      {!user?.billingAddress && (
        <AddressFormModal>
          <Button variant="outline">{addressList.newAddressButton}</Button>
        </AddressFormModal>
      )}
      <AddressList />
    </div>
  )
}
