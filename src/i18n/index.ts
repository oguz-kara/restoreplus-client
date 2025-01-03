const i18n = {
  locales: [
    'tr',
    'en',
    'de',
    'fr',
    'es',
    'bg',
    'hr',
    'cs',
    'da',
    'et',
    'fi',
    'el',
    'he',
    'hu',
    'id',
    'it',
    'lv',
    'lt',
    'no',
    'pl',
    'pt',
    'ro',
    'ru',
    'sr',
    'sk',
    'sl',
    'sv',
  ] as const,

  defaultLocale: 'en',
  defaultAcceptLanguage: 'en-US,en;q=0.5',
}

export type SupportedLocale = (typeof i18n.locales)[number]

export default i18n
