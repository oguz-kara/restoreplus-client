import { cookies } from 'next/headers'
import { serverFetcher } from '@/lib/server-fetcher'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const body = await req.json()
    const { data } = await serverFetcher('/blog-posts', {
      body: JSON.stringify(body),
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (data.message)
      return NextResponse.json({ success: false, message: data.message })
    return NextResponse.json(data)
  } catch (err: any) {
    console.log(err)
    return NextResponse.json({ success: false, message: err.message })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const authToken = req.headers.get('authorization')
    const authorization = authToken ? authToken : ''
    console.log({ authorization })

    const id = req.nextUrl.searchParams.get('id')
    if (id) {
      if (Number.isNaN(id)) throw new Error('id bir numara olmalidir!')
      const response = await serverFetcher(`/blog-posts/${id}`, {
        headers: {
          credentials: 'include',
          authorization,
        },
      })
      const { data: responseData } = response
      return NextResponse.json(responseData, { status: 201 })
    }

    const response = await serverFetcher('/blog-posts/all', {
      headers: { credentials: 'include', authorization },
    })

    const { data: responseData } = response
    return NextResponse.json(responseData, { status: 201 })
  } catch (err: any) {
    console.log(err)
    if (err.message)
      return NextResponse.json({ message: err.message }, { status: 400 })

    return NextResponse.json({ message: 'an error occurred' }, { status: 500 })
  }
}

export const PUT = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get('id')
    const data = await req.json()
    const response = await serverFetcher(`/blog-posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const { data: responseData } = response
    revalidateTag('blog-posts')
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
    const id = req.nextUrl.searchParams.get('id')
    if (id) {
      const response = await serverFetcher(`/blog-posts/${id}`, {
        method: 'DELETE',
      })
      const { data: responseData } = response
      console.log(responseData)
      revalidateTag('blog-posts')
      return NextResponse.json(responseData, { status: 200 })
    } else {
      throw new Error('Dili silmek icin bir id gondermelisin!')
    }
  } catch (err: any) {
    console.log(err)
    if (err.message)
      return NextResponse.json({ message: err.message }, { status: 400 })

    return NextResponse.json({ message: 'an error occurred' }, { status: 500 })
  }
}
