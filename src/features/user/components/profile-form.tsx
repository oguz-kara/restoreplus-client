'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { ProfileFormData, ProfileFormSchema } from '../schema/profile.schema'
import { useDictionary } from '@/context/use-dictionary'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { useEffect } from 'react'
import { clientFetcher } from '@/lib/client-fetcher'

const defaultValues: Partial<ProfileFormData> = {
  firstName: '',
  lastName: '',
  email: '',
  password: 'xxxxx',
}

export function ProfileForm() {
  const { toast } = useToast()
  const { user } = useAuthenticatedUser()
  const {
    dictionary: {
      profile: {
        account: { accountForm, buttonText },
      },
      toastMessages: { userInfo },
    },
  } = useDictionary()
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues,
  })

  async function onSubmit(data: ProfileFormData) {
    const { firstName, lastName, email } = data
    const res = await clientFetcher(`/active-user?id=${user?.id}`, {
      method: 'PUT',
      body: JSON.stringify({ firstName, lastName, email }),
    })

    if (res.success)
      toast({
        title: userInfo.title,
        description: userInfo.description,
      })
  }

  useEffect(() => {
    const initialFormData = {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      password: 'xxxxxxxxxxxx',
    }
    form.reset(initialFormData)
  }, [user])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{accountForm.firstName.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={accountForm.firstName.placeholder}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {accountForm.firstName.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{accountForm.lastName.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={accountForm.lastName.placeholder}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {accountForm.lastName.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{accountForm.email.label}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder={accountForm.email.placeholder}
                  {...field}
                />
              </FormControl>
              <FormDescription>{accountForm.email.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>{accountForm.password.label}</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={accountForm.password.placeholder}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!form.formState.isDirty}>
          {buttonText}
        </Button>
      </form>
    </Form>
  )
}
