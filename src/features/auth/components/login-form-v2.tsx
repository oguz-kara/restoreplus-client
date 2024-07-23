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
import Typography from '@/components/ui/typography'
import { PropsWithLang } from '@/i18n/types'

const defaultValues: LoginType = {
  email: '',
  password: '',
}

export default function LoginForm({ lang }: PropsWithLang) {
  const router = useRouter()
  const { login, loading, error } = useAuthenticatedUser()
  const { showErrorMessage } = useMessages()
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  })

  const values = form.watch()

  async function handleSubmit() {
    try {
      const user = await login({
        identifier: values.email,
        pwd: values.password,
      })

      if (user) router.push('/')
    } catch (err: any) {
      showErrorMessage()
    }
  }

  return (
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
                        <FormLabel>E posta adresi *</FormLabel>
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
                        <FormLabel>Şifre *</FormLabel>
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
                <Link
                  href="/auth/sifre-sifirla"
                  className="text-blue-500 text-md"
                  lang={lang}
                >
                  Şifremi unuttum
                </Link>
              </FormItem>
            </div>
            <div>
              <FormItem>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  loading={loading}
                  onClick={handleSubmit}
                >
                  Giriş yap
                </Button>
              </FormItem>
            </div>
          </div>
        </form>
      </Form>
    </FormProvider>
  )
}
