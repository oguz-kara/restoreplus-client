import { Button } from '@/components/ui/button'
import Link from '@/components/ui/link'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Typography from '@/components/ui/typography'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import { getServerSideActiveUser } from '@/utils/get-server-side-active-user'
import { redirect } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

export default async function Layout({
  children,
  params: { lang },
}: PropsWithChildren & ParamsWithLang) {
  const {
    profileOrderHistoryPage: {
      orderDetails,
      tabs,
      title,
      viewOrderButtonText,
      dateFilters,
      status,
    },
  } = await getDictionary(lang)

  const user = await getServerSideActiveUser()

  if (!user) redirect('/login')

  const { orders } = user

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <Typography as="h4" className="font-semibold">
          {title}
        </Typography>
        <Typography className="flex justify-center items-center w-[25px] h-[25px] bg-gray-100 rounded-md font-bold text-sm">
          {orders?.length}
        </Typography>
      </div>
      <div className="flex justify-between">
        <div
          className="bg-gray-100 p-1 inline-block rounded-md mb-5"
          style={{
            boxShadow:
              'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
          }}
        >
          <Link href="/" lang={lang}>
            <Button
              style={{
                boxShadow: 'rgba(0, 0, 0, 0.15) 0px 3px 3px 0px',
              }}
              variant="ghost"
              className="bg-white font-semibold text-sm h-8"
            >
              {tabs.all}
            </Button>
          </Link>
          <Link href="/" lang={lang}>
            <Button className="font-semibold text-sm h-8" variant="ghost">
              {tabs.pending}
            </Button>
          </Link>
          <Link href="/" lang={lang}>
            <Button className="font-semibold text-sm h-8" variant="ghost">
              {tabs.cancelled}
            </Button>
          </Link>
        </div>
        <div>
          <Select defaultValue={'tes2'}>
            <SelectTrigger
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
              }}
              className="w-full justify-start gap-3 bg-gray-100 border-none rounded-md"
            >
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent defaultValue="tes2">
              <SelectGroup defaultValue={'tes2'}>
                <SelectItem defaultValue="tes2" value="tes2">
                  {dateFilters.past1Months}
                </SelectItem>
                <SelectItem value="tes3">{dateFilters.past3Months}</SelectItem>
                <SelectItem value="tes4">{dateFilters.past6Months}</SelectItem>
                <SelectItem value="tes5">{dateFilters.past12Months}</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {children}
    </div>
  )
}
