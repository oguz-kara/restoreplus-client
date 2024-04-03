'use client'
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { AuthReducer, AuthAction } from './auth-reducer'
import Cookies from 'js-cookie'
import _ from 'lodash'
import { refreshToken } from '@/features/auth/api/refresh-user'
import { getActiveUser } from '@/features/auth/api/active-user'
import { loginUser } from '@/features/auth/api/login-user'

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
  loading: boolean
  error?: Error
  dispatch: Dispatch<AuthAction>
  refetchUser: () => Promise<any>
}

const INITIAL_STATE: AuthState = {
  user: undefined,
  loading: false,
  login: () => Promise.reject(),
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
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  const setActiveUser = async () => {
    const activeUser = await getActiveUser()

    if (activeUser) dispatch({ type: 'SET_USER', payload: activeUser })
  }

  const login = async ({ identifier, pwd }: LoginParams) => {
    const isLoggedIn = await loginUser({ identifier, pwd })

    if (isLoggedIn) {
      await setActiveUser()
      return true
    }

    return false
  }

  useEffect(() => {
    const refreshTimeout = async () => {
      const success = await refreshToken()
      if (success) await setActiveUser()
      else dispatch({ type: 'SET_USER', payload: null })
    }

    if (!state.user) setActiveUser()
    const expiresDateString = Cookies.get('token_expires')
    if (expiresDateString) {
      const expiresDate = new Date(expiresDateString)
      const refreshTime = expiresDate.getTime() - Date.now() - 10000
      
      const timeoutMilliseconds = refreshTime > 0 ? refreshTime : 0

      const timeout = setTimeout(refreshTimeout, timeoutMilliseconds)
      return () => clearTimeout(timeout)
    }
  }, [state, state.user])

  return (
    <AuthContext.Provider
      value={{ ...state, login, refetchUser: setActiveUser, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthenticatedUser = () => useContext(AuthContext)
