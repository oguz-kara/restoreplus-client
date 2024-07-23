import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const GET = () => {
  const cookie = cookies()

  cookie.delete('accessToken')

  return NextResponse.json({ success: true })
}
