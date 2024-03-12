'use client'
import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { AuthReducer, AuthAction } from './AuthReducer'
import { clientFetcher } from '@/lib/client-fetcher'
import { useCookies } from 'react-cookie'
import _ from 'lodash'

export type LoginValues = {
  email: string
  password: string
}

export interface AuthState {
  user: User | null | undefined
  loading: boolean
  error?: Error
  dispatch: Dispatch<AuthAction>
  logout: () => Promise<{ success: boolean }>
  login: ({
    email,
    password,
  }: LoginValues) => Promise<{ success: boolean; user: User | null }>
}

const INITIAL_STATE: AuthState = {
  user: undefined,
  loading: false,
  logout: () => Promise.reject({ success: false }),
  login: () => Promise.reject({ success: false, user: null }),
  dispatch: () => console.error('auth dispatch is empty'),
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
  const [cookies, setCookie] = useCookies(['user', 'token'])

  useEffect(() => {
    if (cookies.user) dispatch({ type: 'SET_USER', payload: cookies.user })
  }, [cookies.user])

  useEffect(() => {
    const timeout = setTimeout(async () => {
      const { data } = await clientFetcher('/refresh')
      if (data.accessToken) setCookie('token', data.accessToken)
    }, 60 * 2 * 1000)

    return () => clearTimeout(timeout)
  }, [cookies])

  async function login({ email, password }: LoginValues) {
    try {
      const data = await clientFetcher('/auth/login', {
        body: JSON.stringify({ email, password }),
        method: 'POST',
      })
      if (data.user) {
        dispatch({ type: 'SET_USER', payload: data.user })
        setCookie('user', data.user, { maxAge: 24 * 60 * 60 * 1000 })
        setCookie('token', data.accessToken, { maxAge: 60 * 2 * 1000 })
        return { success: true, user: data.user }
      }
      return { success: false, user: null }
    } catch (error: any) {
      console.log({ error })
      return { success: false, user: null }
    }
  }

  async function logout() {
    try {
      dispatch({ type: 'LOADING' })
      const { data } = await clientFetcher('/auth/local', {
        method: 'DELETE',
      })
      if (data.success) {
        dispatch({ type: 'LOGOUT' })
        return { success: true }
      }
      return { success: false }
    } catch (err: any) {
      dispatch({ type: 'SET_ERROR', payload: err })
      return { success: false }
    } finally {
      dispatch({ type: 'LOADED' })
    }
  }

  return (
    <AuthContext.Provider value={{ ...state, logout, login, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthenticateUser = () => useContext(AuthContext)
