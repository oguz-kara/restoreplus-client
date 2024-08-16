import { sdk } from '@/restoreplus-sdk'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const lang = req.nextUrl.searchParams.get('lang') as string
    const currencyCode = req.nextUrl.searchParams.get('currencyCode') as string
    const body = await req.json()

    const createdShippingAddress = await sdk.activeUser.createShippingAddress({
      lang,
      currencyCode,
      addressData: body,
    })

    return NextResponse.json(createdShippingAddress)
  } catch (err: any) {
    console.log({ err })
    NextResponse.json({ message: err.message }, { status: 500 })
  }
}

export const PUT = async (req: NextRequest) => {
  try {
    const lang = req.nextUrl.searchParams.get('lang') as string
    const currencyCode = req.nextUrl.searchParams.get('currencyCode') as string
    const body = await req.json()

    const updatedShippingAddress = await sdk.activeUser.updateShippingAddress({
      lang,
      currencyCode,
      addressData: body,
    })

    return NextResponse.json(updatedShippingAddress)
  } catch (err: any) {
    console.log({ err })
    NextResponse.json({ message: err.message }, { status: 500 })
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    const lang = req.nextUrl.searchParams.get('lang') as string
    const currencyCode = req.nextUrl.searchParams.get('currencyCode') as string
    const body = await req.json()

    const updatedShippingAddress = await sdk.activeUser.deleteShippingAddress({
      lang,
      currencyCode,
    })

    return NextResponse.json(updatedShippingAddress)
  } catch (err: any) {
    console.log({ err })
    NextResponse.json({ message: err.message }, { status: 500 })
  }
}
