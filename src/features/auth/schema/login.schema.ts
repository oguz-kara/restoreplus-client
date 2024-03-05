import { z } from 'zod'

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export type LoginFormDataType = z.infer<typeof loginSchema>

export default loginSchema

