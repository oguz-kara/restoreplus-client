import { clientFetcher } from '@/lib/client-fetcher'

export const getActiveUser = async () => {
  const activeUser = await clientFetcher('/active-user')

  if (activeUser.message && activeUser.message === 'token_expired') return false

  return activeUser as (ActiveUser & { message?: string }) | null
}
