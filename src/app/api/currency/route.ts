import { sdk } from '@/restoreplus-sdk'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get('id')
    const lang = req.nextUrl.searchParams.get('lang')

    if (id) {
      if (Number.isNaN(id)) throw new Error('id bir numara olmalidir!')
      const currecy = await sdk.currencies.getById(Number(id))

      return NextResponse.json(currecy, { status: 200 })
    }

    const currecies = await sdk.currencies.getAll({ lang, isAdmin: true })

    return NextResponse.json(currecies, { status: 200 })
  } catch (err: any) {
    console.log(err)
    if (err.message)
      return NextResponse.json({ message: err.message }, { status: 400 })

    return NextResponse.json({ message: 'an error occurred' }, { status: 500 })
  }
}
