import { z } from 'zod'

const registerSchema = z.object({
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  promotions: z.string(),
  reconciliations: z.string(),
})

export type RegisterFormDataType = z.infer<typeof registerSchema>

export default registerSchema
