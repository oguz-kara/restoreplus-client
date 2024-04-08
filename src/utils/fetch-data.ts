import { serverFetcher } from '@/lib/server-fetcher'
import { convertToSearch } from './convert'
import { Locale } from '@/i18n/types'
import { getProperLanguage } from '@/i18n/utils'

interface GetDataListWithPaginationParams extends Pagination {
  query?: string
  name: string
  type?: 'get' | 'search'
  searchBy?: string | string[]
  lang?: Locale
  searchByTranslation?: string[] | string
}

export const getDataListWithPagination = async ({
  name,
  page,
  take,
  query = '',
  type = 'get',
  searchBy = 'name',
  searchByTranslation,
  lang,
}: GetDataListWithPaginationParams) => {
  const properLang = getProperLanguage(lang)
  const pagination = {
    page: Number.isNaN(Number(page)) ? 0 : Number(page),
    take: Number.isNaN(Number(take)) ? 25 : Number(take),
  }

  if (type === 'search' && query && searchBy) {
    return await searchData({
      name,
      page,
      take,
      query,
      lang: properLang as Locale,
      searchByTranslation,
    })
  }

  const { data } = await serverFetcher(
    `/${name}/all?page=${pagination.page}&take=${pagination.take}&${query}&include.translations.include.locale=true`,
    {
      cache: 'no-store',
    }
  )

  if (data?.data && data.data.length > 0 && data.data[0].translations) {
    const resultData = data.data
      .filter(({ translations }: any) =>
        translations?.find(
          (translation: any) => translation.locale.locale === properLang
        )
      )
      .map((item: any) => {
        const { translations, ...restData } = item
        const translation = translations.find(
          (translation: any) => translation.locale.locale === properLang
        )
        if (!translation)
          return {
            ...restData,
          }
        return {
          ...restData,
          translation,
        }
      })

    return {
      data: resultData,
      pagination: data.pagination,
    }
  }

  return data as { data: TranslatedProduct; pagination: Pagination }
}

export async function searchData({
  name,
  page,
  take,
  query = '',
  searchBy = 'name',
  lang,
  searchByTranslation,
}: GetDataListWithPaginationParams) {
  const properLang = getProperLanguage(lang)
  const search = convertToSearch(
    searchBy && Array.isArray(searchBy) ? searchBy : [searchBy],
    query,
    searchByTranslation
  )
  const pagination = {
    page: Number.isNaN(Number(page)) ? 0 : Number(page),
    take: Number.isNaN(Number(take)) ? 25 : Number(take),
  }

  const { data } = await serverFetcher(
    `/${name}/search?page=${pagination.page}&take=${pagination.take}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      cache: 'no-store',
      body: JSON.stringify({ ...search }),
    }
  )

  if (data?.data && data.data.length > 0 && data.data[0].translations) {
    const resultData = data.data.map((item: any) => {
      const { translations, ...restData } = item
      const translation = translations.find(
        (translation: any) => translation.locale.locale === properLang
      )
      if (!translation)
        return {
          ...restData,
          translation: {},
        }
      return {
        ...restData,
        translation,
      }
    })

    return {
      data: resultData,
      pagination: data.pagination,
    }
  }

  return data
}
