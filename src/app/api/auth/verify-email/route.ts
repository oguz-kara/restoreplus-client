import { sdk } from '@/restoreplus-sdk'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { token, email } = await req.json()

    const result = await sdk.auth.verifyUserEmail(email, token)

    if (result?.message) throw new Error(result?.message)

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json(
      {
        message: err.message,
      },
      { status: 500 }
    )
  }
}
