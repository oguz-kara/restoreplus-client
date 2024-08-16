'use client'
import Container from '@/components/common/container'
import Section from '@/components/common/section'
import { Button } from '@/components/ui/button'
import { ServerImage } from '@/components/ui/image'
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Typography from '@/components/ui/typography'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { useDictionary } from '@/context/use-dictionary'
import BillingAddress from '@/features/active-order/components/billing-address'
import ShippingAddress from '@/features/active-order/components/shipping-address'
import { useActiveOrder } from '@/features/active-order/context/use-active-order'
import { ParamsWithLang } from '@/i18n/types'
import { formatPrice } from '@/utils/format-price'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Page({ params: { lang } }: ParamsWithLang) {
  const router = useRouter()
  const {
    dictionary: {
      checkoutPage: {
        orderSummary,
        tableHeads,
        title,
        total,
        createOrderButtonText,
        totalBeforeTaxes,
        totalDiscount,
        totalTaxes,
      },
    },
  } = useDictionary()
  const [selectedAddress] = useState<Address | null>(null)
  const { activeOrder } = useActiveOrder()
  const { user } = useAuthenticatedUser()
  const {
    dictionary: {
      profile: { addressList },
    },
  } = useDictionary()

  if (!activeOrder) {
    router.push(`/${lang}/create-order`)
    return
  }

  return (
    <div className="py-10">
      <Section>
        <Container>
          <div>
            <div className="mb-5">
              <Typography as="h2" className="pb-5">
                {title}
              </Typography>
              <hr />
            </div>
            <div className="flex gap-10 mb-2 flex-col-reverse lg:flex-row">
              <div className="flex-1">
                <Typography as="h2">{orderSummary}</Typography>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px] capitalize">
                        {tableHeads.image}
                      </TableHead>
                      <TableHead className="capitalize">
                        {tableHeads.name}
                      </TableHead>
                      <TableHead className="capitalize">
                        {tableHeads.amount}
                      </TableHead>
                      <TableHead className="text-right capitalize">
                        {tableHeads.price}
                      </TableHead>
                      <TableHead className="text-right capitalize">
                        {total}
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeOrder?.lines?.map((line) => (
                      <TableRow key={line.id}>
                        <TableCell className="font-medium">
                          <ServerImage
                            alt={line.product.featuredImage?.alt || ''}
                            src={line.product.featuredImage?.path || ''}
                            width={150}
                            height={150}
                          />
                        </TableCell>
                        <TableCell>{line.product.name}</TableCell>
                        <TableCell>{line.quantity}</TableCell>
                        <TableCell className="text-right">
                          {formatPrice(
                            line.price.value || 0,
                            activeOrder.currencyCode
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatPrice(
                            (line.price.value || 0) * line.quantity,
                            activeOrder.currencyCode
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={4}>{totalBeforeTaxes}</TableCell>
                      <TableCell className="text-right">
                        {formatPrice(
                          activeOrder?.priceSummary.totalPrice -
                            activeOrder.priceSummary.totalTaxes,
                          (activeOrder?.currencyCode as string) || 'USD'
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4}>{totalTaxes}</TableCell>
                      <TableCell className="text-right">
                        {formatPrice(
                          activeOrder?.priceSummary?.totalTaxes || 0,
                          (activeOrder?.currencyCode as string) || 'USD'
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4}>{totalDiscount}</TableCell>
                      <TableCell className="text-right">
                        {formatPrice(
                          activeOrder.priceSummary?.totalDiscount || 0,
                          activeOrder?.currencyCode || 'USD'
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={4}>
                        <Typography className="font-semibold" as="h5">
                          {total}
                        </Typography>
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        <Typography className="font-semibold" as="h5">
                          {formatPrice(
                            activeOrder.priceSummary?.netPrice || 0,
                            activeOrder?.currencyCode || 'USD'
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div className="flex gap-5">
                  <div className="flex-1">
                    <ShippingAddress />
                  </div>
                  <div className="flex-1">
                    <BillingAddress />
                  </div>
                </div>
                <div className="flex justify-end bg-muted p-2 rounded-sm mt-10">
                  <Button disabled={!selectedAddress}>
                    <span className="mr-2">{createOrderButtonText}</span>
                    <span>
                      <ArrowRight size="18px" />
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}
