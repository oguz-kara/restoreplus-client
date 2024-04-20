import { serverFetcher } from '@/lib/server-fetcher'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const id = req.nextUrl.searchParams.get('id')

    if (id) {
      if (Number.isNaN(id)) throw new Error('id bir numara olmalidir!')
      const response = await serverFetcher(`/currencies/${id}`)
      const { data: responseData } = response
      return NextResponse.json(responseData, { status: 200 })
    }

    const response = await serverFetcher('/currencies/all')
    const { data: responseData } = response
    return NextResponse.json(responseData, { status: 200 })
  } catch (err: any) {
    console.log(err)
    if (err.message)
      return NextResponse.json({ message: err.message }, { status: 400 })

    return NextResponse.json({ message: 'an error occurred' }, { status: 500 })
  }
}
