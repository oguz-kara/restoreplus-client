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
import { useDictionary } from '@/context/use-dictionary-v2'

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
  const { dictionary: dict } = useDictionary()

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
        title: dict.messages.failed_to_update_user_info_text,
        description: dict.messages.make_sure_correct_error_text,
      })
    else
      toast({
        title: dict.messages.updated_successfully_text,
        description: dict.messages.user_info_updated_successfully_text,
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
              <FormLabel>{dict.common.title_text}</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>{dict.common.authorized_person_text}</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>{dict.common.address_text}</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>{dict.common.country_text}</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>{dict.common.city_text}</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>{dict.common.district_text}</FormLabel>
              <FormControl>
                <Input {...field} />
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
              <FormLabel>{dict.common.postal_code_text}</FormLabel>
              <FormControl>
                <Input {...field} />
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
          className="uppercase"
        >
          {dict.common.submit_button_text}
        </Button>
      </form>
    </Form>
  )
}
