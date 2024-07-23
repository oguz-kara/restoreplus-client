'use client'
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { AuthReducer, AuthAction } from './auth-reducer'
import { getActiveUser } from '@/features/auth/api/active-user'
import { useMutation } from '@/hooks/use-mutation'
import useMessages from '@/hooks/use-messages'

export type LoginValues = {
  email: string
  password: string
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
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthenticatedUser = () => useContext(AuthContext)
