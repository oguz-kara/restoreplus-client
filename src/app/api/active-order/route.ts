import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@/restoreplus-sdk'

export const GET = async () => {
  try {
    const currencyCode = cookies().get('currency')?.value || 'USD'
    const lang = cookies().get('lang')?.value

    const result = await sdk.orderManagement.getActiveOrderForUser({
      lang,
      currencyCode,
    })

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Forbidden', status: 403 },
      { status: 403 }
    )
  }
}

export const POST = async (req: NextRequest) => {
  try {
    const currencyCode = cookies().get('currency')?.value || 'USD'
    const lang = cookies().get('lang')?.value

    const { quantity, productVariantId } = await req.json()

    const result = await sdk.orderManagement.adjustOrderLine({
      body: { quantity, productVariantId },
      lang,
      currencyCode,
    })

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Forbidden', status: 403 },
      { status: 403 }
    )
  }
}

export const PUT = async (req: NextRequest) => {
  try {
    const currencyCode = cookies().get('currency')?.value || 'USD'
    const lang = cookies().get('lang')?.value
    const id = req.nextUrl.searchParams.get('id')

    if (!id)
      return NextResponse.json(
        { message: 'no id provided to update a order line' },
        { status: 400 }
      )
    const { quantity } = await req.json()

    const result = await sdk.orderManagement.updateOrderlineQuantity({
      lang,
      currencyCode,
      lineId: Number(id),
      body: { quantity },
    })

    return NextResponse.json(result)
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

    const result = await sdk.orderManagement.removeOrderLineById({
      lang,
      currencyCode,
      lineId: Number(id),
    })

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Forbidden', status: 403 },
      { status: 403 }
    )
  }
}
