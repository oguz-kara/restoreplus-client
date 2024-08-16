import { sdk } from '@/restoreplus-sdk'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const PUT = async (req: NextRequest) => {
  try {
    const currencyCode = cookies().get('currency')?.value || 'USD'
    const lang = cookies().get('lang')?.value

    const { addressId } = await req.json()

    const result = await sdk.orderManagement.setBillingAddress({
      lang,
      currencyCode,
      body: { addressId: Number(addressId) },
    })

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Forbidden', status: 403 },
      { status: 403 }
    )
  }
}
