'use client'
import {
  Dispatch,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { AuthReducer, AuthAction } from './auth-reducer'
import { clientFetcher } from '@/lib/client-fetcher'
import _ from 'lodash'

export type LoginValues = {
  email: string
  password: string
}

export interface AuthState {
  user: ActiveUser | null | undefined
  loading: boolean
  error?: Error
  dispatch: Dispatch<AuthAction>
  logout: () => Promise<{ success: boolean }>
  refetchUser: () => Promise<any>
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
  refetchUser: () => Promise.reject(),
  dispatch: () => console.error('auth dispatch is empty'),
}

export const AuthContext = createContext(INITIAL_STATE)

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
  const twoMinutesInMillis = 2 * 60 * 1000

  const setTokenToLocalStorage = (token: string) => {
    localStorage.setItem('token', token)
  }

  const getUser = async (token?: string) => {
    const authToken = token ? token : localStorage.getItem('token')
    const activeUser = await clientFetcher('/active-user', {
      headers: { authorization: `Bearer ${authToken}` },
    })

    return activeUser
  }

  const setUser = (user: ActiveUser | null) => {
    dispatch({ type: 'SET_USER', payload: user })
  }

  const getAndSetUser = useCallback(async (token?: string) => {
    if (token) {
      const user = await getUser(token)
      if (!user) setUser(null)
      else {
        setTokenToLocalStorage(token)
        setUser(user)
      }
    } else {
      console.error('auth token not found in local storage!')
      setUser(null)
    }
  }, [])

  async function login({ email, password }: LoginValues) {
    try {
      const data = await clientFetcher('/auth/login', {
        body: JSON.stringify({ email, password }),
        method: 'POST',
      })

      if (data.user) {
        const refreshDate = Date.now() + twoMinutesInMillis - 10000
        localStorage.setItem('refresh-date', refreshDate.toString())
        await getAndSetUser(data.accessToken)
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

  useEffect(() => {
    const { user } = state
    let interval: any = undefined

    const getInitialUser = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        await getAndSetUser(token)
      }
    }
    if (!user) getInitialUser()

    const refreshToken = async () => {
      const { data } = await clientFetcher('/refresh')
      console.log(data)
      if (data) {
        const { accessToken } = data

        if (accessToken) {
          const refreshDate = Date.now() + twoMinutesInMillis - 10000
          localStorage.setItem('token', accessToken)
          localStorage.setItem('refresh-date', refreshDate.toString())
        } else localStorage.removeItem('token')
      }
    }

    const refreshDate = localStorage.getItem('refresh-date')

    if (refreshDate && user) {
      const refreshTime = Number(refreshDate) - Date.now()
      const refreshTimeInMillis = refreshTime < 0 ? 0 : refreshTime

      interval = setInterval(async () => {
        await refreshToken()
      }, refreshTimeInMillis)

      return () => clearInterval(interval)
    }
    if (!user && interval) return () => clearInterval(interval)
  }, [state.user, state, twoMinutesInMillis, getAndSetUser])

  return (
    <AuthContext.Provider
      value={{ ...state, logout, refetchUser: getAndSetUser, login, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthenticateUser = () => useContext(AuthContext)
