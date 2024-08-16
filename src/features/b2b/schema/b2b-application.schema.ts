import { z } from 'zod'

const b2bApplicationSchema = z.object({
  email: z.string().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  companyName: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  phoneNumber: z.string().min(10),
  postalCode: z.string(),
  countryCodeForPhoneNumber: z.string().min(2).max(6),
})

export type B2BApplicationFormDataType = z.infer<typeof b2bApplicationSchema>

export default b2bApplicationSchema
