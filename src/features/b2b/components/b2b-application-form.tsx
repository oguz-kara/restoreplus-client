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
import b2bApplicationSchema, {
  B2BApplicationFormDataType,
} from '../schema/b2b-application.schema'
import Typography from '@/components/ui/typography'
import { useMutation } from '@/hooks/use-mutation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Check } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PhoneInput } from '@/components/ui/phone-input'
import { useAuthenticatedUser } from '@/context/auth/auth-context'

interface RegisterFormProps {}

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
  city: '',
  country: '',
  phoneNumber: '',
  postalCode: '',
}

export default function B2BApplicationForm({
  lang,
}: RegisterFormProps & PropsWithLang) {
  const { user } = useAuthenticatedUser()
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const { mutateAsync, isPending } = useMutation()
  const {
    dictionary: {
      b2bRegisterPage: { formFields, submitButtonText, title, description },
      b2bRegisterRequestSuccessPage: {
        titleText,
        descriptionText,
        gotoText,
        homepageText,
      },
    },
  } = useDictionary()
  const form = useForm<B2BApplicationFormDataType>({
    resolver: zodResolver(b2bApplicationSchema),
    defaultValues,
  })

  const values = form.watch()

  async function onSubmit(values: B2BApplicationFormDataType) {
    const result: any = await mutateAsync({
      path: '/b2b/register-request',
      method: 'POST',
      body: values,
    })

    if (!result.message) {
      setIsSuccess(true)
      form.reset({})
    }
  }

  useEffect(() => {
    if (user) {
      const initialValues = {
        email: user.email,
        firstName: user.name,
        companyName: user.company?.name,
        city: user.shippingAddress?.city,
        country: user.shippingAddress?.country,
        phoneNumber: user.company?.phoneNumber,
        postalCode: user.shippingAddress?.postalCode as string | undefined,
      }
      form.reset(initialValues)
    }
  }, [user])

  return (
    <div>
      <div className="pb-5 flex flex-col items-center justify-center">
        <Typography
          className="text-3xl font-semibold mb-2 text-gray-600"
          as="h1"
        >
          {title}
        </Typography>
        <Typography as="p" className="text-center text-gray-500">
          {description}
        </Typography>
      </div>
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.emailText}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent  py-7 rounded-sm"
                      autoComplete="off"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{formFields.nameText}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent  py-7 rounded-sm"
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
                  <FormLabel>{formFields.surnameText}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent  py-7 rounded-sm"
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
                  <FormLabel>{formFields.companyNameText}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent  py-7 rounded-sm"
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
                  <FormLabel>{formFields.cityText}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent  py-7 rounded-sm"
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
                  <FormLabel>{formFields.countryText}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent  py-7 rounded-sm"
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
                <FormItem className="flex flex-col items-start">
                  <FormLabel className="text-left mb-2">
                    {formFields.phoneNumberText}
                  </FormLabel>
                  <FormControl className="w-full">
                    <PhoneInput className="rounded-sm" {...field} />
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
                  <FormLabel>{formFields.postalCodeText}</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-transparent  py-7 rounded-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            {isSuccess && (
              <Alert variant="default">
                <Check className="h-4 w-4" color="green" />
                <AlertTitle className="text-green-700">{titleText}</AlertTitle>
                <AlertDescription>{descriptionText}</AlertDescription>
              </Alert>
            )}
          </div>
          <div className="mb-5">
            <Button
              type="button"
              className="w-full py-7 rounded-sm text-lg"
              onClick={async () => onSubmit(values)}
              loading={isPending}
            >
              {submitButtonText}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
