import { serverFetcher } from '@/lib/server-fetcher'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const body = await req.formData()

  const result = await serverFetcher('/upload/images', {
    method: 'POST',
    body,
  })
  return NextResponse.json(result)
}

export const GET = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get('id')
    let page = req.nextUrl.searchParams.get('page')
    let take = req.nextUrl.searchParams.get('take')
    page = page ? page : '0'
    take = take ? take : '25'

    if (id) {
      if (Number.isNaN(id)) throw new Error('id bir numara olmalidir!')
      const response = await serverFetcher(`/images/${id}`)
      const { data: responseData } = response
      return NextResponse.json(responseData, { status: 201 })
    }

    const response = await serverFetcher(
      `/images/all?orderBy[0][createdAt]=desc&page=${page}&take=${take}`
    )
    const { data: responseData } = response
    revalidateTag('images')
    return NextResponse.json(responseData, { status: 200 })
  } catch (err: any) {
    console.log(err)
    if (err.message)
      return NextResponse.json({ message: err.message }, { status: 400 })

    return NextResponse.json({ message: 'an error occurred' }, { status: 500 })
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    const imageId = req.nextUrl.searchParams.get('id')
    const imageName = req.nextUrl.searchParams.get('imageName')
    const { data } = await serverFetcher(
      `/upload/images/${imageId},${imageName}`,
      { method: 'delete' }
    )

    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ message: err.message })
  }
}
