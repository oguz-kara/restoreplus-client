import { cookies } from 'next/headers'
import { serverFetcher } from '@/lib/server-fetcher'
import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export const GET = async (req: NextRequest) => {
  try {
    const addressId = req.nextUrl.searchParams.get('addressId')
    const authToken = req.headers.get('authorization')
    const currencyCode = cookies().get('currency')?.value || 'USD'
    const lang = cookies().get('lang')?.value

    if (!addressId) throw new Error('no address idetifier provided!')

    if (authToken) {
      const { data } = await serverFetcher(
        `/set-active-order-address/${addressId}?currency=${currencyCode}&lang=${lang}`,
        {
          headers: {
            authorization: authToken,
          },
          cache: 'no-store',
        }
      )

      return NextResponse.json(data)
    }

    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Forbidden', status: 403 },
      { status: 403 }
    )
  }
}
