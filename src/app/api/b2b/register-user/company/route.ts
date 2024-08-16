import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@/restoreplus-sdk'
import { Company } from '@/features/b2b/types'

export const POST = async (req: NextRequest) => {
  try {
    const {
      name,
      phoneNumber,
      description,
      fixedLine,
      taxNumber,
      website,
      token,
    }: Company & { token: string } = await req.json()

    const requestData = {
      name,
      phoneNumber,
      description,
      fixedLine,
      taxNumber,
      website,
    }

    const result = await sdk.b2b.setUserCompany(requestData, token)

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
