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
import { Button } from '@/components/ui/button'
import contactSchema, { ContactFormDataType } from '../schema/contact.schema'

interface ContactFormProps {}

const defaultValues = {
  email: '',
  password: '',
  confirmPassword: '',
  firstName: '',
  lastName: '',
}

export default function ContactForm({
  lang,
}: ContactFormProps & PropsWithLang) {
  const {
    dictionary: { contactPage },
  } = useDictionary()
  const form = useForm<ContactFormDataType>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  })

  function onSubmit(values: ContactFormDataType) {
    console.log(values)
  }

  return (
    <div className="bg-gray-50 p-5">
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid lg:grid-cols-2 gap-5 mb-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    {contactPage.fields.firstName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent py-7 rounded-sm bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    {contactPage.fields.lastName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent py-7 rounded-sm bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    {contactPage.fields.jobTitle}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent py-7 rounded-sm bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    {contactPage.fields.companyName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent py-7 rounded-sm bg-white"
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
                  <FormLabel className="text-lg font-semibold">
                    {contactPage.fields.city}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent py-7 rounded-sm bg-white"
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
                  <FormLabel className="text-lg font-semibold">
                    {contactPage.fields.country}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent py-7 rounded-sm bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    {contactPage.fields.email}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent py-7 rounded-sm bg-white"
                      {...field}
                    />
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
                  <FormLabel className="text-lg font-semibold">
                    {contactPage.fields.phoneNumber}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent py-7 rounded-sm bg-white"
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
                  <FormLabel className="text-lg font-semibold">
                    {contactPage.fields.postalCode}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent py-7 rounded-sm bg-white"
                      {...field}
                    />
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
                  <FormLabel className="text-lg font-semibold">
                    {contactPage.fields.website}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent py-7 rounded-sm bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    {contactPage.fields.companyType}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent py-7 rounded-sm bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    {contactPage.fields.message}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent py-7 rounded-sm bg-white"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mb-5">
            <Button className="w-full py-7 rounded-sm text-lg">
              {contactPage.buttonText}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
