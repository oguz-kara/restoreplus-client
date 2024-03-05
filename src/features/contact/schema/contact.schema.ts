import { z } from 'zod'

const contactSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  jobTitle: z.string(),
  companyName: z.string(),
  city: z.string(),
  country: z.string(),
  phoneNumber: z.string(),
  postalCode: z.string(),
  website: z.string(),
  companyType: z.string(),
  message: z.string(),
})

export type ContactFormDataType = z.infer<typeof contactSchema>

export default contactSchema
