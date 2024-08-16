import 'server-only'
import { cookies } from 'next/headers'

export const getAccessTokenFromCookie = () => {
  return cookies().get('accessToken')?.value
}
