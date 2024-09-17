'use client'
import { useCookies } from 'react-cookie'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Typography from '@/components/ui/typography'
import { Locale } from '@/i18n/types'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import i18n from '@/i18n'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@/hooks/use-query'
import { useDictionary } from '@/context/use-dictionary-v2'
import { ReactSelect } from '@/components/ui/react-select'

export default function PickLocaleAndCurrencyCard() {
  const router = useRouter()
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
  const [currentLang, setCurrentLang] = useState<{
    label: string
    value: string | number
  } | null>(null)
  const [currentCurrency, setCurrentCurrency] = useState<{
    label: string
    value: string | number
  } | null>(null)

  const getCurrencyByLang = (lang: Locale) => {
    if (lang === 'tr') return 'TRY'
    else return 'USD'
  }

  const handleSaveButton = () => {
    setCookie('lang', currentLang?.value, {
      expires: new Date('2030'),
      path: '/',
    })
    setCookie('currency', currentCurrency?.value, {
      expires: new Date('2030'),
      path: '/',
    })
    const hasLocale = i18n.locales.find((locale) =>
      pathname.startsWith(`/${locale}`)
    )
    if (hasLocale)
      router.push(pathname.replace(`/${hasLocale}`, `/${currentLang?.value}`))

    location.reload()
  }

  useEffect(() => {
    console.log({ localeData, currencyData, setInitialValue })
    if (localeData && currencyData && !setInitialValue) {
      console.log({ currency: cookies.currency })
      const defaultLang = (localeData as any)?.data.find(
        (item: any) => item.locale === lang
      )

      if (cookies.currency) {
        console.log({ currency: cookies.currency })
        const currency = (currencyData as any)?.data.find(
          (item: Currency) => item.currencyCode === cookies.currency
        )

        console.log({ currency })

        if (currency)
          setCurrentCurrency({
            label: currency.currencyName,
            value: currency.currencyCode,
          })
      } else {
        const currencyByLang = getCurrencyByLang(lang)
        const currency = (currencyData as any)?.data.find(
          (item: Currency) => item.currencyCode === currencyByLang
        )
        console.log({ currencyByLang, currency })
        setCookie('currency', currency.currencyCode, {
          expires: new Date('2030'),
          path: '/',
        })
        setCurrentCurrency(currency)
      }

      setCurrentLang({ label: defaultLang?.name, value: defaultLang?.locale })

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
    <Card className="lg:w-[300px]">
      <CardHeader>
        <Typography as="h6" className="font-[500]">
          {dictionary.navbar.set_language_and_currency_title}
        </Typography>
        <Typography className="text-xs">
          {dictionary.navbar.set_language_and_currency_description}
        </Typography>
      </CardHeader>
      <CardContent>
        <div className="mb-2">
          <Typography className="text-sm mb-1">
            {dictionary.common.language_text}
          </Typography>
          {!isLocalesPending ? (
            <ReactSelect
              isMulti={false}
              createAble={false}
              value={currentLang}
              onChange={(val) => setCurrentLang(val)}
              options={(localeData as any)?.data?.map(
                (item: SupportedLocale) => ({
                  label: item.name,
                  value: item.locale,
                })
              )}
            />
          ) : (
            <Skeleton className="h-[40px] w-full" />
          )}
        </div>
        <div>
          <Typography className="text-sm mb-1">
            {dictionary.common.currency_text}
          </Typography>
          {!isCurrenciesPending ? (
            <ReactSelect
              isMulti={false}
              createAble={false}
              value={currentCurrency}
              onChange={(val) => setCurrentCurrency(val)}
              options={(currencyData as any)?.data?.map((item: Currency) => ({
                label: item.currencyName,
                value: item.currencyCode,
              }))}
            />
          ) : (
            <Skeleton className="h-[40px] w-full" />
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={() => handleSaveButton()}>
          {dictionary.common.save_text}
        </Button>
      </CardFooter>
    </Card>
  )
}
