import { sdk } from '@/restoreplus-sdk'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const lang = req.nextUrl.searchParams.get('lang') as string
    const currencyCode = req.nextUrl.searchParams.get('currencyCode') as string
    const body = await req.json()

    const createdBillingAddress = await sdk.activeUser.createBillingAddress({
      lang,
      currencyCode,
      addressData: body,
    })

    return NextResponse.json(createdBillingAddress)
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

    const updatedBillingAddress = await sdk.activeUser.updateBillingAddress({
      lang,
      currencyCode,
      addressData: body,
    })

    return NextResponse.json(updatedBillingAddress)
  } catch (err: any) {
    console.log({ err })
    NextResponse.json({ message: err.message }, { status: 500 })
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    const lang = req.nextUrl.searchParams.get('lang') as string
    const currencyCode = req.nextUrl.searchParams.get('currencyCode') as string

    const updatedBillingAddress = await sdk.activeUser.deleteBillingAddress({
      lang,
      currencyCode,
    })

    return NextResponse.json(updatedBillingAddress)
  } catch (err: any) {
    console.log({ err })
    NextResponse.json({ message: err.message }, { status: 500 })
  }
}
