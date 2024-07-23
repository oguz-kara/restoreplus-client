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
import { toast } from '@/components/ui/use-toast'
import { CompanyFormData, CompanySchema } from '../schema/company.schema'
import { useDictionary } from '@/context/use-dictionary'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { useEffect } from 'react'
import { Textarea } from '@/components/ui/textarea'
import { useMutation } from '@/hooks/use-mutation'

// This can come from your database or API.
const defaultValues: Partial<CompanyFormData> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
}

export function CompanyForm() {
  const { mutateAsync, isPending } = useMutation<any>()
  const { user } = useAuthenticatedUser()
  const {
    dictionary: {
      profile: {
        company: { companyForm, buttonText },
      },
      toastMessages: { userInfo },
    },
  } = useDictionary()
  const form = useForm<CompanyFormData>({
    resolver: zodResolver(CompanySchema),
    defaultValues,
  })

  async function onSubmit(data: CompanyFormData) {
    const { description, name, phoneNumber, website } = data

    const url = user?.company?.id
      ? `/active-user/company/?id=${user?.company?.id}`
      : '/active-user/company'

    const res = await mutateAsync({
      path: url,
      body: {
        name,
        description,
        phoneNumber,
        website,
      },
      method: 'POST',
    })

    if (res.success)
      toast({
        title: userInfo.title,
        description: userInfo.description,
      })
  }

  useEffect(() => {
    if (user) form.reset(user.company)
  }, [user, form])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{companyForm.name.label}</FormLabel>
              <FormControl>
                <Input placeholder={companyForm.name.placeholder} {...field} />
              </FormControl>
              <FormDescription>{companyForm.name.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{companyForm.description.label}</FormLabel>
              <FormControl>
                <Textarea
                  placeholder={companyForm.description.placeholder}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {companyForm.description.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{companyForm.website.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={companyForm.website.placeholder}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {companyForm.website.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{companyForm.phoneNumber.label}</FormLabel>
              <FormControl>
                <Input
                  placeholder={companyForm.phoneNumber.placeholder}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {companyForm.phoneNumber.description}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={isPending}>
          {buttonText}
        </Button>
      </form>
    </Form>
  )
}
