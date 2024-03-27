import { z } from 'zod'

export const CompanySchema = z.object({
  name: z.string(),
  description: z.string(),
  website: z.string(),
  phoneNumber: z.string(),
})

export type CompanyFormData = z.infer<typeof CompanySchema>
