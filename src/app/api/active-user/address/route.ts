import { serverFetcher } from '@/lib/server-fetcher'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  try {
    const accessToken = cookies().get('accessToken')?.value

    const {
      title,
      authorizedPerson,
      street1,
      street2,
      city,
      district,
      zipCode,
      address,
      country,
    } = await req.json()

    if (accessToken) {
      const { data } = await serverFetcher(`/active-user/address`, {
        method: 'post',
        headers: {
          authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          authorizedPerson,
          street1,
          street2,
          city,
          district,
          zipCode,
          address,
          country,
        }),
        cache: 'no-store',
      })

      return NextResponse.json(data)
    }

    return NextResponse.json(
      { message: 'no auth token found' },
      { status: 403 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Forbidden', status: 403 },
      { status: 403 }
    )
  }
}

export const PUT = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get('id')

    if (!id) throw new Error('no id provided to update an adress!')

    const accessToken = cookies().get('accessToken')?.value
    const {
      title,
      authorizedPerson,
      street1,
      street2,
      city,
      district,
      phone,
      postalCode,
      country,
    } = await req.json()

    if (accessToken) {
      const { data } = await serverFetcher(`/active-user/address/${id}`, {
        method: 'put',
        headers: {
          authorization: accessToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          authorizedPerson,
          street1,
          street2,
          city,
          district,
          phone,
          postalCode,
          country,
        }),
      })

      return NextResponse.json(data)
    }

    return NextResponse.json(
      { message: 'no auth token found' },
      { status: 403 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Forbidden', status: 403 },
      { status: 403 }
    )
  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    const id = req.nextUrl.searchParams.get('id')

    if (!id) throw new Error('no id provided to update an adress!')

    const accessToken = cookies().get('accessToken')?.value

    if (accessToken) {
      const { data } = await serverFetcher(`/active-user/address/${id}`, {
        method: 'delete',
        headers: {
          authorization: accessToken,
        },
      })

      return NextResponse.json(data)
    }

    return NextResponse.json(
      { message: 'no auth token found' },
      { status: 403 }
    )
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Forbidden', status: 403 },
      { status: 403 }
    )
  }
}
