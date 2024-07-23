import { z } from 'zod'

export const ProfileFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().optional(),
})

export type ProfileFormData = z.infer<typeof ProfileFormSchema>
