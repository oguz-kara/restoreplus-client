import { sdk } from '@/restoreplus-sdk'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json()
    const { data, headers } = await sdk.auth.login(email, password)

    if (data.message) throw new Error(data.message)

    return NextResponse.json(data, { headers })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
