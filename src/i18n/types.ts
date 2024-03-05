import i18n from '.'

export type Locale = (typeof i18n.locales)[number]

export interface ParamsWithLang {
  params: {
    lang: Locale
  }
}

export type Dictionary = typeof import('./dictionaries/en.json')

export interface PropsWithLang {
  lang: Locale
}
