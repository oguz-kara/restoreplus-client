import { serverFetcher } from '@/lib/server-fetcher'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const authToken = req.headers.get('authorization')

    if (authToken) {
      const { data } = await serverFetcher('/active-order', {
        headers: {
          authorization: authToken,
        },
      })

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

export const POST = async (req: NextRequest) => {
  try {
    const authToken = req.headers.get('authorization')

    const { quantity, productVariantId, currencyCode } = await req.json()

    if (authToken) {
      const { data } = await serverFetcher(`/active-order/adjust-order-line`, {
        method: 'post',
        headers: {
          authorization: authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity, productVariantId, currencyCode }),
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

export const PUT = async (req: NextRequest) => {
  try {
    const authToken = req.headers.get('authorization')
    const id = req.nextUrl.searchParams.get('id')
    if (!id)
      return NextResponse.json(
        { message: 'no id provided to update a order line' },
        { status: 400 }
      )
    const { quantity } = await req.json()

    if (authToken) {
      const { data } = await serverFetcher(
        `/active-order/lines/update-quantity/${id}`,
        {
          method: 'put',
          headers: {
            authorization: authToken,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity }),
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

    if (!id) throw new Error('no id provided to delete an order line!')

    const authToken = req.headers.get('authorization')

    if (authToken) {
      const { data } = await serverFetcher(`/active-order/lines/${id}`, {
        method: 'delete',
        headers: {
          authorization: authToken,
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
