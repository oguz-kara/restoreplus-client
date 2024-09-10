'use client'
import { useCookies } from 'react-cookie'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
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
import { useDictionary } from '@/context/use-dictionary'
import { Locale } from '@/i18n/types'
import { Globe } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import i18n from '@/i18n'
import { Skeleton } from '@/components/ui/skeleton'
import { useQuery } from '@/hooks/use-query'

export default function PickLocaleAndCurrencyMenu() {
  const router = useRouter()
  const pathname = usePathname()
  const [cookies, setCookie] = useCookies(['currency', 'lang'])
  const {
    dictionary: { localeCurrencyMenu },
    lang,
  } = useDictionary()
  const [loading, setLoading] = useState<boolean>(false)
  // const [locales, setLocales] = useState<SupportedLocale[]>([])
  // const [currencies, setCurrencies] = useState<Currency[]>([])
  const { data: currencyData, isPending: isCurrenciesPending } = useQuery([
    '/currency',
  ])
  const { data: localeData, isPending: isLocalesPending } = useQuery([
    '/supported-locales',
  ])
  console.log({ localeData })
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

  if ((currencyData as any)?.data || (localeData as any)?.data) return null

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent">
            <Globe />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <Card className="w-[300px]">
              <CardHeader>
                <Typography as="h6" className="font-[500]">
                  {localeCurrencyMenu.title}
                </Typography>
                <Typography className="text-xs">
                  {localeCurrencyMenu.description}
                </Typography>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <Typography className="text-sm mb-1">
                    {localeCurrencyMenu.language}
                  </Typography>
                  {!isLocalesPending ? (
                    <Select onValueChange={(val) => setCurrentLang(val)}>
                      <SelectTrigger className="w-full justify-start gap-3 rounded-none">
                        <SelectValue
                          placeholder={
                            (localeData as any)?.data?.find(
                              (l: any) => l.locale === currentLang
                            )?.name
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>
                            {localeCurrencyMenu.languages}
                          </SelectLabel>
                          {(localeData as any)?.data?.map(
                            (item: SupportedLocale, i: number) => (
                              <SelectItem key={i} value={item.locale}>
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
                    {localeCurrencyMenu.currency}
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
                          <SelectLabel>
                            {localeCurrencyMenu.currencies}
                          </SelectLabel>
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
                  {localeCurrencyMenu.save}
                </Button>
              </CardFooter>
            </Card>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
