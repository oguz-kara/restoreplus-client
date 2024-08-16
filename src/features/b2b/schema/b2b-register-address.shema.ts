import { z } from 'zod'

const b2bRegisterUserAddressSchema = z.object({
  title: z.string().min(1),
  authorizedPerson: z.string().min(1),
  description: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  district: z.string().min(1),
  zipCode: z.string().min(1),
  state: z.string(),
})

export type B2BRegisterUserAddressDataType = z.infer<
  typeof b2bRegisterUserAddressSchema
>

export default b2bRegisterUserAddressSchema
