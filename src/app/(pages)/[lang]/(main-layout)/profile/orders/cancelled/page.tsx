import NoDataFound from '@/components/common/no-data-found'
import Paginate from '@/components/common/pagination'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ServerImage } from '@/components/ui/image'
import Typography from '@/components/ui/typography'
import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import { getDictionaryV2 } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import { formatPrice } from '@/utils/format-price'
import { getOrdersOfActiveUser } from '@/utils/get-server-side-active-user'
import { getStatus } from '@/utils/get-status'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale(
    '/profile/orders/cancelled',
    lang
  )

  return seoData
}

export default async function Page({
  params: { lang },
  searchParams: { page, take },
}: ParamsWithLang & SearchParamsWithPagination) {
  const dict = await getDictionaryV2(lang)
  const response = await getOrdersOfActiveUser({
    page: page as any,
    take: take as any,
    filter: 'cancelled',
  })

  const status = {
    created: dict.profile.order_history_status_created_text,
    approved: dict.profile.order_history_status_approved_text,
    cancelled: dict.profile.order_history_status_cancelled_text,
    delivered: dict.profile.order_history_status_delivered_text,
    declined: dict.profile.order_history_status_declined_text,
    shipped: dict.profile.order_history_status_shipped_text,
    refunded: dict.profile.order_history_status_refunded_text,
    unknown: dict.profile.order_history_status_unknown_text,
  }

  if (!response || !response.data) return <NoDataFound />

  const { data: orders, pagination } = response

  return (
    <div>
      <div>
        <Accordion type="multiple" className="w-full">
          {orders?.map((order) => (
            <AccordionItem
              className="mb-5 border-none outline-none"
              value={order.id.toString()}
              key={order.id}
              style={{
                boxShadow:
                  'rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px',
              }}
            >
              <Card className="border-none outline-none">
                <AccordionTrigger className="bg-gray-100 pr-5 text-left border-none outline-none">
                  <CardHeader className="w-full">
                    <table className="w-full">
                      <thead>
                        <tr>
                          <th className="pb-2 text-left text-gray-400 font-semibold w-1/5 text-sm pr-5">
                            {
                              dict.profile
                                .order_history_details_order_placed_text
                            }
                          </th>
                          <th className="pb-2 text-left text-gray-400 font-semibold w-1/5 text-sm pr-5">
                            {dict.profile.order_history_details_total_text}
                          </th>
                          <th className="pb-2 text-left text-gray-400 font-semibold w-1/5 text-sm pr-5">
                            {dict.profile.order_history_details_ship_to_text}
                          </th>
                          <th className="pb-2 text-left w-2/5 text-sm pr-5">
                            {dict.profile.order_history_details_order_text}{' '}
                            {` `} # {` `} {order.orderCode}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="pr-5">
                            {order?.createdAt.toString()}
                          </td>
                          <td className="pr-5">
                            {formatPrice(
                              order.orderPriceSummary?.netTotal || 0,
                              order.currencyCode
                            )}
                          </td>
                          <td className="pr-5">
                            {order.shippingAddress?.authorizedPerson}
                          </td>
                          <td className="pr-5">
                            <Badge className="m-0">
                              {getStatus(order.status, status)}
                            </Badge>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </CardHeader>
                </AccordionTrigger>
                <AccordionContent>
                  <CardContent>
                    <table className="w-full">
                      <tbody>
                        {order.lines.map((line) => (
                          <tr key={line.id}>
                            <td>
                              <ServerImage
                                src={
                                  line.productVariant.featuredImage?.path || '/'
                                }
                                alt={
                                  line.productVariant.featuredImage?.alt || ''
                                }
                                width={300}
                                height={300}
                                style={{
                                  width: '150px',
                                  height: '150px',
                                  objectFit: 'contain',
                                }}
                              />
                            </td>
                            <td className="p-5">
                              <Typography as="h6" className="font-semibold">
                                {`${line.productVariant.name} ${line.productVariant.value}`}
                              </Typography>
                              <Typography
                                as="p"
                                className="font-semibold text-sm"
                              >
                                {line.productVariant.productType}
                              </Typography>
                            </td>
                            <td>
                              <Typography
                                as="p"
                                className="font-semibold text-sm"
                              >
                                {`${formatPrice(
                                  line.priceSummary.netPriceForSingleProduct,
                                  order.currencyCode
                                )} x ${line.quantity}`}
                              </Typography>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </CardContent>
                </AccordionContent>
              </Card>
            </AccordionItem>
          ))}
        </Accordion>
        <Paginate
          total={pagination.total ? pagination.total : 0}
          url="/profile/orders"
        />
      </div>
    </div>
  )
}
