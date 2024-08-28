'use client'
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { AuthReducer, AuthAction } from './auth-reducer'
import { useMutation } from '@/hooks/use-mutation'
import useMessages from '@/hooks/use-messages'
import { RegisterFormDataType } from '@/features/auth/schema/register.schema'
import { useRouter } from 'next/navigation'

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
  login: {
    loginUser: ({
      identifier,
      pwd,
    }: {
      identifier: string
      pwd: string
    }) => Promise<boolean>
    isPending: boolean
    isSuccess: boolean
    error: any
    isError: boolean
  }
  register: {
    registerUser: (userInfo: RegisterFormDataType) => Promise<any>
    isPending: boolean
    isSuccess: boolean
    isError: boolean
  }
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
  login: {
    loginUser: () => Promise.reject(),
    isSuccess: false,
    isPending: false,
    isError: false,
    error: null,
  },
  logout: () => Promise.reject(),
  register: {
    registerUser: () => Promise.reject(),
    isError: false,
    isPending: false,
    isSuccess: false,
  },
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
  const router = useRouter()
  const { showErrorMessage, showSuccessMessage } = useMessages()
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
  const {
    data: activeUserData,
    mutateAsync: activeUserMutation,
    isPending: isActiveUserPending,
    isSuccess: isActiveUserSuccess,
    isError: isActiveUserError,
  } = useMutation()
  const {
    mutateAsync: registerMutation,
    isPending: isRegisterPending,
    isSuccess: isRegisterSuccess,
    isError: isRegisterError,
  } = useMutation()
  const {
    data,
    mutateAsync,
    isPending,
    error,
    isError,
    isSuccess,
    failureReason,
  } = useMutation<{
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

  const getActiveUser = async () => {
    const activeUser: any = await activeUserMutation({
      method: 'GET',
      path: '/active-user',
    })

    if (!activeUser || activeUser.message) return false

    return activeUser
  }

  const setActiveUser = async () => {
    try {
      const activeUser = await getActiveUser()
      if (activeUser && !activeUser?.message)
        if (activeUser) dispatch({ type: 'SET_USER', payload: activeUser })
    } catch (err: any) {
      console.log({ errorWhenSetActiveUser: err })
    }
  }

  const login = async ({ identifier, pwd }: LoginParams) => {
    const data = await mutateAsync({
      path: '/auth/login',
      body: { email: identifier, password: pwd },
      method: 'POST',
    })

    if (data?.accessToken) {
      setActiveUser()
      location.reload()
      return true
    }

    return false
  }

  const logout = async () => {
    const result = await mutateAsync({
      path: '/auth/logout',
      method: 'GET',
    })

    if (result) {
      location.reload()
    }

    return result
  }

  const registerUser = async (userInfo: RegisterFormDataType) => {
    return await registerMutation({
      path: '/auth/register',
      body: userInfo,
      method: 'POST',
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
      path: '/active-user/address/billing',
      body: address,
      method: 'POST',
    })

    if (activeUser && !activeUser.message)
      dispatch({ type: 'SET_USER', payload: activeUser })

    return activeUser
  }

  const setBillingAddress = async (address: Partial<AddressInput>) => {
    const activeUser = await billingAddressMutate({
      path: '/active-user/address/billing',
      body: address,
      method: 'PUT',
    })

    if (activeUser && !activeUser.message)
      dispatch({ type: 'SET_USER', payload: activeUser })

    return activeUser
  }

  const setUserInfo = async (userInfo: { name: string }) => {
    const activeUser = await userInfoMutate({
      path: '/active-user',
      body: userInfo,
      method: 'PUT',
    })

    if (activeUser && !activeUser.message)
      dispatch({ type: 'SET_USER', payload: activeUser })

    return activeUser
  }

  const setUserCompany = async (companyInfo: Partial<CompanyInput>) => {
    const activeUser = await companyMutate({
      path: '/active-user/company',
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
        login: {
          loginUser: login,
          isPending: isPending,
          isSuccess,
          isError,
          error,
        },
        refetchUser: setActiveUser,
        dispatch,
        logout,
        register: {
          registerUser,
          isPending: isRegisterPending,
          isSuccess: isRegisterSuccess,
          isError: isRegisterError,
        },
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
