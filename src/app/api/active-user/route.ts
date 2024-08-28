import { serverFetcher } from '@/lib/server-fetcher'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { getServerSideActiveUser } from '@/utils/get-server-side-active-user'
import { consoleLog } from '@/utils/log-to-console'

export const GET = async (req: NextRequest) => {
  try {
    const authToken = cookies().get('accessToken')?.value

    if (authToken) {
      const { data } = await serverFetcher('/active-user', {
        headers: {
          'x-api-key': 'null',
          'x-api-secret': 'null',
        },
        cache: 'no-store',
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
    const accessToken = cookies().get('accessToken')?.value
    const { name } = await req.json()

    if (accessToken) {
      const { data } = await serverFetcher(`/v2/active-user`, {
        method: 'PUT',
        headers: {
          authorization: accessToken,
          'x-api-key': 'null',
          'x-api-secret': 'null',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
        cache: 'no-store',
      })

      consoleLog({ data })

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
