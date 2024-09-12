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
import b2bRegisterUserSchema, {
  B2BRegisterUserDataType,
} from '../schema/b2b-register-user.shema'
import { useEffect, useState } from 'react'
import { NormalizedUserInputData } from '../types'
import { useDictionary } from '@/context/use-dictionary-v2'

interface RegisterFormProps {
  onChange?: (values: B2BRegisterUserDataType) => void
  value: B2BRegisterUserDataType | null
  userData: NormalizedUserInputData | null
}

const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function B2BRegisterUserForm({
  lang,
  onChange,
  userData,
  value,
}: RegisterFormProps & PropsWithLang) {
  const { dictionary } = useDictionary()
  const [initialValueSetted, setInitialValueSetted] = useState<boolean>(false)
  const form = useForm<B2BRegisterUserDataType>({
    resolver: zodResolver(b2bRegisterUserSchema),
    defaultValues,
  })
  const formValues = form.watch()

  useEffect(() => {
    if (userData && !initialValueSetted) {
      const { email, name } = userData
      form.reset({ email, name })
      onChange && onChange({ email, name, password: '', confirmPassword: '' })
      setInitialValueSetted(true)
    }
  }, [userData])

  useEffect(() => {
    if (
      formValues &&
      onChange &&
      JSON.stringify(formValues) !== JSON.stringify(value)
    )
      onChange(formValues)
  }, [formValues])

  return (
    <div>
      <Form {...form}>
        <form className="flex flex-col gap-5">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    {dictionary.common.email_text}
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="py-7 rounded-sm"
                      autoComplete="off"
                      disabled={true}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    {dictionary.common.name_text}
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">
                    {dictionary.common.password_text}
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={userData?.userExists}
                      type="password"
                      autoComplete="off"
                      className="py-7 rounded-sm"
                      {...field}
                      value={userData?.userExists ? 'xxxxxxx' : field.value}
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
                  <FormLabel className="text-gray-700">
                    {dictionary.common.confirm_password_text}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      disabled={userData?.userExists}
                      autoComplete="off"
                      className="py-7 rounded-sm"
                      {...field}
                      value={userData?.userExists ? 'xxxxxxx' : field.value}
                    />
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
