import { serverFetcher } from '@/lib/server-fetcher'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { email } = await req.json()

    if (!email)
      return NextResponse.json({ success: false, message: 'Email is required' })

    const { data } = await serverFetcher('/email-requests', {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    console.log({ data })

    if (!data.message) return NextResponse.json({ success: true, data })

    return NextResponse.json({ success: false, message: data.message })
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ success: false, message: error.message })
  }
}
