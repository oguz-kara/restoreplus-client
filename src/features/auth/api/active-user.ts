import { clientFetcher } from '@/lib/client-fetcher'
import Cookies from 'js-cookie'

export const getActiveUser = async () => {
  const token = Cookies.get('token')

  if (!token) return false

  const activeUser = await clientFetcher('/active-user', {
    headers: { authorization: `Bearer ${token}` },
  })

  if (activeUser.message && activeUser.message === 'token_expired') return false

  return activeUser
}
