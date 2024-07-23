import { z } from 'zod'

export const AddressSchema = z.object({
  title: z.string(),
  authorizedPerson: z.string(),
  address: z.string(),
  country: z.string(),
  city: z.string(),
  district: z.string(),
  state: z.string().nullable(),
  zipCode: z.string(),
})

export type AddressFormData = z.infer<typeof AddressSchema>
