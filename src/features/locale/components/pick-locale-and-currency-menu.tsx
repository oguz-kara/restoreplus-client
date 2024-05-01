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
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { useDictionary } from '@/context/use-dictionary'
import { Locale } from '@/i18n/types'
import { clientFetcher } from '@/lib/client-fetcher'
import { Globe } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import i18n from '@/i18n'

export default function PickLocaleAndCurrencyMenu() {
  const router = useRouter()
  const pathname = usePathname()
  const [cookies, setCookie] = useCookies(['currency', 'lang'])
  const {
    dictionary: { localeCurrencyMenu },
    lang,
  } = useDictionary()
  const [locales, setLocales] = useState<SupportedLocale[]>([])
  const [currencies, setCurrencies] = useState<Currency[]>([])
  const [currentLang, setCurrentLang] = useState<string>(lang)
  const [currentCurrency, setCurrentCurrency] = useState<string>('USD')

  const getAndSetLocales = async () => {
    const { data } = await clientFetcher('/supported-locales')
    if (data && Array.isArray(data)) setLocales(data)
  }

  const getAndSetCurrencies = async () => {
    const { data } = await clientFetcher('/currency')
    if (data && Array.isArray(data)) setCurrencies(data)
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
      setCookie('currency', currency, { expires: new Date('2030'), path: '/' })
      setCurrentCurrency(currency)
    }

    if (cookies.lang) setCurrentLang(cookies.lang)

    getAndSetLocales()
    getAndSetCurrencies()
  }, [])

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
                        <SelectLabel>
                          {localeCurrencyMenu.languages}
                        </SelectLabel>
                        {locales.map((item: SupportedLocale, i: number) => (
                          <SelectItem key={i} value={item.locale}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Typography className="text-sm mb-1">
                    {localeCurrencyMenu.currency}
                  </Typography>
                  <Select onValueChange={(val) => setCurrentCurrency(val)}>
                    <SelectTrigger className="w-full justify-start gap-3 rounded-none">
                      <SelectValue
                        placeholder={
                          currencies.find(
                            (l) => l.currencyCode === currentCurrency
                          )?.currencyCode
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {localeCurrencyMenu.currencies}
                        </SelectLabel>
                        {currencies.map((item: Currency, i: number) => (
                          <SelectItem key={i} value={item.currencyCode}>
                            {item.currencyCode}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
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
