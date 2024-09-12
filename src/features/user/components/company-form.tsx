'use client'
import { useEffect } from 'react'
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
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { Textarea } from '@/components/ui/textarea'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDictionary } from '@/context/use-dictionary-v2'

const defaultValues: Partial<CompanyFormData> = {}

export function CompanyForm({
  initialUserCompanyInfo,
}: {
  initialUserCompanyInfo: CompanyFormData | null
}) {
  const router = useRouter()
  const { company } = useAuthenticatedUser()
  const { dictionary: dict } = useDictionary()
  const form = useForm<CompanyFormData>({
    resolver: zodResolver(CompanySchema),
    defaultValues,
  })

  async function onSubmit(data: CompanyFormData) {
    const { description, name, phoneNumber, website } = data

    const result = await company?.set({
      name,
      description,
      phoneNumber,
      website,
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
    if (initialUserCompanyInfo) form.reset(initialUserCompanyInfo)
  }, [initialUserCompanyInfo, form])

  if (company?.isPending)
    return (
      <div>
        <Loader className="animate-spin" />
      </div>
    )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.common.name_text}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.common.description_text}</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.common.website_text}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{dict.common.phone_number_text}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" loading={company?.isPending}>
          {dict.common.submit_button_text}
        </Button>
      </form>
    </Form>
  )
}
