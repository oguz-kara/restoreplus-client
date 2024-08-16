import { sdk } from '@/restoreplus-sdk'
import { NextRequest, NextResponse } from 'next/server'

export const PUT = async (req: NextRequest) => {
  try {
    const lang = req.nextUrl.searchParams.get('lang') as string
    const currencyCode = req.nextUrl.searchParams.get('currencyCode') as string
    const body = await req.json()

    const updatedCompany = await sdk.activeUser.updateActiveUserCompany({
      lang,
      currencyCode,
      companyData: body,
    })

    return NextResponse.json(updatedCompany)
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Internal server error!' },
      { status: 500 }
    )
  }
}
