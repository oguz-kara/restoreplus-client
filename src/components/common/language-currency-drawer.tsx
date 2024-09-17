'use client'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@/components/ui/drawer'
import Link from '@/components/ui/link'
import { ScrollArea } from '@/components/ui/scroll-area'
import Typography from '@/components/ui/typography'
import { useDictionary } from '@/context/use-dictionary-v2'
import { ChevronLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { flags } from '@/constants/flags'
import Image from '../ui/image'
import { useCookies } from 'react-cookie'
import { Locale } from '@/i18n/types'
import i18n from '@/i18n'
import { cn } from '@/lib/utils'

export default function LanguageCurrencyDrawer({
  locales,
  currencies,
  setOpen,
  open,
}: {
  locales: SupportedLocale[]
  currencies: Currency[]
  setOpen: any
  open: boolean
}) {
  const pathname = usePathname()
  const [cookies, setCookie] = useCookies(['currency', 'lang'])
  const { dictionary, lang } = useDictionary()
  const [currentLang, setCurrentLang] = useState<string | null>(null)
  const [currentCurrency, setCurrentCurrency] = useState<string | null>(null)
  const { dictionary: dict } = useDictionary()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const getCurrencyByLang = (lang: Locale) => {
    if (lang === 'tr') return 'TRY'
    else return 'USD'
  }

  const getUrlWithNewLocale = (newLocale: string) => {
    const url = new URL(location.href)
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
    const hasLocale = i18n.locales.find((locale) =>
      pathname.startsWith(`/${locale}`)
    )

    if (hasLocale) {
      const href = getUrlWithNewLocale(currentLang as string)
      location.href = href
    }
  }

  useEffect(() => {
    const defaultLang = locales.find((item: any) => item.locale === lang)

    if (cookies.currency) {
      const currency = currencies.find(
        (item: Currency) => item.currencyCode === cookies.currency
      )

      if (currency) setCurrentCurrency(currency.currencyCode)
    } else {
      const currencyByLang = getCurrencyByLang(lang)
      const currency = currencies.find(
        (item: Currency) => item.currencyCode === currencyByLang
      )
      setCookie('currency', currency?.currencyCode, {
        expires: new Date('2030'),
        path: '/',
      })
      setCurrentCurrency(currency?.currencyCode ? currency?.currencyCode : null)
    }

    setCurrentLang(defaultLang?.locale ? defaultLang.locale : null)
  }, [])

  useEffect(() => {
    console.log({ currentCurrency, currentLang })
  }, [currentCurrency, currentLang])
  useEffect(() => {
    console.log({ locales, currencies })
  }, [currencies, locales])

  return (
    <div>
      <Drawer direction="left" onOpenChange={setOpen} open={open}>
        <DrawerContent className="top-0 mt-0 h-screen rounded-none lg:max-w-[400px]">
          <DrawerHeader className="text-left">
            <div className="flex justify-between items-center">
              <div>
                <DrawerClose>
                  <Button className="p-0" variant="ghost">
                    <ChevronLeft />
                  </Button>
                </DrawerClose>
              </div>
            </div>
          </DrawerHeader>
          <ScrollArea className="p-5 pt-0">
            {/* langs */}
            <div className="mb-10">
              <Typography as="h4" className="text-gray-700 mb-5">
                {dict.navbar.languages_and_currencies_text}
              </Typography>
              <div className="grid grid-cols-4 gap-x-3 gap-y-5">
                {locales && locales?.length > 0 ? (
                  locales.map((item) => (
                    <div
                      className={cn(
                        'flex items-center gap-2 cursor-pointer',
                        currentLang === item.locale ? 'font-bold' : null
                      )}
                      key={item.id}
                      onClick={() => setCurrentLang(item.locale)}
                    >
                      <div>
                        <Image
                          // @ts-ignore
                          src={flags[item.locale].path}
                          alt="country flag"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div>
                        <Typography className="text-sm">{item.name}</Typography>
                      </div>
                    </div>
                  ))
                ) : (
                  <Typography className="p-5">Nothing to show!</Typography>
                )}
              </div>
            </div>
            {/* currencies */}
            <div className="flex gap-3">
              {currencies &&
                currencies.length > 0 &&
                currencies.map((item, i) => (
                  <div
                    key={item.id}
                    onClick={() => setCurrentCurrency(item.currencyCode)}
                  >
                    <Button
                      variant="ghost"
                      className={cn(
                        'hover:bg-transparent bg-gray-100 text-sm hover:bg-gray-300',
                        currentCurrency === item.currencyCode
                          ? 'bg-primary'
                          : null
                      )}
                    >
                      {item.currencyCode}
                    </Button>
                  </div>
                ))}
            </div>
          </ScrollArea>
          <DrawerFooter className="pb-10">
            <Button
              type="button"
              className="p-7 w-full"
              onClick={(e) => handleSaveButton(e)}
            >
              <Typography className="text-lg font-semibold uppercase">
                {dict.common.save_text}
              </Typography>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
