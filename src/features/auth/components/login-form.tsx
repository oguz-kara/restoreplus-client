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
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { useRouter } from 'next/navigation'
import { LoginSchema, LoginType } from '../schema/login.schema'

interface LoginFormProps {}

const defaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function LoginForm({ lang }: LoginFormProps & PropsWithLang) {
  const { login } = useAuthenticatedUser()
  const router = useRouter()

  const {
    dictionary: {
      auth: {
        login: { page },
      },
    },
  } = useDictionary()
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues,
  })

  async function onSubmit(values: LoginType) {
    try {
      const loginSuccess = await login({
        identifier: values.email,
        pwd: values.password,
      })

      if (loginSuccess) router.push('/')
    } catch (err: any) {
      console.log(err)
    }
  }

  return (
    <div className="text-white">
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
                <FormLabel>{page.fields.email}</FormLabel>
                <FormControl>
                  <Input
                    className="bg-transparent text-white py-7 rounded-sm"
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
                <FormLabel>{page.fields.password}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="bg-transparent text-white py-7 rounded-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mb-5">
            <Button className="w-full py-7 rounded-sm text-lg">
              {page.buttonText}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
