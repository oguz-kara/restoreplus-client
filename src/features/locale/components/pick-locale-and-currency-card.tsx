'use client'
import { useCookies } from 'react-cookie'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Typography from '@/components/ui/typography'
import { Locale } from '@/i18n/types'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@/hooks/use-query'
import { useDictionary } from '@/context/use-dictionary-v2'
import { cn } from '@/lib/utils'

export default function PickLocaleAndCurrencyCard({
  className,
}: PropsWithClassName) {
  const pathname = usePathname()
  const [cookies, setCookie] = useCookies(['currency', 'lang'])
  const [setInitialValue, setIsInitialValue] = useState(false)
  const { dictionary, lang } = useDictionary()
  const { data: currencyData, isPending: isCurrenciesPending } = useQuery([
    '/currency',
  ])
  const { data: localeData, isPending: isLocalesPending } = useQuery([
    '/supported-locales',
  ])
  const [currentLang, setCurrentLang] = useState<string | null>(null)
  const [currentCurrency, setCurrentCurrency] = useState<string | null>(null)

  const getCurrencyByLang = (lang: Locale) => {
    if (lang === 'tr') return 'TRY'
    else return 'USD'
  }

  const getUrlWithNewLocale = (newLocale: string) => {
    const origin = window.location.origin
    const url = new URL(origin)
    const pathSegments = url.pathname.split('/').filter(Boolean)

    const isLocalePresent = /^[a-z]{2}$/.test(pathSegments[0])

    if (isLocalePresent) {
      pathSegments[0] = newLocale
    } else {
      pathSegments.unshift(newLocale)
    }

    url.pathname = '/' + pathSegments.join('/')

    return url.href
  }

  const handleSaveButton = (e: any) => {
    e.preventDefault()
    setCookie('lang', currentLang, {
      expires: new Date('2030'),
      path: '/',
    })
    setCookie('currency', currentCurrency, {
      expires: new Date('2030'),
      path: '/',
    })

    const href = getUrlWithNewLocale(currentLang as string)
    location.href = href
  }

  useEffect(() => {
    if (localeData && currencyData && !setInitialValue) {
      const defaultLang = (localeData as any)?.data.find(
        (item: any) => item.locale === lang
      )

      if (cookies.currency) {
        const currency = (currencyData as any)?.data.find(
          (item: Currency) => item.currencyCode === cookies.currency
        )

        if (currency) setCurrentCurrency(currency.currencyCode)
      } else {
        const currencyByLang = getCurrencyByLang(lang)
        const currency = (currencyData as any)?.data.find(
          (item: Currency) => item.currencyCode === currencyByLang
        )
        setCookie('currency', currency.currencyCode, {
          expires: new Date('2030'),
          path: '/',
        })
        setCurrentCurrency(currency)
      }

      setCurrentLang(defaultLang.locale)

      setIsInitialValue(true)
    }
  }, [
    localeData,
    currencyData,
    setInitialValue,
    cookies.currency,
    lang,
    setCookie,
  ])

  if (
    !(((currencyData as any)?.data?.length || 0) > 0) ||
    !(((localeData as any)?.data?.length || 0) > 0)
  )
    return null

  return (
    <Card className={cn('lg:w-[300px]', className)}>
      <CardHeader>
        <Typography as="h6" className="font-[500] text-gray-700 uppercase">
          {dictionary.navbar.set_language_and_currency_title}
        </Typography>
        <Typography className="text-xs text-gray-700">
          {dictionary.navbar.set_language_and_currency_description}
        </Typography>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <Typography className="text-sm mb-1 text-gray-700 uppercase">
            {dictionary.common.language_text}
          </Typography>
          {!isLocalesPending ? (
            <select className="w-full p-2" name="currentLang" id="currentLang">
              {(localeData as any)?.data?.map((item: SupportedLocale) => (
                <option
                  key={item.locale}
                  value={item.locale}
                  selected={item.locale === currentLang}
                >
                  {item.name}
                </option>
              ))}
            </select>
          ) : (
            <Skeleton className="h-[40px] w-full" />
          )}
        </div>
        <div>
          <Typography className="text-sm mb-1 text-gray-700">
            {dictionary.common.currency_text}
          </Typography>
          {!isCurrenciesPending ? (
            <select
              className="w-full p-2"
              name="currencyCurrency"
              id="currentCurrency"
            >
              {(currencyData as any)?.data?.map((item: Currency) => (
                <option
                  key={item.currencyCode}
                  value={item.currencyCode}
                  selected={item.currencyCode === currentCurrency}
                >
                  {item.currencyCode}
                </option>
              ))}
            </select>
          ) : (
            <Skeleton className="h-[40px] w-full" />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={(e) => handleSaveButton(e)}>
          {dictionary.common.save_text}
        </Button>
      </CardFooter>
    </Card>
  )
}
