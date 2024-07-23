import { serverFetcher } from '@/lib/server-fetcher'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()

    const { data } = await serverFetcher('/v2/offer-products', {
      body: JSON.stringify(body),
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return NextResponse.json(data)
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ success: false, message: err.message })
  }
}
