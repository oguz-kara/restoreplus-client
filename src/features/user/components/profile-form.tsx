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
import { useRouter } from 'next/navigation'

const defaultValues: Partial<ProfileFormData> = {
  name: '',
  email: '',
  password: 'xxxxx',
}

export function ProfileForm({
  initialProfileFormData,
}: {
  initialProfileFormData: Partial<ProfileFormData> | null
}) {
  const router = useRouter()
  const { toast } = useToast()
  const { user, userInfo } = useAuthenticatedUser()
  const {
    dictionary: {
      profile: {
        account: { accountForm, buttonText },
      },
      toastMessages: { userInfo: userInfoDict },
    },
  } = useDictionary()
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues,
  })

  async function onSubmit(data: ProfileFormData) {
    const { name } = data

    const result = await userInfo?.set({
      name,
    })

    if (!result || result.message)
      toast({
        title: userInfoDict.errorText,
        description: userInfoDict.errorDescription,
      })
    else
      toast({
        title: userInfoDict.title,
        description: userInfoDict.description,
      })

    router.refresh()
  }

  useEffect(() => {
    if (initialProfileFormData) {
      const { name, email } = initialProfileFormData
      const initialFormData = {
        email: email || '',
        name: name || '',
        password: 'xxxxxxxxxxxx',
      }
      form.reset(initialFormData)
    }
  }, [initialProfileFormData, form])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{accountForm.email.label}</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  disabled={true}
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
        <Button
          type="submit"
          disabled={!form.formState.isDirty}
          loading={userInfo?.isPending}
        >
          {buttonText}
        </Button>
      </form>
    </Form>
  )
}
