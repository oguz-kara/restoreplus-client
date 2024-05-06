import { serverFetcher } from '@/lib/server-fetcher'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json()

    const { data } = await serverFetcher('/quote-requests', {
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
