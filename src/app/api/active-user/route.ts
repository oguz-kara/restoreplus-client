import { cookies } from 'next/headers'
import { serverFetcher } from '@/lib/server-fetcher'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  try {
    const authToken = req.headers.get('authorization')
    
    if (authToken) {
      const { data } = await serverFetcher('/active-user', {
        headers: {
          authorization: authToken,
        },
      })

      return NextResponse.json(data)
    }

    return NextResponse.json({ message: 'UNAUTHORIZED' }, { status: 401 })
  } catch (err: any) {
    return NextResponse.json(
      { message: 'Forbidden', status: 403 },
      { status: 403 }
    )
  }
}

export const PUT = async (req: NextRequest) => {
  try {
    const authToken = req.headers.get('authorization')
    const id = req.nextUrl.searchParams.get('id')
    if (!id)
      return NextResponse.json(
        { message: 'no id provided to update a user' },
        { status: 400 }
      )
    const { firstName, lastName, email } = await req.json()

    if (authToken) {
      const { data } = await serverFetcher(`/active-user/${id}`, {
        method: 'put',
        headers: {
          authorization: authToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email }),
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
