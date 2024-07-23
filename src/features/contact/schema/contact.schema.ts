import { z } from 'zod'

const contactSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  emailAddress: z.string().email().min(1),
  phoneNumber: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  postalCode: z.string().min(1),
  message: z.string().min(1),
  companyTitle: z.string().optional(),
})

export type ContactFormDataType = z.infer<typeof contactSchema>

export default contactSchema
