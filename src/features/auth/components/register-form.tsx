'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { PropsWithLang } from '@/i18n/types'
import registerSchema, { RegisterFormDataType } from '../schema/register.schema'
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
import { Checkbox } from '@/components/ui/checkbox'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import useMessages from '@/hooks/use-messages'
import SecondaryMessage from '@/components/common/secondary-message'
import { useEffect } from 'react'
import { useDictionary } from '@/context/use-dictionary-v2'

interface RegisterFormProps {}

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function RegisterForm({
  lang,
}: RegisterFormProps & PropsWithLang) {
  const { showErrorMessage } = useMessages()
  const { register } = useAuthenticatedUser()
  const { dictionary: dict } = useDictionary()
  const form = useForm<RegisterFormDataType>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  })

  const values = form.watch()

  async function onSubmit(values: RegisterFormDataType) {
    const { isError, isSuccess, registerUser } = register

    const result = await registerUser(values)

    console.log({ result })

    if (isSuccess) form.reset({})

    if (isError) showErrorMessage()
  }

  useEffect(() => {
    console.log({ values })
  }, [values])

  return (
    <div className="">
      {register.isSuccess && (
        <div className="pb-5">
          <SecondaryMessage
            title={dict.messages.user_registration_successfull_message}
            description={
              dict.messages.user_registration_successfull_check_email_message
            }
          />
        </div>
      )}
      <Form {...form}>
        <form
          className="flex flex-col gap-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.common.email_text}</FormLabel>
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
                <FormLabel>{dict.common.first_name_text}</FormLabel>
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
                <FormLabel>{dict.common.last_name_text}</FormLabel>
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.common.password_text}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    autoComplete="off"
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dict.common.confirm_password_text}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
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
            name="promotions"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl className="mt-[8px]">
                  <Checkbox
                    onCheckedChange={field.onChange}
                    checked={field.value}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                    ref={field.ref}
                    name={field.name}
                  />
                </FormControl>
                <FormLabel className="mt-0">
                  <Typography as="p" className="leading-6">
                    {dict.register.accept_promotions_text}
                  </Typography>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="reconciliations"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl className="mt-[8px]">
                  <Checkbox
                    onCheckedChange={field.onChange}
                    checked={field.value}
                    onBlur={field.onBlur}
                    disabled={field.disabled}
                    ref={field.ref}
                    name={field.name}
                  />
                </FormControl>
                <FormLabel className="mt-0">
                  <Typography as="p" className="leading-6">
                    <span>{dict.register.aggreeing_following_text}</span>{' '}
                    <span className="text-blue-500 underline">
                      <Link
                        href="/terms-and-conditions"
                        lang={lang}
                        target="_blank"
                      >
                        {dict.footer.terms_and_conditions_text} {` `}
                      </Link>
                    </span>
                    <span>and {` `} </span>
                    <span className="text-blue-500 underline">
                      <Link href="/privacy" lang={lang} target="_blank">
                        {dict.footer.privacy_statement_text}
                      </Link>
                    </span>
                  </Typography>
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mb-5">
            <Button
              loading={register.isPending}
              className="w-full py-7 rounded-sm text-lg"
            >
              {dict.register.title}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
