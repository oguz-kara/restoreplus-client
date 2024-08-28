import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@/restoreplus-sdk'

export const POST = async (req: NextRequest) => {
  try {
    const { name, email, password, token } = await req.json()

    console.log({ name, email, password, token })

    const requestData = {
      name,
      email,
      password,
      token,
    }

    const result = await sdk.b2b.registerUser(requestData)

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
