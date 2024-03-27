import { z } from 'zod'

export const AddressSchema = z.object({
  title: z.string(),
  authorizedPerson: z.string(),
  street1: z.string(),
  street2: z.string(),
  city: z.string(),
  state: z.string().nullable(),
  district: z.string(),
  phone: z.string(),
  postalCode: z.string(),
  country: z.string(),
})

export type AddressFormData = z.infer<typeof AddressSchema>
