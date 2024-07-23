import { getFetcherFunction } from '@/lib/fetcher-function'
import { UseQueryResult, useQuery as reactQuery } from '@tanstack/react-query'

export const useQuery = <T>(keys: string[]) => {
  const queryResult = reactQuery<T>({
    queryKey: keys,
    // @ts-ignore
    queryFn: getFetcherFunction<T>(keys[0]),
  })

  return queryResult as UseQueryResult
}
