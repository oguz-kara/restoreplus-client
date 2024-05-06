import { z } from 'zod'

const contactSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  emailAddress: z.string(),
  phoneNumber: z.string(),
  city: z.string(),
  country: z.string(),
  postalCode: z.string(),
  message: z.string(),
  companyTitle: z.string().optional(),
})

export type ContactFormDataType = z.infer<typeof contactSchema>

export default contactSchema
