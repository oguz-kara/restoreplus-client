import { serverFetcher } from '@/lib/server-fetcher'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get('id')

    if (id) {
      if (Number.isNaN(id)) throw new Error('id bir numara olmalidir!')
      const response = await serverFetcher(`/supported-locales/${id}`)
      const { data: responseData } = response
      return NextResponse.json(responseData, { status: 201 })
    }

    const response = await serverFetcher('/supported-locales/all')
    const { data: responseData } = response
    revalidateTag('locales')
    return NextResponse.json(responseData, { status: 201 })
  } catch (err: any) {
    console.log(err)
    if (err.message)
      return NextResponse.json({ message: err.message }, { status: 400 })

    return NextResponse.json({ message: 'an error occurred' }, { status: 500 })
  }
}
