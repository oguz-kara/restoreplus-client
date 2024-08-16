import { NextRequest, NextResponse } from 'next/server'
import { consoleLog } from '@/utils/log-to-console'
import { sdk } from '@/restoreplus-sdk'

export const GET = async (req: NextRequest) => {
  try {
    const data = await sdk.orderManagement.createOrder()

    NextResponse.json(data)
  } catch (err: any) {
    consoleLog({ err })
    return NextResponse.json(
      { message: 'Forbidden', status: 403 },
      { status: 403 }
    )
  }
}
