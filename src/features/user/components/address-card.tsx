'use client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Typography from '@/components/ui/typography'
import { useDictionary } from '@/context/use-dictionary'
import { CheckCircle, Trash } from 'lucide-react'
import { AddressFormModal } from './address-form-modal'
import { clientFetcher } from '@/lib/client-fetcher'
import { useToast } from '@/components/ui/use-toast'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'

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
  data: AddressType
}

export default function AddressCard({
  data,
  selected,
  ...rest
}: AddressCardProps & { onClick?: () => void; selected?: boolean }) {
  const { refetchUser } = useAuthenticatedUser()
  const router = useRouter()
  const {
    dictionary: {
      common,
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

    router.refresh()
  }

  return (
    <Card className={cn('p-0 max-w-[300px] rounded-sm relative')} {...rest}>
      {/* overlay */}
      {selected && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.2)]"></div>
      )}
      <Typography
        as="h5"
        className="flex items-center justify-between bg-gray-100 p-4 text-sm font-[500]"
      >
        {data.title}
        {selected ? <CheckCircle color="green" /> : null}
      </Typography>
      <div className="p-4 text-xs">
        <Typography className="font-[500]" as="p">
          {data.authorizedPerson}
        </Typography>
        <Typography as="p">{data.address}</Typography>
        <Typography as="p">{data.zipCode}</Typography>
        <Typography as="p">
          {data.district}/{data.city}
        </Typography>
      </div>
      {/* actions */}
      <div className="flex justify-between items-center p-4">
        <Button
          variant="ghost"
          className="p-0 hover:bg-transparent hover:underline"
          onClick={async () => handleDeleteAddress()}
        >
          <Trash size="16px" className="mr-1" />
          {common.removeText}
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
