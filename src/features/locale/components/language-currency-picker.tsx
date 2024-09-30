'use client'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import Typography from '@/components/ui/typography'
import { useDictionary } from '@/context/use-dictionary-v2'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { flags } from '@/constants/flags'
import Image from '../../../components/ui/image'
import { useCookies } from 'react-cookie'
import { Locale } from '@/i18n/types'
import { cn } from '@/lib/utils'
import { useQuery } from '@/hooks/use-query'

export default function LanguageCurrencyPicker() {
  const { isPending: isCurrenciesPending, data: currencyData } = useQuery([
    '/currency',
  ])
  const { isPending: isLocalesPending, data: localeData } = useQuery([
    '/supported-locales',
  ])
  const pathname = usePathname()
  const [cookies, setCookie] = useCookies(['currency', 'lang'])
  const { lang } = useDictionary()
  const [isDirty, setDirty] = useState<boolean>(false)
  const [currentLang, setCurrentLang] = useState<string | null>(null)
  const [currentCurrency, setCurrentCurrency] = useState<string | null>(null)
  const { dictionary: dict } = useDictionary()

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
    console.log({ href: url.href })

    return url.href
  }

  const handleSaveButton = (e: any) => {
    e.preventDefault()
    setDirty(false)
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
    if ((localeData as any)?.data && (currencyData as any)?.data) {
      const defaultLang = (localeData as any)?.data?.find(
        (item: any) => item.locale === lang
      )

      if (cookies.currency) {
        const currency = (currencyData as any)?.data?.find(
          (item: Currency) => item.currencyCode === cookies.currency
        )

        if (currency) setCurrentCurrency(currency.currencyCode)
      } else {
        const currencyByLang = getCurrencyByLang(lang)
        const currency = (currencyData as any)?.data?.find(
          (item: Currency) => item.currencyCode === currencyByLang
        )
        setCookie('currency', currency?.currencyCode, {
          expires: new Date('2030'),
          path: '/',
        })
        setCurrentCurrency(
          currency?.currencyCode ? currency?.currencyCode : null
        )
      }

      setCurrentLang(defaultLang?.locale ? defaultLang.locale : null)
    }
  }, [localeData, currencyData])

  return (
    <div>
      <ScrollArea className="p-5">
        {/* langs */}
        <div className="mb-10">
          <Typography as="h4" className="text-gray-700 mb-5">
            {dict.navbar.languages_and_currencies_text}
          </Typography>
          <div className="grid grid-cols-2 gap-3 max-h-[500px]">
            {(localeData as any)?.data &&
            (localeData as any)?.data?.length > 0 ? (
              (localeData as any)?.data?.map((item: SupportedLocale) => (
                <div
                  className={cn(
                    'flex items-center gap-2 cursor-pointer',
                    currentLang === item.locale ? 'font-bold' : null
                  )}
                  key={item.id}
                  onClick={() => {
                    setDirty(true)
                    setCurrentLang(item.locale)
                  }}
                >
                  <div>
                    <Image
                      // @ts-ignore
                      src={flags[item.locale].path}
                      alt="country flag"
                      width={24}
                      height={24}
                      className="w-[24px] h-[24px] object-contain"
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
          {(currencyData as any)?.data &&
            (currencyData as any)?.data?.length > 0 &&
            (currencyData as any)?.data?.map((item: Currency) => (
              <div
                key={item.id}
                onClick={() => setCurrentCurrency(item.currencyCode)}
              >
                <Button
                  variant="ghost"
                  className={cn(
                    'hover:bg-transparent bg-gray-100 text-sm hover:bg-gray-300',
                    currentCurrency === item.currencyCode ? 'bg-primary' : null
                  )}
                >
                  {item.currencyCode}
                </Button>
              </div>
            ))}
        </div>
        <div className="pt-5">
          <Button
            disabled={!isDirty}
            type="button"
            className="p-7 w-full"
            onClick={(e) => handleSaveButton(e)}
          >
            <Typography className="md:text-lg font-semibold uppercase">
              {dict.common.save_text}
            </Typography>
          </Button>
        </div>
      </ScrollArea>
    </div>
  )
}
