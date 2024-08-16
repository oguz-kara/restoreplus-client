'use client'
import { createContext, useContext, useState } from 'react'

export interface CartState {
  isOpen: boolean
  setOpen: (open: boolean) => void
}

const INITIAL_STATE: CartState = {
  isOpen: false,
  setOpen: () => {},
}

export const CartContext = createContext(INITIAL_STATE)

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [open, setOpen] = useState<boolean>(false)

  return (
    <CartContext.Provider
      value={{
        isOpen: open,
        setOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
