import { cookies } from 'next/headers'
import { serverFetcher } from '@/lib/server-fetcher'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const jwt = cookies().get('jwt')?.value
    const result = await serverFetcher('/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken: jwt }),
      headers: { credentials: 'include', 'Content-Type': 'application/json' },
    })
    return NextResponse.json(result, { status: 200 })
  } catch (err: any) {
    console.log({ err })
    return NextResponse.json(err)
  }
}
