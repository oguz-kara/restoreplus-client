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
import { Combobox } from '@/components/ui/combobox'

export default function PickLocaleAndCurrencyCard() {
  const router = useRouter()
  const pathname = usePathname()
  const [cookies, setCookie] = useCookies(['currency', 'lang'])
  const { dictionary, lang } = useDictionary()
  const { data: currencyData, isPending: isCurrenciesPending } = useQuery([
    '/currency',
  ])
  const { data: localeData, isPending: isLocalesPending } = useQuery([
    '/supported-locales',
  ])
  const [currentLang, setCurrentLang] = useState<string>(lang)
  const [currentCurrency, setCurrentCurrency] = useState<string>('USD')

  const getCurrencyByLang = (lang: Locale) => {
    if (lang === 'tr') return 'TRY'
    else return 'USD'
  }

  const handleSaveButton = () => {
    setCookie('lang', currentLang, { expires: new Date('2030'), path: '/' })
    setCookie('currency', currentCurrency, {
      expires: new Date('2030'),
      path: '/',
    })
    const hasLocale = i18n.locales.find((locale) =>
      pathname.startsWith(`/${locale}`)
    )
    if (hasLocale)
      router.push(pathname.replace(`/${hasLocale}`, `/${currentLang}`))

    location.reload()
  }

  useEffect(() => {
    if (cookies.currency) setCurrentCurrency(cookies.currency)
    else {
      const currency = getCurrencyByLang(lang)
      setCookie('currency', currency, {
        expires: new Date('2030'),
        path: '/',
      })
      setCurrentCurrency(currency)
    }

    if (cookies.lang) setCurrentLang(cookies.lang)
  }, [])

  useEffect(() => {
    console.log({ currencyData, localeData })
  }, [currencyData, localeData])

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
            <Select onValueChange={(val) => setCurrentLang(val)}>
              <SelectTrigger
                className="w-full justify-start gap-3 rounded-none z-[9999]"
                onClick={(e) => e.stopPropagation()}
              >
                <SelectValue
                  placeholder={
                    (localeData as any)?.data?.find(
                      (l: any) => l.locale === currentLang
                    )?.name
                  }
                />
              </SelectTrigger>
              <SelectContent className="z-[9999]">
                <SelectGroup>
                  <SelectLabel>{dictionary.common.languages_text}</SelectLabel>
                  {(localeData as any)?.data?.map(
                    (item: SupportedLocale, i: number) => (
                      <SelectItem
                        key={i}
                        value={item.locale}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {item.name}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Skeleton className="h-[40px] w-full" />
          )}
        </div>
        <div>
          <Typography className="text-sm mb-1">
            {dictionary.common.currency_text}
          </Typography>
          {!isCurrenciesPending ? (
            <Select onValueChange={(val) => setCurrentCurrency(val)}>
              <SelectTrigger className="w-full justify-start gap-3 rounded-none">
                <SelectValue
                  placeholder={
                    (currencyData as any)?.data?.find(
                      (l: any) => l.currencyCode === currentCurrency
                    )?.currencyCode
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{dictionary.common.currencies_text}</SelectLabel>
                  {(currencyData as any)?.data?.map(
                    (item: Currency, i: number) => (
                      <SelectItem key={i} value={item.currencyCode}>
                        {item.currencyCode}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
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
