import { sdk } from '@/restoreplus-sdk'
import { consoleLog } from '@/utils/log-to-console'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const email = req.nextUrl.searchParams.get('email')
    const token = req.nextUrl.searchParams.get('token')

    console.log({ email, token })

    if (!email) throw new Error('email not found!')
    if (!token) throw new Error('token not found!')

    const result = await sdk.auth.verifyUserEmail(email, token)

    consoleLog({ result })

    if (!result)
      throw new Error(
        'an error has occurred when verifying your email. Please try again later.'
      )
    if (result?.message) throw new Error(result?.message)
    else {
      const clientUrl =
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/verify-email-success` ||
        'http://localhost:3000/verify-email-success'
      return NextResponse.redirect(clientUrl)
    }
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
