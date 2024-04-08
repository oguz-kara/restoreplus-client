import { cookies } from 'next/headers'
import { serverFetcher } from '@/lib/server-fetcher'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get('id')
    const authTokenHeader = req.headers.get('authorization')
    const authTokenCookie = cookies().get('token')?.value
    const authToken = authTokenHeader ? authTokenHeader : authTokenCookie


    const url = id
      ? `/active-user/calculated-products/?productId=${id}&lang=tr`
      : '/active-user/calculated-products/all/?lang=tr'

    if (authToken) {
      const { data } = await serverFetcher(url, {
        headers: {
          authorization: authToken,
          'Content-Type': 'application/json',
        },
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
