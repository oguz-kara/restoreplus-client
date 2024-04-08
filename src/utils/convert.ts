import { consoleLog } from './log-to-console'

export const convertToSearch = (
  searchBy: string[],
  term: string,
  searchByTranslation?: string | string[]
) => {
  const result: any = {}
  searchBy.forEach((item) => {
    result[item] = term
  })
  if (
    searchByTranslation &&
    Array.isArray(searchByTranslation) &&
    searchByTranslation.length > 0
  ) {
    result['translations'] = {}
    result['translations']['some'] = {}

    searchByTranslation.forEach((item) => {
      result['translations']['some'][item] = {
        contains: term,
        mode: 'insensitive',
      }
    })
    consoleLog({ result })
  } else if (searchByTranslation) {
    result['translations'] = {}
    result['translations']['some'] = {}
    result['translations']['some'][searchByTranslation as string] = {}
    result['translations']['some'][searchByTranslation as string]['contains'] =
      term
    result['translations']['some'][searchByTranslation as string]['mode'] =
      'insensitive'
    result['translations']['some'][searchByTranslation as string] = term

    consoleLog({ result })
  }

  consoleLog({ result })
  return { search: result }
}
