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
import { cn } from '@/lib/utils'
import { clientFetcher } from '@/lib/client-fetcher'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { useState } from 'react'
import { useLoading } from '@/hooks/use-loading'

interface ContactFormProps {}

const defaultValues = {
  fullName: '',
  emailAddress: '',
  phoneNumber: '',
  city: '',
  country: '',
  postalCode: '',
  message: '',
  companyTitle: '',
}

export default function ContactForm({
  lang,
  theme,
  className,
}: ContactFormProps &
  PropsWithLang & {
    theme?: { bg: string; text: string }
  } & PropsWithClassName) {
  const router = useRouter()
  const { toast } = useToast()
  const { loading, startLoading, stopLoading } = useLoading()

  const defaultTheme = theme
    ? theme
    : {
        bg: 'bg-transparent',
        text: 'text-black',
      }
  const {
    dictionary: {
      contactPage,
      quoteRequest: {
        quoteSubmittedMessage: { errorMessage, successMessage },
      },
    },
  } = useDictionary()
  const form = useForm<ContactFormDataType>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  })

  async function onSubmit(values: ContactFormDataType) {
    try {
      startLoading()
      const result = await clientFetcher('/quote-request', {
        method: 'POST',
        body: JSON.stringify({
          ...values,
        }),
      })

      if (result.id) {
        toast({
          title: successMessage.message,
          description: successMessage.description,
        })
        router.push('/')
        return
      } else
        return toast({
          variant: 'destructive',
          title: errorMessage,
        })
    } catch (err) {
      console.log(err)
    } finally {
      stopLoading()
    }
  }

  return (
    <div className={cn('p-5', defaultTheme.bg, defaultTheme.text, className)}>
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
                  <FormLabel className="text-sm font-semibold">
                    {contactPage.fields.firstName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'bg-transparent py-3 rounded-sm border border-gray-400 text-black',
                        defaultTheme.bg === 'white'
                          ? 'text-white'
                          : 'text-black'
                      )}
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
                  <FormLabel className="text-sm font-semibold">
                    {contactPage.fields.lastName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'bg-transparent py-3 rounded-sm border border-gray-400 text-black',
                        defaultTheme.bg === 'white'
                          ? 'text-white'
                          : 'text-black'
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    {contactPage.fields.companyName}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'bg-transparent py-3 rounded-sm border border-gray-400 text-black',
                        defaultTheme.bg === 'white'
                          ? 'text-white'
                          : 'text-black'
                      )}
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
                  <FormLabel className="text-sm font-semibold">
                    {contactPage.fields.city}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'bg-transparent py-3 rounded-sm border border-gray-400 text-black',
                        defaultTheme.bg === 'white'
                          ? 'text-white'
                          : 'text-black'
                      )}
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
                  <FormLabel className="text-sm font-semibold">
                    {contactPage.fields.country}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'bg-transparent py-3 rounded-sm border border-gray-400 text-black',
                        defaultTheme.bg === 'white'
                          ? 'text-white'
                          : 'text-black'
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold">
                    {contactPage.fields.email}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'bg-transparent py-3 rounded-sm border border-gray-400 text-black',
                        defaultTheme.bg === 'white'
                          ? 'text-white'
                          : 'text-black'
                      )}
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
                  <FormLabel className="text-sm font-semibold">
                    {contactPage.fields.phoneNumber}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'bg-transparent py-3 rounded-sm border border-gray-400 text-black',
                        defaultTheme.bg === 'white'
                          ? 'text-white'
                          : 'text-black'
                      )}
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
                  <FormLabel className="text-sm font-semibold">
                    {contactPage.fields.postalCode}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        'bg-transparent py-3 rounded-sm border border-gray-400 text-black',
                        defaultTheme.bg === 'white'
                          ? 'text-white'
                          : 'text-black'
                      )}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm font-semibold">
                      {contactPage.fields.message}
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        rows={9}
                        className={cn(
                          'bg-transparent py-3 rounded-sm border border-gray-400 text-black',
                          defaultTheme.bg === 'white'
                            ? 'text-white'
                            : 'text-black'
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="mb-5">
            <Button
              loading={loading}
              className="w-full py-3 rounded-sm text-sm"
            >
              {contactPage.buttonText}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
