import { z } from 'zod'

const b2bRegisterUserSchema = z.object({
  email: z.string().min(1),
  name: z.string().min(1),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
})

export type B2BRegisterUserDataType = z.infer<typeof b2bRegisterUserSchema>

export default b2bRegisterUserSchema
