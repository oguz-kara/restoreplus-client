'use client'
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { AuthReducer, AuthAction } from './auth-reducer'
import { getActiveUser } from '@/features/auth/api/active-user'
import { useMutation } from '@/hooks/use-mutation'
import useMessages from '@/hooks/use-messages'

export type LoginValues = {
  email: string
  password: string
}

type CompanyInput = {
  name: string
  description: string
  website: string
  phoneNumber: string
  taxNumber: string
  fixedLine: string
  isAddressesSame: string
}

export type AddressInput = {
  authorizedPerson: string
  city: string
  country: string
  district: string
  zipCode: string
  state: string
  address: string
  title: string
}

export interface AuthState {
  user: ActiveUser | null | undefined
  login: ({
    identifier,
    pwd,
  }: {
    identifier: string
    pwd: string
  }) => Promise<boolean>
  logout: () => Promise<any>
  loading: boolean
  error?: Error
  dispatch: Dispatch<AuthAction>
  refetchUser: () => Promise<any>
  address?: {
    shipping: {
      create: (address: AddressInput) => Promise<any>
      set: (address: Partial<AddressInput>) => Promise<any>
      isPending: boolean
    }
    billing: {
      create: (address: AddressInput) => Promise<any>
      set: (address: Partial<AddressInput>) => Promise<any>
      isPending: boolean
    }
  }
  company?: {
    set: (company: Partial<CompanyInput>) => Promise<any>
    isPending: boolean
  }
  userInfo?: {
    set: (userInfo: { name: string }) => Promise<any>
    isPending: boolean
  }
}

const INITIAL_STATE: AuthState = {
  user: undefined,
  loading: false,
  login: () => Promise.reject(),
  logout: () => Promise.reject(),
  refetchUser: () => Promise.reject(),
  dispatch: () => console.error('auth dispatch is empty'),
}

interface LoginParams {
  identifier: string
  pwd: string
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { showErrorMessage, showSuccessMessage } = useMessages()
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
  const { data, mutateAsync, isPending, error, isError, isSuccess } =
    useMutation<{
      accessToken?: string
      email: string
      name: string | null
      role: string
    } | null>()
  const {
    mutateAsync: shippingAddressMutate,
    isPending: isShippingAddressPending,
  } = useMutation<any>()
  const {
    mutateAsync: billingAddressMutate,
    isPending: isBillingAddressPending,
  } = useMutation<any>()
  const { mutateAsync: userInfoMutate, isPending: isUserInfoPending } =
    useMutation<any>()
  const { mutateAsync: companyMutate, isPending: isCompanyPending } =
    useMutation<any>()

  const setActiveUser = async () => {
    const activeUser = await getActiveUser()
    if (activeUser && !activeUser?.message)
      if (activeUser) dispatch({ type: 'SET_USER', payload: activeUser })
  }

  const login = async ({ identifier, pwd }: LoginParams) => {
    const data = await mutateAsync({
      path: '/auth/login',
      body: { email: identifier, password: pwd },
      method: 'POST',
    })

    if (data?.accessToken) {
      setActiveUser()

      return true
    }

    return false
  }

  const logout = async () => {
    return await mutateAsync({
      path: '/auth/logout',
      method: 'GET',
    })
  }

  const createShippingAddress = async (address: AddressInput) => {
    const activeUser = await shippingAddressMutate({
      path: '/active-user/address/shipping',
      body: address,
      method: 'POST',
    })

    if (activeUser && !activeUser.message)
      dispatch({ type: 'SET_USER', payload: activeUser })

    return activeUser
  }

  const setShippingAddress = async (address: Partial<AddressInput>) => {
    const activeUser = await shippingAddressMutate({
      path: '/active-user/address/shipping',
      body: address,
      method: 'PUT',
    })

    if (activeUser && !activeUser.message)
      dispatch({ type: 'SET_USER', payload: activeUser })

    return activeUser
  }

  const createBillingAddress = async (address: AddressInput) => {
    const activeUser = await billingAddressMutate({
      path: '/active-user/address/shipping',
      body: address,
      method: 'POST',
    })

    if (activeUser && !activeUser.message)
      dispatch({ type: 'SET_USER', payload: activeUser })

    return activeUser
  }

  const setBillingAddress = async (address: Partial<AddressInput>) => {
    const activeUser = await billingAddressMutate({
      path: '/active-user/address/shipping',
      body: address,
      method: 'PUT',
    })

    if (activeUser && !activeUser.message)
      dispatch({ type: 'SET_USER', payload: activeUser })

    return activeUser
  }

  const setUserInfo = async (userInfo: { name: string }) => {
    const activeUser = await billingAddressMutate({
      path: '/active-user/address/shipping',
      body: userInfo,
      method: 'PUT',
    })

    if (activeUser && !activeUser.message)
      dispatch({ type: 'SET_USER', payload: activeUser })

    return activeUser
  }

  const setUserCompany = async (companyInfo: Partial<CompanyInput>) => {
    const activeUser = await billingAddressMutate({
      path: '/active-user/address/shipping',
      body: companyInfo,
      method: 'PUT',
    })

    if (activeUser && !activeUser.message)
      dispatch({ type: 'SET_USER', payload: activeUser })

    return activeUser
  }

  useEffect(() => {
    if (!state.user) setActiveUser()
  }, [state, state.user])

  useEffect(() => {
    if (isError) {
      console.log({ error })
      showErrorMessage(error.message)
      return
    }

    if (isSuccess && data?.email) {
      showSuccessMessage('Successfully logged in')
      return
    }
  }, [isError, error, isSuccess])

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        refetchUser: setActiveUser,
        dispatch,
        logout,
        loading: isPending,
        address: {
          shipping: {
            create: createShippingAddress,
            set: setShippingAddress,
            isPending: isShippingAddressPending,
          },
          billing: {
            create: createBillingAddress,
            set: setBillingAddress,
            isPending: isBillingAddressPending,
          },
        },
        company: {
          set: setUserCompany,
          isPending: isCompanyPending,
        },
        userInfo: {
          set: setUserInfo,
          isPending: isUserInfoPending,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthenticatedUser = () => useContext(AuthContext)
