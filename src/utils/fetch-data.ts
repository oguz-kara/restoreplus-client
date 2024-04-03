import { serverFetcher } from '@/lib/server-fetcher'
import { convertToSearch } from './convert'
import { cookies } from 'next/headers'

interface GetDataListWithPaginationParams extends Pagination {
  query?: string
  name: string
  type?: 'get' | 'search'
  searchBy?: string
}

export const getDataListWithPagination = async ({
  name,
  page,
  take,
  query = '',
  type = 'get',
  searchBy = 'name',
}: GetDataListWithPaginationParams) => {
  const pagination = {
    page: Number.isNaN(Number(page)) ? 0 : Number(page),
    take: Number.isNaN(Number(take)) ? 25 : Number(take),
  }

  const token = cookies().get('token')?.value

  if (type === 'search' && query && searchBy) {
    return await searchData({
      name,
      page,
      take,
      query,
    })
  }

  const { data } = await serverFetcher(
    `/${name}/all?page=${pagination.page}&take=${pagination.take}&${query}`,
    {
      cache: 'no-store',
      ...(token && {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }),
    }
  )

  return data
}

export async function searchData({
  name,
  page,
  take,
  query = '',
  searchBy = 'name',
}: GetDataListWithPaginationParams) {
  const token = cookies().get('token')?.value
  const search = convertToSearch([searchBy], query)
  const pagination = {
    page: Number.isNaN(Number(page)) ? 0 : Number(page),
    take: Number.isNaN(Number(take)) ? 25 : Number(take),
  }

  const { data } = await serverFetcher(
    `/${name}/all?page=${pagination.page}&take=${pagination.take}&lang=tr`,
    {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { authorization: `Bearer ${token}` }),
      },
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({ ...search }),
    }
  )

  return data
}
