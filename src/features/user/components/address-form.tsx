'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
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
import { useAuthenticateUser } from '@/context/auth/auth-context'
import { useEffect } from 'react'
import { AddressType } from './address-card'

const defaultValues: Partial<AddressFormData> = {
  title: '',
  authorizedPerson: '',
  street1: '',
  street2: '',
  city: '',
  state: '',
  district: '',
  phone: '',
  postalCode: '',
  country: '',
}

interface AddressFormProps {
  address?: AddressType
}

export function AddressForm({ address }: AddressFormProps) {
  const { refetchUser } = useAuthenticateUser()
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
    const method = address ? 'PUT' : 'POST'
    // @ts-ignore
    const idParam = address ? `?id=${address.id}` : ''
    const {
      authorizedPerson,
      city,
      country,
      district,
      phone,
      postalCode,
      state,
      street1,
      street2,
      title,
    } = data

    const res = await clientFetcher(`/active-user/address${idParam}`, {
      method,
      body: JSON.stringify({
        authorizedPerson,
        city,
        country,
        district,
        phone,
        postalCode,
        state,
        street1,
        street2,
        title,
      }),
    })

    if (res.success) {
      await refetchUser()
      toast({
        title: userInfo.title,
        description: userInfo.description,
      })
    }
  }

  useEffect(() => {
    console.log(address)
    if (address) form.reset(address)
  }, [address, form])

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
          name="street1"
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
          name="street2"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{addressForm.street2.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={addressForm.street2.placeholder}
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
          name="postalCode"
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
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{addressForm.phone.label}</FormLabel>
              <FormControl>
                <Input placeholder={addressForm.phone.placeholder} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{buttonText}</Button>
      </form>
    </Form>
  )
}
