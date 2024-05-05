import { cookies } from 'next/headers'
import { serverFetcher } from '@/lib/server-fetcher'
import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { consoleLog } from '@/utils/log-to-console'

export const GET = async (req: NextRequest) => {
  try {
    const authToken = req.headers.get('authorization')
    const currencyCode = cookies().get('currency')?.value || 'USD'
    const lang = cookies().get('lang')?.value

    if (authToken) {
      const { data } = await serverFetcher(
        `/create-order?currency=${currencyCode}&lang=${lang}`,
        {
          headers: {
            authorization: authToken,
          },
          next: {
            tags: ['create-order'],
          },
        }
      )

      return NextResponse.json(data)
    }

    revalidateTag('create-order')

    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  } catch (err: any) {
    consoleLog({ err })
    return NextResponse.json(
      { message: 'Forbidden', status: 403 },
      { status: 403 }
    )
  }
}
