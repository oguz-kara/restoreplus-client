'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'
import { AddressFormData, AddressSchema } from '../schema/address.schema'
import { useDictionary } from '@/context/use-dictionary'
import { Input } from '@/components/ui/input'
import { clientFetcher } from '@/lib/client-fetcher'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { useEffect } from 'react'
import { AddressType } from './address-card'
import { useMutation } from '@/hooks/use-mutation'
import { useRouter } from 'next/navigation'

const defaultValues: Partial<AddressFormData> = {
  title: '',
  authorizedPerson: '',
  address: '',
  city: '',
  state: '',
  district: '',
  zipCode: '',
  country: '',
}

interface AddressFormProps {
  addressObj?: AddressType
}

export function AddressForm({ addressObj }: AddressFormProps) {
  const router = useRouter()
  const { mutateAsync, isPending } = useMutation<any>()
  const { refetchUser } = useAuthenticatedUser()
  const {
    dictionary: {
      profile: {
        addressList: { addressForm, buttonText },
      },
      toastMessages: { userInfo },
    },
  } = useDictionary()

  const form = useForm<AddressFormData>({
    resolver: zodResolver(AddressSchema),
    defaultValues,
  })

  async function onSubmit(data: AddressFormData) {
    const method = addressObj ? 'PUT' : 'POST'
    // @ts-ignore
    const idParam = addressObj ? `?id=${addressObj.id}` : ''
    const {
      authorizedPerson,
      city,
      country,
      district,
      zipCode,
      state,
      address,
      title,
    } = data

    const res = await mutateAsync({
      path: `/active-user/address${idParam}`,
      method,
      body: {
        authorizedPerson,
        city,
        country,
        district,
        zipCode,
        state,
        address,
        title,
      },
    })

    if (res.success) {
      await refetchUser()
      toast({
        title: userInfo.title,
        description: userInfo.description,
      })
      router.refresh()
    }
  }

  useEffect(() => {
    if (addressObj) form.reset(addressObj)
  }, [addressObj, form])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{addressForm.title.label}</FormLabel>
              <FormControl>
                <Input placeholder={addressForm.title.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="authorizedPerson"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{addressForm.authorizedPerson.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={addressForm.authorizedPerson.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{addressForm.street1.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={addressForm.street1.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{addressForm.country.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={addressForm.country.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{addressForm.city.label}</FormLabel>
              <FormControl>
                <Input placeholder={addressForm.city.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="district"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{addressForm.district.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={addressForm.district.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{addressForm.postalCode.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={addressForm.postalCode.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={isPending}>
          {buttonText}
        </Button>
      </form>
    </Form>
  )
}
