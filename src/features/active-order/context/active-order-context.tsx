'use client'
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { ActiveOrderReducer, ActiveOrderAction } from './active-order-reducer'
import { Order } from '../types'
import {
  adjustOrderLineApi,
  deleteOrderLineApi,
  getActiveOrderApi,
  updateOrderLineApi,
} from '../data/active-order'

export interface ActiveOrderState {
  activeOrder: Order | null
  adjustingOrderLine: boolean
  isOpen: boolean
  setOpen: any
  temporarilyOpen: (ms: number) => void
  removingOrderLine: boolean
  updatingOrderLine: boolean
  adjustOrderLine: ({
    quantity,
    productVariantId,
    currencyCode,
  }: {
    quantity: number
    productVariantId: number
    currencyCode: string
  }) => Promise<void>
  removeOrderLine: (lineId: number) => Promise<void>
  updateOrderLineQuantity: ({
    lineId,
    quantity,
  }: {
    lineId: number
    quantity: number
  }) => Promise<void>
  error?: Error
  dispatch: Dispatch<ActiveOrderAction>
}

const INITIAL_STATE: ActiveOrderState = {
  activeOrder: null,
  adjustingOrderLine: false,
  isOpen: false,
  setOpen: () => {},
  removingOrderLine: false,
  updatingOrderLine: false,
  temporarilyOpen: (ms: number) => {},
  adjustOrderLine: () => Promise.reject(),
  removeOrderLine: () => Promise.reject(),
  updateOrderLineQuantity: () => Promise.reject(),
  dispatch: () => console.error('ActiveOrder dispatch is empty'),
}

interface LoginParams {
  identifier: string
  pwd: string
}

export const ActiveOrderContext = createContext(INITIAL_STATE)

export const ActiveOrderContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(ActiveOrderReducer, INITIAL_STATE)
  const [adjustingOrderLine, setAdjustingOrderLine] = useState<boolean>(false)
  const [removingOrderLine, setRemovingOrderLine] = useState<boolean>(false)
  const [updatingOrderLine, setUpdatingOrderLine] = useState<boolean>(false)
  const [isOpen, setOpen] = useState<boolean>(false)

  const getAndSetActiveOrder = async () => {
    const activeOrder = await getActiveOrderApi()

    if (activeOrder)
      dispatch({ type: 'SET_ACTIVE_ORDER', payload: activeOrder })
  }

  const temporarilyOpen = (ms: number = 500) => {
    setOpen(true)
    setTimeout(() => {
      setOpen(false)
    }, ms)
  }

  const adjustOrderLine = async ({
    quantity,
    productVariantId,
    currencyCode,
  }: {
    quantity: number
    productVariantId: number
    currencyCode: string
  }) => {
    try {
      setAdjustingOrderLine(true)
      const data = await adjustOrderLineApi({
        quantity,
        productVariantId,
        currencyCode,
      })

      console.log({ quantity, productVariantId, currencyCode })

      if (!data.message) dispatch({ type: 'SET_ACTIVE_ORDER', payload: data })
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err })
    } finally {
      setTimeout(() => {
        setAdjustingOrderLine(false)
      }, 500)
    }
  }

  const removeOrderLine = async (lineId: number) => {
    try {
      setRemovingOrderLine(true)
      const data = await deleteOrderLineApi(lineId)
      console.log({ data })
      if (!data.message) dispatch({ type: 'SET_ACTIVE_ORDER', payload: data })
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err })
    } finally {
      setTimeout(() => {
        setRemovingOrderLine(false)
      }, 500)
    }
  }

  const updateOrderLineQuantity = async ({
    lineId,
    quantity,
  }: {
    lineId: number
    quantity: number
  }) => {
    try {
      setUpdatingOrderLine(true)
      const data = await updateOrderLineApi({ lineId, quantity })
      if (!data.message) dispatch({ type: 'SET_ACTIVE_ORDER', payload: data })
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err })
    } finally {
      setTimeout(() => {
        setRemovingOrderLine(false)
      }, 500)
    }
  }

  useEffect(() => {
    getAndSetActiveOrder()
  }, [])

  useEffect(() => {
    console.log({ activeOrder: state.activeOrder })
  }, [state, state.activeOrder])

  return (
    <ActiveOrderContext.Provider
      value={{
        ...state,
        adjustingOrderLine,
        removingOrderLine,
        updatingOrderLine,
        adjustOrderLine,
        removeOrderLine,
        updateOrderLineQuantity,
        isOpen,
        temporarilyOpen,
        setOpen,
        dispatch,
      }}
    >
      {children}
    </ActiveOrderContext.Provider>
  )
}

export const useActiveOrder = () => useContext(ActiveOrderContext)
