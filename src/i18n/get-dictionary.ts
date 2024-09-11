import 'server-only'
import { Dictionary, Locale } from './types'

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  tr: () => import('./dictionaries/tr.json').then((module) => module.default),
}

export const getDictionary: (locale: Locale) => Promise<Dictionary> = async (
  locale: Locale
) =>
  // @ts-ignore
  // @ts-ignore
  dictionaries[locale]()
