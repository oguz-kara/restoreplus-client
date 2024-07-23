'use client'
import { usePathname } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'

type OfferProductType = {
  product: Product
  quantity: number
  productVariantId?: number
}

const INITIAL_STATE = {
  addNewOfferProduct: (productVariant: Product, quantity: number) => {},
  updateOfferProductQuantityById: (id: number, quantity: number) => {},
  deleteOfferProductById: (id: number) => {},
  clearAllOfferProducts: () => {},
  updateOfferProductVariantById: (id: number, variantId: number) => {},
  drawerOpen: false,
  setDrawerOpen: (value: boolean) => {},
  offerProducts: [] as OfferProductType[],
}

const OfferProductsContext = createContext(INITIAL_STATE)

const OfferProductsProvider = ({
  children,
}: { children: React.ReactNode } & {}) => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false)
  const [currentOfferProducts, setCurrentOfferProducts] = useState<
    OfferProductType[]
  >([])
  const pathname = usePathname()

  const addNewOfferProduct = (product: Product, quantity: number = 1) => {
    const isHasProduct = currentOfferProducts.find(
      (item) => item.product.id === product.id
    )

    if (!isHasProduct) {
      const val = [...currentOfferProducts, { product, quantity }]
      setCurrentOfferProducts(val)
      localStorage.setItem('currentOfferProducts', JSON.stringify(val))
    }

    return !isHasProduct
  }

  const updateOfferProductQuantityById = (id: number, quantity: number) => {
    const val = currentOfferProducts.map((item) => {
      if (item.product.id === id) {
        return { ...item, quantity }
      }
      return item
    })

    setCurrentOfferProducts(val)
    localStorage.setItem('currentOfferProducts', JSON.stringify(val))
  }

  const updateOfferProductVariantById = (id: number, variantId: number) => {
    const val = currentOfferProducts.map((item) => {
      if (item.product.id === id) {
        return { ...item, productVariantId: variantId }
      }
      return item
    })

    setCurrentOfferProducts(val)
    localStorage.setItem('currentOfferProducts', JSON.stringify(val))
  }

  const deleteOfferProductById = (id: number) => {
    const val = currentOfferProducts.filter((item) => item.product.id !== id)
    setCurrentOfferProducts(val)
    localStorage.setItem('currentOfferProducts', JSON.stringify(val))
  }

  const clearAllOfferProducts = () => {
    setCurrentOfferProducts([])
    localStorage.removeItem('currentOfferProducts')
  }

  useEffect(() => {
    const lsCurrentOfferProducts = localStorage.getItem('currentOfferProducts')

    if (lsCurrentOfferProducts) {
      const products = JSON.parse(lsCurrentOfferProducts) as OfferProductType[]
      setCurrentOfferProducts(products)
    }
  }, [pathname])

  return (
    <OfferProductsContext.Provider
      value={{
        addNewOfferProduct,
        updateOfferProductQuantityById,
        deleteOfferProductById,
        clearAllOfferProducts,
        updateOfferProductVariantById,
        setDrawerOpen,
        offerProducts: currentOfferProducts,
        drawerOpen,
      }}
    >
      {children}
    </OfferProductsContext.Provider>
  )
}

export const useOfferProducts = () => useContext(OfferProductsContext)

export default OfferProductsProvider
