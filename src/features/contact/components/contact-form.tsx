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
import { Button } from '@/components/ui/button'
import contactSchema, { ContactFormDataType } from '../schema/contact.schema'
import { cn } from '@/lib/utils'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { Textarea } from '@/components/ui/textarea'
import { useOfferProducts } from '@/context/use-offer-products'
import { useMutation } from '@/hooks/use-mutation'
import { useDictionary } from '@/context/use-dictionary-v2'

interface ContactFormProps {
  path: string
}

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
  theme,
  className,
  path = '/quote-request',
}: ContactFormProps &
  PropsWithLang & {
    theme?: { bg: string; text: string }
  } & PropsWithClassName) {
  const router = useRouter()
  const { mutateAsync, isPending } = useMutation<{
    quoteRequest: QuoteRequest
    offer?: { products: Product[] }
    message?: string
  }>()
  const { toast } = useToast()
  const { offerProducts } = useOfferProducts()

  const defaultTheme = theme
    ? theme
    : {
        bg: 'bg-transparent',
        text: 'text-black',
      }
  const { dictionary: dict } = useDictionary()
  const form = useForm<ContactFormDataType>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  })

  async function onSubmit(values: ContactFormDataType) {
    try {
      if (path === '/offer-products') {
        const result = await mutateAsync({
          path: '/offer-products',
          body: {
            quoteRequest: {
              ...values,
            },
            offer: {
              products: offerProducts,
            },
          },
          method: 'POST',
        })

        if (!result.message) {
          toast({
            title: dict.messages.successfully_submit_description,
            description: dict.messages.quote_request_email_description,
          })
          router.push('/')
          return
        } else
          return toast({
            variant: 'destructive',
            title: dict.messages.quote_request_error_message,
            description: result.message,
          })
      } else {
        const result = await mutateAsync({
          path: '/quote-request',
          body: {
            ...values,
          },
          method: 'POST',
        })

        if ((result as any).id) {
          toast({
            title: dict.messages.successfully_submit_description,
            description: dict.messages.quote_request_email_description,
          })
          router.push('/')
          return
        } else
          return toast({
            variant: 'destructive',
            title: dict.messages.quote_request_error_message,
            description: result.message,
          })
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className={cn('p-5', defaultTheme.bg, defaultTheme.text, className)}>
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">
                    {dict.common.first_name_text}
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
                  <FormLabel className="text-sm text-gray-700">
                    {dict.common.last_name_text}
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
                  <FormLabel className="text-sm text-gray-700">
                    {dict.common.company_name_text}
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
                  <FormLabel className="text-sm text-gray-700">
                    {dict.common.city_text}
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
                  <FormLabel className="text-sm text-gray-700">
                    {dict.common.country_text}
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
                  <FormLabel className="text-sm text-gray-700">
                    {dict.common.email_text}
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
                  <FormLabel className="text-sm text-gray-700">
                    {dict.common.phone_number_text}
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
                  <FormLabel className="text-sm text-gray-700">
                    {dict.common.postal_code_text}
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
            <div className="lg:col-span-2">
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-sm text-gray-700">
                      {dict.common.message_text}
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
              loading={isPending}
              className="w-full py-3 rounded-sm text-sm uppercase"
            >
              {dict.common.submit_button_text}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
