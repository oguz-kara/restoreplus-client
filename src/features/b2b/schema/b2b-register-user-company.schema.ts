import { z } from 'zod'
import validator from 'validator'

const b2bRegisterUserCompanySchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  website: z.string().optional(),
  phoneNumber: z.string().refine(validator.isMobilePhone),
  fixedLine: z.string().optional(),
  taxNumber: z.string().optional(),
})

export type B2BRegisterUserCompanyDataType = z.infer<
  typeof b2bRegisterUserCompanySchema
>

export default b2bRegisterUserCompanySchema
