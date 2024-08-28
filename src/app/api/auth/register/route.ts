import { RegisterFormDataType } from '@/features/auth/schema/register.schema'
import { sdk } from '@/restoreplus-sdk'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const body: RegisterFormDataType = await req.json()
    const registerResult = await sdk.auth.register(body)

    return NextResponse.json(registerResult)
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
