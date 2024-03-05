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

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json()
    const response = await serverFetcher('/supported-locales', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    console.log({ data })
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

export const PUT = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get('id')
    console.log({ id })
    const data = await req.json()
    const response = await serverFetcher(`/supported-locales/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    const { data: responseData } = response
    revalidateTag('locales')
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
      const response = await serverFetcher(`/supported-locales/${id}`, {
        method: 'DELETE',
      })
      const { data: responseData } = response
      console.log(responseData)
      revalidateTag('locales')
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
