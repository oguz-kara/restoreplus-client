import { clientFetcher } from '@/lib/client-fetcher'
import useSWR, { SWRConfiguration, SWRResponse, mutate } from 'swr'

// SWR hook to fetch data
export const useApiData = <Data = any, Error = any>(
  key: string,
  config?: SWRConfiguration<Data, Error>
): SWRResponse<Data, Error> & { refreshData: () => Promise<any> } => {
  const swr = useSWR<Data, Error>(key, clientFetcher, config)

  const refreshData = async () => {
    try {
      // Re-fetch data and update the cache
      const updatedData = await clientFetcher(key)
      mutate(key, updatedData, false)
    } catch (error) {
      console.error('Error refreshing data:', error)
    }
  }

  return { refreshData, ...swr }
}
