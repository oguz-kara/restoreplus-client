import { NextRequest, NextResponse } from 'next/server'
import { sdk } from '@/restoreplus-sdk'
import { Address } from '@/features/b2b/types'

export const POST = async (req: NextRequest) => {
  try {
    const {
      shippingAddress,
      billingAddress,
      isSame,
      token,
    }: {
      shippingAddress: Address
      billingAddress?: Address
      isSame?: boolean
    } & { token: string } = await req.json()

    const result = await sdk.b2b.setUserAddress({
      shippingAddress,
      billingAddress,
      isSame,
      token,
    })

    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
