import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Typography from '@/components/ui/typography'
import OrderFilterLinks from '@/features/order/components/order-filter-links'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import { getServerSideActiveUser } from '@/utils/get-server-side-active-user'
import { redirect } from 'next/navigation'
import React, { PropsWithChildren } from 'react'

export default async function Layout({
  children,
  params: { lang },
}: PropsWithChildren & ParamsWithLang) {
  const dict = await getDictionary(lang)

  const user = await getServerSideActiveUser()

  if (!user) redirect('/login')

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <Typography as="h4" className="font-semibold">
          {dict.profile.order_history_title}
        </Typography>
      </div>
      <div className="flex justify-between">
        <OrderFilterLinks lang={lang} />
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
                <SelectItem value="tes1">
                  {dict.profile.order_history_date_filters_past_one_text}
                </SelectItem>
                <SelectItem value="tes2">
                  {dict.profile.order_history_date_filters_past_three_text}
                </SelectItem>
                <SelectItem value="tes3">
                  {dict.profile.order_history_date_filters_past_six_text}
                </SelectItem>
                <SelectItem value="tes4">
                  {dict.profile.order_history_date_filters_past_twelve_text}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {children}
    </div>
  )
}
