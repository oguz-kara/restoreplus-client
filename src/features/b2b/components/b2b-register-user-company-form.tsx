'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { PropsWithLang } from '@/i18n/types'
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
import { useEffect } from 'react'
import b2bRegisterUserCompanySchema, {
  B2BRegisterUserCompanyDataType,
} from '../schema/b2b-register-user-company.schema'

interface RegisterFormProps {
  onChange?: (values: B2BRegisterUserCompanyDataType) => void
  value: any
}

const defaultValues = {
  name: '',
  description: '',
  phoneNumber: '',
  fixedLine: '',
  taxNumber: '',
}

export default function B2BRegisterUserCompanyForm({
  lang,
  value,
  onChange,
}: RegisterFormProps & PropsWithLang) {
  const {
    dictionary: { b2bCompleteRegistrationPage },
  } = useDictionary()
  const form = useForm<B2BRegisterUserCompanyDataType>({
    resolver: zodResolver(b2bRegisterUserCompanySchema),
    defaultValues,
  })

  const { step2 } = b2bCompleteRegistrationPage

  const values = form.watch()

  useEffect(() => {
    if (values && onChange && JSON.stringify(values) !== JSON.stringify(value))
      onChange(values)
  }, [values])

  return (
    <div>
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    {step2.formFields.nameText}
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
                    {step2.formFields.descriptionText}
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    {step2.formFields.phoneNumberText}
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
              name="fixedLine"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    {step2.formFields.fixedLineText}
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
              name="taxNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    {step2.formFields.taxNumberText}
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
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    {step2.formFields.websiteText}
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
