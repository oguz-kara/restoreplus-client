import i18n from '@/i18n'

export const generateProtectedRoutesForLocales = (routes: string[]) => {
  const result = [...routes]
  routes.forEach((route) => {
    i18n.locales.forEach((locale) => {
      result.push(`/${locale}${route}`)
    })
  })

  return result
}
