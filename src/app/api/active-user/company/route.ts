import { serverFetcher } from '@/lib/server-fetcher'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get('id')
    const accessToken = cookies().get('accessToken')?.value

    const { name, description, phoneNumber, website } = await req.json()
    const company = { name, description, phoneNumber, website }
    const url = id ? `/active-user/company/?id=${id}` : '/active-user/company'

    if (accessToken) {
      const { data } = await serverFetcher(url, {
        method: 'post',
        headers: {
          authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ company }),
        cache: 'no-store',
      })

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
