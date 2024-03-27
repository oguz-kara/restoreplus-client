import { serverFetcher } from '@/lib/server-fetcher'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get('id')
    if (!id) throw new Error('no id provided!')
    const authToken = req.headers.get('authorization')
    const { name, description, phoneNumber, website } = await req.json()
    const company = { name, description, phoneNumber, website }

    if (authToken) {
      const { data } = await serverFetcher(`/active-user/company/${id}`, {
        method: 'post',
        headers: {
          authorization: authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company }),
      })

      console.log(data)

      return NextResponse.json(data)
    }

    return NextResponse.json(
      { message: 'no auth token found' },
      { status: 403 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Forbidden', status: 403 },
      { status: 403 }
    )
  }
}
