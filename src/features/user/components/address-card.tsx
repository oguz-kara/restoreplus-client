'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Typography from '@/components/ui/typography'
import { useDictionary } from '@/context/use-dictionary'
import { Trash } from 'lucide-react'
import { AddressFormModal } from './address-form-modal'
import { clientFetcher } from '@/lib/client-fetcher'
import { useToast } from '@/components/ui/use-toast'
import { useAuthenticatedUser } from '@/context/auth/auth-context'

export interface AddressType {
  title: string
  authorizedPerson: string
  street1: string
  street2: string
  city: string
  district: string
  phone: string
  state?: string
  postalCode: string
  country: string
}

interface AddressCardProps {
  data: AddressType
}

export default function AddressCard({ data }: AddressCardProps) {
  const { refetchUser } = useAuthenticatedUser()
  const {
    dictionary: {
      profile: { addressList },
      toastMessages: { userInfo },
    },
  } = useDictionary()
  const { toast } = useToast()

  const handleDeleteAddress = async () => {
    // @ts-ignore
    const id = data.id
    const res = await clientFetcher(`/active-user/address?id=${id}`, {
      method: 'DELETE',
    })

    if (res.success) {
      await refetchUser()
      toast({
        title: userInfo.title,
        description: userInfo.description,
      })
    }
  }

  return (
    <Card className="p-0 max-w-[300px] rounded-sm">
      <Typography as="h5" className="bg-gray-100 p-4 text-sm font-[500]">
        {data.title}
      </Typography>
      <div className="p-4 text-xs">
        <Typography className="font-[500]" as="p">
          {data.authorizedPerson}
        </Typography>
        <Typography as="p">{data.street1}</Typography>
        <Typography as="p">{data.street2}</Typography>
        <Typography as="p">
          {data.district}/{data.city}
        </Typography>
        <Typography as="p">{data.phone}</Typography>
      </div>
      {/* actions */}
      <div className="flex justify-between items-center p-4">
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent hover:underline"
          onClick={async () => handleDeleteAddress()}
        >
          <Trash size="16px" className="mr-1" />
          Sil
        </Button>
        <AddressFormModal address={data}>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-black"
          >
            {addressList.editAddressButtonText}
          </Button>
        </AddressFormModal>
      </div>
    </Card>
  )
}
