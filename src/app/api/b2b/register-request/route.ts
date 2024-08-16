import { B2BApplicationFormDataType } from '@/features/b2b/schema/b2b-application.schema'
import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@/restoreplus-sdk'

export const POST = async (req: NextRequest) => {
  try {
    const body: B2BApplicationFormDataType = await req.json()

    const {
      city,
      companyName,
      country,
      countryCodeForPhoneNumber,
      email,
      firstName,
      lastName,
      phoneNumber,
      postalCode,
    } = body

    const requestData = {
      city,
      companyName,
      country,
      countryCodeForPhoneNumber,
      email,
      firstName,
      lastName,
      phoneNumber,
      postalCode,
    }

    const result = await sdk.b2b.registerRequest(requestData)

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
