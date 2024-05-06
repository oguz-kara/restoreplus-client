import { cookies } from 'next/headers'
import { serverFetcher } from '@/lib/server-fetcher'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest, res: NextResponse) => {
  const Cookies = cookies()
  const body = await req.json()
  const { email, password } = body

  console.log({ body })

  if (!email && !password)
    return NextResponse.json(
      { message: 'Email and password are required!' },
      { status: 400 }
    )

  try {
    const { data, headers } = await serverFetcher('/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        credentials: 'include',
      },
      cache: 'no-store',
    })

    console.log({ data })

    if (data.accessToken) {
      Cookies.set('token', data.accessToken)
      let expirationDate = new Date(data.tokenExpiresDate)
      Cookies.set('token_expires', expirationDate.toLocaleString('en-US'))
    }

    return NextResponse.json(data, { headers })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
