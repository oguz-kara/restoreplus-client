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
import { useDictionary } from '@/context/use-dictionary'
import { useActiveOrder } from '@/features/active-order/context/active-order-context'
import {
  createOrderApi,
  setActiveOrderAddressApi,
} from '@/features/active-order/data/active-order'
import { AddressFormModal } from '@/features/user/components/address-form-modal'
import AddressList from '@/features/user/components/address-list'
import { ParamsWithLang } from '@/i18n/types'
import { formatPrice } from '@/utils/format-price'
import { ArrowRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function Page({ params: { lang } }: ParamsWithLang) {
  const router = useRouter()
  const {
    dictionary: {
      checkoutPage: {
        createOrderButtonText,
        orderSummary,
        pickAddress,
        tableHeads,
        title,
        total,
        totalBeforeTaxes,
        totalDiscount,
        totalTaxes,
        totalAfterTaxes,
      },
    },
  } = useDictionary()
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)
  const { activeOrder, getAndSetActiveOrder } = useActiveOrder()
  const {
    dictionary: {
      profile: { addressList },
    },
  } = useDictionary()

  const handleCreateOrderButton = async () => {
    const result = await createOrderApi()
    console.log({ result })
    if (result.success) {
      await getAndSetActiveOrder()
      router.push('/order-creation-result/' + result.orderId, {})
    } else {
      router.push('/order-creation-result/0')
    }
  }

  const handleOrderAddressChange = async (address: Address) => {
    if (address.id) {
      const result = await setActiveOrderAddressApi(address.id)
      if (!result.message) {
        setSelectedAddress(address)
        console.log({ result })
      } else {
        console.error({ message: result.message })
      }
    }
  }

  if (!activeOrder) {
    router.push(`/${lang}/create-order`)
    return
  }

  console.log({ activeOrder })

  return (
    <div className="py-10">
      <Section>
        <Container>
          <div>
            <div className="mb-5">
              <Typography as="h1">{title}</Typography>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeOrder?.lines?.map((line) => (
                      <TableRow key={line.id}>
                        <TableCell className="font-medium">
                          <ServerImage
                            alt={line.productVariant.featuredImage?.alt || ''}
                            src={line.productVariant.featuredImage?.path || ''}
                            width={150}
                            height={150}
                          />
                        </TableCell>
                        <TableCell>{line.productVariant.name}</TableCell>
                        <TableCell>{line.quantity}</TableCell>
                        <TableCell className="text-right">
                          {formatPrice(
                            line.priceSummary.netTotal || 0,
                            activeOrder.currencyCode
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={3}>{totalBeforeTaxes}</TableCell>
                      <TableCell className="text-right">
                        {formatPrice(
                          activeOrder?.orderPriceSummary?.totalPrice || 0,
                          (activeOrder?.currencyCode as string) || 'USD'
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}>{totalTaxes}</TableCell>
                      <TableCell className="text-right">
                        {formatPrice(
                          activeOrder?.orderPriceSummary?.totalTaxes || 0,
                          (activeOrder?.currencyCode as string) || 'USD'
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}>{totalDiscount}</TableCell>
                      <TableCell className="text-right">
                        {formatPrice(
                          activeOrder.orderPriceSummary?.totalDiscount || 0,
                          activeOrder?.currencyCode || 'USD'
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}>{totalAfterTaxes}</TableCell>
                      <TableCell className="text-right">
                        {formatPrice(
                          activeOrder.orderPriceSummary?.totalPriceWithTaxes ||
                            0,
                          activeOrder?.currencyCode || 'USD'
                        )}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={3}>
                        <Typography className="font-semibold" as="h5">
                          {total}
                        </Typography>
                      </TableCell>
                      <TableCell className="text-right font-bold">
                        <Typography className="font-semibold" as="h5">
                          {formatPrice(
                            activeOrder.orderPriceSummary?.netTotal || 0,
                            activeOrder?.currencyCode || 'USD'
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
              <div className="flex flex-col justify-between flex-1">
                <div>
                  <Typography as="h2">{pickAddress}</Typography>
                  <AddressFormModal>
                    <Button className="mb-5" variant="outline">
                      {addressList.newAddressButton}
                    </Button>
                  </AddressFormModal>
                  <AddressList
                    onChange={async (value: Address) =>
                      await handleOrderAddressChange(value)
                    }
                    value={
                      selectedAddress
                        ? selectedAddress
                        : activeOrder?.shippingAddress
                    }
                  />
                </div>
                <div className="flex justify-end bg-muted p-2 rounded-sm mt-10">
                  <Button
                    disabled={!selectedAddress}
                    onClick={handleCreateOrderButton}
                  >
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
