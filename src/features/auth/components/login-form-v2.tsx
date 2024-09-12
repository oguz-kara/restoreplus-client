'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { FormSectionContainer } from '@/components/common/form-section-container'
import useMessages from '@/hooks/use-messages'
import { LoginSchema, LoginType } from '../schema/login.schema'
import Link from '@/components/ui/link'
import { Button } from '@/components/ui/button'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { PropsWithLang } from '@/i18n/types'
import Typography from '@/components/ui/typography'
import { AlertMessage } from '@/components/common/alert-message'
import { useEffect } from 'react'
import { useDictionaryV2 } from '@/context/use-dictionary-v2'

const defaultValues: LoginType = {
  email: '',
  password: '',
}

export default function LoginForm({ lang }: PropsWithLang) {
  const { dictionary: dict } = useDictionaryV2()
  const router = useRouter()
  const { login } = useAuthenticatedUser()
  const { showErrorMessage } = useMessages()
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  })

  const values = form.watch()

  async function handleSubmit() {
    try {
      const user = await login.loginUser({
        identifier: values.email,
        pwd: values.password,
      })

      if (user) router.push('/')
    } catch (err: any) {
      showErrorMessage()
    }
  }

  useEffect(() => {
    console.log({ error: login.error })
    console.log({ message: login.error ? login.error.message : null })
  }, [login.error])

  return (
    <div>
      {login.isError && (
        <div className="pt-5">
          <AlertMessage
            title="Error"
            text={login.error.message}
            variant="destructive"
          />
        </div>
      )}
      <FormProvider {...form}>
        <Form {...form}>
          <form className="relative space-y-8">
            <div className="p-[1px]">
              <FormSectionContainer className="border-none mb-0 pb-0">
                <div>
                  <div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field, fieldState }) => (
                        <FormItem className="mb-5">
                          <FormLabel>{dict.common.email_text}</FormLabel>
                          <Input type="text" {...field} />
                          <FormControl>
                            {fieldState.error ? (
                              <FormMessage>
                                {fieldState.error.message}
                              </FormMessage>
                            ) : null}
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field, fieldState }) => (
                        <FormItem className="mb-5">
                          <FormLabel>{dict.common.password_text}</FormLabel>
                          <Input type="password" {...field} />
                          <FormControl>
                            {fieldState.error ? (
                              <FormMessage>
                                {fieldState.error.message}
                              </FormMessage>
                            ) : null}
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </FormSectionContainer>
              <div>
                <FormItem className="mb-5">
                  <Typography>
                    {dict.login.dont_have_an_account_text}
                    <Link
                      href="/register"
                      lang={lang}
                      className="text-blue-500 text-md"
                    >
                      {dict.common.sign_up_text}
                    </Link>
                  </Typography>
                  <Link
                    href="/auth/sifre-sifirla"
                    className="text-blue-500 text-md"
                    lang={lang}
                  >
                    {dict.login.forgot_password_text}
                  </Link>
                </FormItem>
              </div>
              <div>
                <FormItem>
                  <Button
                    type="button"
                    variant="secondary"
                    className="w-full"
                    loading={login.isPending}
                    onClick={handleSubmit}
                  >
                    {dict.common.login_text}
                  </Button>
                </FormItem>
              </div>
            </div>
          </form>
        </Form>
      </FormProvider>
    </div>
  )
}
