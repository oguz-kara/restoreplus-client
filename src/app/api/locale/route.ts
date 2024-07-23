import { sdk } from '@/restoreplus-sdk'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get('id')

    if (id) {
      if (Number.isNaN(id)) throw new Error('id bir numara olmalidir!')

      const data = await sdk.supportedLocales.getById(Number(id))

      return NextResponse.json(data, { status: 200 })
    }

    const data = await sdk.supportedLocales.getAll({ isAdmin: true })

    return NextResponse.json(data, { status: 200 })
  } catch (err: any) {
    console.log(err)
    if (err.message)
      return NextResponse.json({ message: err.message }, { status: 400 })

    return NextResponse.json({ message: 'an error occurred' }, { status: 500 })
  }
}
