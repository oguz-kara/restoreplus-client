import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const GET = () => {
  const cookie = cookies()

  cookie.delete('token')
  cookie.delete('token_expires')
  cookie.delete('jwt')

  return NextResponse.json({ success: true })
}
