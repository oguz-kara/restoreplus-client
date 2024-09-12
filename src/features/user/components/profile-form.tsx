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
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDictionary } from '@/context/use-dictionary-v2'

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
  const { userInfo } = useAuthenticatedUser()
  const { dictionary: dict } = useDictionary()
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
        title: dict.messages.failed_to_update_user_info_text,
        description: dict.messages.make_sure_correct_error_text,
      })
    else
      toast({
        title: dict.messages.updated_successfully_text,
        description: dict.messages.user_info_updated_successfully_text,
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
              <FormLabel>{dict.common.first_name_text}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.common.email_text}</FormLabel>
              <FormControl>
                <Input type="email" disabled={true} {...field} />
              </FormControl>
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
              <FormLabel>{dict.common.password_text}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isDirty}
          loading={userInfo?.isPending}
          className="uppercase"
        >
          {dict.common.submit_button_text}
        </Button>
      </form>
    </Form>
  )
}
