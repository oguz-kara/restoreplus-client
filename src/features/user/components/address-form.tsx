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
import { AddressFormData, AddressSchema } from '../schema/address.schema'
import { useDictionary } from '@/context/use-dictionary'
import { Input } from '@/components/ui/input'
import { AddressInput, useAuthenticatedUser } from '@/context/auth/auth-context'
import { useEffect } from 'react'
import { AddressType } from './address-card'
import { useToast } from '@/components/ui/use-toast'
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
  type: 'billing' | 'shipping'
}

export function AddressForm({ addressObj, type }: AddressFormProps) {
  const { address } = useAuthenticatedUser()
  const { toast } = useToast()
  const router = useRouter()
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
    const {
      authorizedPerson,
      city,
      country,
      district,
      zipCode,
      state,
      address: addressText,
      title,
    } = data

    const inputData = {
      authorizedPerson,
      city,
      country,
      district,
      zipCode,
      state,
      address: addressText,
      title,
    } as AddressInput

    let result = null

    if (type === 'shipping') {
      result = addressObj
        ? await address?.shipping.set(inputData)
        : await address?.shipping.create(inputData)
    } else {
      result = addressObj
        ? await address?.billing.set(inputData)
        : await address?.billing.create(inputData)
    }

    if (!result || result.message)
      toast({
        title: userInfo.errorText,
        description: userInfo.errorDescription,
      })
    else
      toast({
        title: userInfo.title,
        description: userInfo.description,
      })

    router.refresh()
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
        <Button
          type="submit"
          loading={
            type === 'shipping'
              ? address?.shipping.isPending
              : address?.billing.isPending
          }
        >
          {buttonText}
        </Button>
      </form>
    </Form>
  )
}
