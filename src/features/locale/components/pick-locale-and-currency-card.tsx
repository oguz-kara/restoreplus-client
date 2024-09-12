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
import { clientFetcher } from '@/lib/client-fetcher'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import i18n from '@/i18n'
import { Skeleton } from '@/components/ui/skeleton'
import { useDictionary } from '@/context/use-dictionary-v2'

export default function PickLocaleAndCurrencyCard() {
  const router = useRouter()
  const pathname = usePathname()
  const [cookies, setCookie] = useCookies(['currency', 'lang'])
  const { dictionary: dict, lang } = useDictionary()
  const [locales, setLocales] = useState<SupportedLocale[]>([])
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [currentLang, setCurrentLang] = useState<string>(lang)
  const [currentCurrency, setCurrentCurrency] = useState<string>('USD')
  const [loading, setLoading] = useState<boolean>(false)

  const getAndSetLocales = async () => {
    try {
      setLoading(true)
      const { data } = await clientFetcher('/currency')
      if (data && Array.isArray(data)) setCurrencies(data)
    } catch (err: any) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const getAndSetCurrencies = async () => {
    try {
      setLoading(true)
      const { data } = await clientFetcher('/supported-locales')
      if (data && Array.isArray(data)) setLocales(data)
    } catch (err: any) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

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

    getAndSetLocales()
    getAndSetCurrencies()
  }, [])

  return (
    <Card className="w-full border-none shadow-none ">
      <CardHeader className="p-0 pb-3">
        <Typography as="h6" className="font-semibold">
          {dict.navbar.set_language_and_currency_title}
        </Typography>
        <Typography className="text-xs">
          {dict.navbar.set_language_and_currency_description}
        </Typography>
      </CardHeader>
      <CardContent className="p-0 pb-3">
        <div className="mb-2">
          <Typography className="text-sm mb-1 font-semibold">
            {dict.common.language_text}
          </Typography>
          {!loading ? (
            <Select onValueChange={(val) => setCurrentLang(val)}>
              <SelectTrigger className="w-full justify-start gap-3 rounded-none">
                <SelectValue
                  placeholder={
                    locales?.find((l) => l.locale === currentLang)?.name
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{dict.common.languages_text}</SelectLabel>
                  {locales.map((item: SupportedLocale, i: number) => (
                    <SelectItem key={i} value={item.locale}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Skeleton className="h-[40px] w-full" />
          )}
        </div>
        <div>
          <Typography className="text-sm mb-1 font-semibold">
            {dict.common.currency_text}
          </Typography>
          {!loading ? (
            <Select onValueChange={(val) => setCurrentCurrency(val)}>
              <SelectTrigger className="w-full justify-start gap-3 rounded-none">
                <SelectValue
                  placeholder={
                    currencies.find((l) => l.currencyCode === currentCurrency)
                      ?.currencyCode
                  }
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{dict.common.currencies_text}</SelectLabel>
                  {currencies.map((item: Currency, i: number) => (
                    <SelectItem key={i} value={item.currencyCode}>
                      {item.currencyCode}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <Skeleton className="h-[40px] w-full" />
          )}
        </div>
      </CardContent>
      <CardFooter className="p-0">
        <Button className="w-full" onClick={() => handleSaveButton()}>
          {dict.common.save_text}
        </Button>
      </CardFooter>
    </Card>
  )
}
