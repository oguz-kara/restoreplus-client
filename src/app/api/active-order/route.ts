import { cookies } from 'next/headers'
import { serverFetcher } from '@/lib/server-fetcher'
import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export const GET = async (req: NextRequest) => {
  try {
    const authToken = req.headers.get('authorization')
    const currencyCode = cookies().get('currency')?.value || 'USD'
    const lang = cookies().get('lang')?.value

    if (authToken) {
      const { data } = await serverFetcher(
        `/active-order?currency=${currencyCode}&lang=${lang}`,
        {
          headers: {
            authorization: authToken,
          },
          cache: 'no-store',
          next: {
            tags: ['active-order'],
          },
        }
      )

      return NextResponse.json(data)
    }

    revalidateTag('active-order')

    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Forbidden', status: 403 },
      { status: 403 }
    )
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const authToken = req.headers.get('authorization')
    const currencyCode = cookies().get('currency')?.value || 'USD'
    const lang = cookies().get('lang')?.value

    const { quantity, productVariantId } = await req.json()

    if (authToken) {
      const { data } = await serverFetcher(
        `/active-order/adjust-order-line?currency=${currencyCode}&lang=${lang}`,
        {
          method: 'post',
          headers: {
            authorization: authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity, productVariantId, currencyCode }),
          cache: 'no-store',
        }
      )

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

export const PUT = async (req: NextRequest) => {
  try {
    const authToken = req.headers.get('authorization')
    const currencyCode = cookies().get('currency')?.value || 'USD'
    const lang = cookies().get('lang')?.value
    const id = req.nextUrl.searchParams.get('id')
    if (!id)
      return NextResponse.json(
        { message: 'no id provided to update a order line' },
        { status: 400 }
      )
    const { quantity } = await req.json()

    if (authToken) {
      const { data } = await serverFetcher(
        `/active-order/lines/update-quantity/${id}?currency=${currencyCode}&lang=${lang}`,
        {
          method: 'put',
          headers: {
            authorization: authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity }),
          cache: 'no-store',
        }
      )

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

export const DELETE = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get('id')
    const lang = cookies().get('lang')?.value
    const currencyCode = cookies().get('currency')?.value || 'USD'

    if (!id) throw new Error('no id provided to delete an order line!')

    const authToken = req.headers.get('authorization')

    if (authToken) {
      const { data } = await serverFetcher(
        `/active-order/lines/${id}?currency=${currencyCode}&lang=${lang}`,
        {
          method: 'delete',
          headers: {
            authorization: authToken,
          },
          cache: 'no-store',
        }
      )

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
