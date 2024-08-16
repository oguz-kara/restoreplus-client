import { sdk } from '@/restoreplus-sdk'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const GET = async () => {
  try {
    const lang = cookies().get('lang')?.value
    const currencyCode = cookies().get('currency')?.value || 'USD'

    const result = await sdk.orderManagement.getUserOrders({
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
