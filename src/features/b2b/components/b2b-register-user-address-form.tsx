'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Locale, PropsWithLang } from '@/i18n/types'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useDictionary } from '@/context/use-dictionary'
import { useEffect, useState } from 'react'
import b2bRegisterUserAddressSchema, {
  B2BRegisterUserAddressDataType,
} from '../schema/b2b-register-address.shema'
import Typography from '@/components/ui/typography'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Address } from '../types'

export interface B2BRegisterUserAddressInputData {
  shippingAddress?: B2BRegisterUserAddressDataType
  billingAddress?: B2BRegisterUserAddressDataType
  isSame: boolean
}

interface B2BRegisterUserAddressProps {
  onChange?: (values: B2BRegisterUserAddressDataType) => void
  value?: B2BRegisterUserAddressDataType
}

const defaultValues = {
  title: '',
  authorizedPerson: '',
  description: '',
  country: '',
  city: '',
  district: '',
  zipCode: '',
  state: '',
}

function B2BRegisterUserShippingAddressForm({
  lang,
  onChange,
  value,
}: B2BRegisterUserAddressProps & PropsWithLang) {
  const {
    dictionary: { b2bCompleteRegistrationPage },
  } = useDictionary()
  const form = useForm<B2BRegisterUserAddressDataType>({
    resolver: zodResolver(b2bRegisterUserAddressSchema),
    defaultValues,
  })

  const { step3 } = b2bCompleteRegistrationPage

  const values = form.watch()

  useEffect(() => {
    if (values && onChange && JSON.stringify(values) !== JSON.stringify(value))
      onChange(values)
  }, [values])

  return (
    <div className="mb-10 lg:mb-0">
      <Typography className="text-gray-800 mb-5" as="h4">
        {step3.shippinAddressTitle}
      </Typography>
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    {step3.formFields.titleText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
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
                  <FormLabel className="text-gray-700">
                    {step3.formFields.authorizedPersonText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    {step3.formFields.addressDescriptionText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
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
                  <FormLabel className="text-gray-700">
                    {step3.formFields.countryText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
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
                  <FormLabel className="text-gray-700">
                    {step3.formFields.cityText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
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
                  <FormLabel className="text-gray-700">
                    {step3.formFields.districtText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
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
                  <FormLabel className="text-gray-700">
                    {step3.formFields.zipCodeText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    {step3.formFields.stateText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}

function B2BRegisterUserBillingAddressForm({
  lang,
  onChange,
  value
}: B2BRegisterUserAddressProps & PropsWithLang) {
  const {
    dictionary: { b2bCompleteRegistrationPage },
  } = useDictionary()
  const form = useForm<B2BRegisterUserAddressDataType>({
    resolver: zodResolver(b2bRegisterUserAddressSchema),
    defaultValues,
  })

  const { step3 } = b2bCompleteRegistrationPage

  const values = form.watch()

  useEffect(() => {
    if (values && onChange && JSON.stringify(values) !== JSON.stringify(value))
      onChange(values)
  }, [values])

  return (
    <div>
      <Typography className="text-gray-800 mb-5" as="h4">
        {step3.billingAddressTitle}
      </Typography>
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    {step3.formFields.titleText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
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
                  <FormLabel className="text-gray-700">
                    {step3.formFields.authorizedPersonText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    {step3.formFields.addressDescriptionText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
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
                  <FormLabel className="text-gray-700">
                    {step3.formFields.countryText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
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
                  <FormLabel className="text-gray-700">
                    {step3.formFields.cityText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
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
                  <FormLabel className="text-gray-700">
                    {step3.formFields.districtText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
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
                  <FormLabel className="text-gray-700">
                    {step3.formFields.zipCodeText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    {step3.formFields.stateText}
                  </FormLabel>
                  <FormControl>
                    <Input className="py-7 rounded-sm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  )
}

interface B2BRegisterUserMainAddressProps {
  lang: Locale
  value: B2BRegisterUserAddressInputData | null
  onChange?: (values: B2BRegisterUserAddressInputData) => void
}

export default function B2BRegisterUserAddressForm({
  lang,
  onChange,
  value,
}: B2BRegisterUserMainAddressProps) {
  const [isSame, setIsSame] = useState<boolean>(true)
  const [shippingAddress, setShippingAddress] = useState<
    B2BRegisterUserAddressDataType | undefined
  >(undefined)
  const [billingAddress, setBillingAddress] = useState<
    B2BRegisterUserAddressDataType | undefined
  >(undefined)
  const {
    dictionary: { b2bCompleteRegistrationPage },
  } = useDictionary()

  useEffect(() => {
    const values = { shippingAddress, billingAddress, isSame }
    if (values && onChange && JSON.stringify(values) !== JSON.stringify(value))
      onChange(values)
  }, [shippingAddress, billingAddress, isSame])

  return (
    <div>
      <B2BRegisterUserShippingAddressForm
        lang={lang}
        onChange={(values) => setShippingAddress(values)}
        value={shippingAddress}
      />
      <div className="flex items-center gap-5 py-5">
        <Label htmlFor="is-same" className="text-gray-700">
          {b2bCompleteRegistrationPage.isSameWithShippingAddressText}
        </Label>
        <Switch
          checked={isSame}
          id="is-same"
          name="is-same"
          onCheckedChange={(value) => setIsSame(value)}
        />
      </div>
      {!isSame && (
        <B2BRegisterUserBillingAddressForm
          lang={lang}
          onChange={(values) => setBillingAddress(values)}
          value={billingAddress}
        />
      )}
    </div>
  )
}
