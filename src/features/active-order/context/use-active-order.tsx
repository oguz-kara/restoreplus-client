'use client'
import { createContext, useContext, useEffect, useState } from 'react'
import { ActiveOrder } from '../types'
import { useMutation } from '@/hooks/use-mutation'
import { useQuery } from '@/hooks/use-query'

export interface ActiveOrderState {
  activeOrder: ActiveOrder | null
  initialPending: boolean
  adjustOrderLineData?: {
    mutate: ({
      productVariantId,
      quantity,
    }: {
      productVariantId: number
      quantity: number
    }) => Promise<void>
    isPending: boolean
  }
  updateOrderLineQuantityData?: {
    mutate: ({
      lineId,
      quantity,
    }: {
      lineId: number
      quantity: number
    }) => Promise<void>
    isPending: boolean
  }
  removeOrderLineData?: {
    mutate: ({ lineId }: { lineId: number }) => Promise<void>
    isPending: boolean
  }
  createOrderData?: {
    mutate: () => Promise<void>
    isPending: boolean
  }
  setShippingAddressData?: {
    mutate: ({
      addressId,
      isSame,
    }: {
      addressId: number
      isSame?: boolean
    }) => Promise<void>
    isPending: boolean
  }
  setBillingAddressData?: {
    mutate: ({ addressId }: { addressId: number }) => Promise<void>
    isPending: boolean
  }
}

const INITIAL_STATE: ActiveOrderState = {
  initialPending: false,
  activeOrder: null,
}

export const ActiveOrderContext = createContext(INITIAL_STATE)

export const ActiveOrderContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [activeOrder, setActiveOrder] = useState<ActiveOrder | null>(null)
  const { data: initialActiveOrder, isPending: isInitialActiveOrderPending } =
    useQuery(['/active-order'])
  const {
    mutateAsync: adjustOrderLineMutation,
    isPending: isAdjustOrderLinePending,
  } = useMutation<any>()
  const {
    mutateAsync: updateOrderLineQuantityMutation,
    isPending: isUpdateOrderLineQuantityPending,
  } = useMutation<any>()
  const {
    mutateAsync: removeOrderLineMutation,
    isPending: isRemoveOrderLinePending,
  } = useMutation<any>()
  const { mutateAsync: createOrderMutation, isPending: createOrderIsPending } =
    useMutation<any>()
  const {
    mutateAsync: setShippingAddressMutation,
    isPending: setShippingAddressIsPending,
  } = useMutation<any>()
  const {
    mutateAsync: setBillingAddressMutation,
    isPending: setBillingAddressIsPending,
  } = useMutation<any>()

  const adjustOrderLine = async ({
    quantity,
    productVariantId,
  }: {
    quantity: number
    productVariantId: number
  }) => {
    const result = await adjustOrderLineMutation({
      method: 'POST',
      path: `/active-order`,
      body: {
        quantity,
        productVariantId,
      },
    })

    if (!result?.message) setActiveOrder(result)
  }

  const updateOrderLineQuantity = async ({
    lineId,
    quantity,
  }: {
    lineId: number
    quantity: number
  }) => {
    const result = await updateOrderLineQuantityMutation({
      method: 'PUT',
      path: `/active-order/?id=${lineId}`,
      body: {
        quantity,
      },
    })

    if (!result?.message) setActiveOrder(result)
  }

  const removeOrderLine = async ({ lineId }: { lineId: number }) => {
    const result = await removeOrderLineMutation({
      method: 'DELETE',
      path: `/active-order/?id=${lineId}`,
    })

    if (!result?.message) setActiveOrder(result)
  }

  const setShippingAddress = async ({
    addressId,
    isSame = false,
  }: {
    addressId: number
    isSame?: boolean
  }) => {
    const result = await setShippingAddressMutation({
      method: 'PUT',
      path: `/active-order/shipping-address`,
      body: {
        addressId,
        isSame,
      },
    })

    if (!result?.message) setActiveOrder(result)
  }

  const setBillingAddress = async ({ addressId }: { addressId: number }) => {
    const result = await setBillingAddressMutation({
      method: 'PUT',
      path: `/active-order/billing-address`,
      body: {
        addressId,
      },
    })

    if (!result?.message) setActiveOrder(result)
  }

  const createOrder = async () => {
    const result = await createOrderMutation({
      path: `/create-order`,
    })

    console.log({ result })
  }

  useEffect(() => {
    if (!activeOrder) setActiveOrder(initialActiveOrder as ActiveOrder)
  }, [initialActiveOrder])

  return (
    <ActiveOrderContext.Provider
      value={{
        initialPending: isInitialActiveOrderPending,
        adjustOrderLineData: {
          mutate: adjustOrderLine,
          isPending: isAdjustOrderLinePending,
        },
        updateOrderLineQuantityData: {
          mutate: updateOrderLineQuantity,
          isPending: isUpdateOrderLineQuantityPending,
        },
        removeOrderLineData: {
          mutate: removeOrderLine,
          isPending: isRemoveOrderLinePending,
        },
        createOrderData: {
          mutate: createOrder,
          isPending: createOrderIsPending,
        },
        setShippingAddressData: {
          mutate: setShippingAddress,
          isPending: setShippingAddressIsPending,
        },
        setBillingAddressData: {
          mutate: setBillingAddress,
          isPending: setBillingAddressIsPending,
        },
        activeOrder,
      }}
    >
      {children}
    </ActiveOrderContext.Provider>
  )
}

export const useActiveOrder = () => useContext(ActiveOrderContext)
