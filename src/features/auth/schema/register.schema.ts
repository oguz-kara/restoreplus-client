import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email().min(1),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(1),
  confirmPassword: z.string().min(1),
  promotions: z.boolean(),
  reconciliations: z.boolean(),
})

export type RegisterFormDataType = z.infer<typeof registerSchema>

export default registerSchema
