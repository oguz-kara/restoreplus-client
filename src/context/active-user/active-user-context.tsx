'use client'
import { createContext, useContext, useState } from 'react'
import _ from 'lodash'
import { clientFetcher } from '@/lib/client-fetcher'

export interface ActiveUserState {
  activeUser: ActiveUser | undefined
}

const INITIAL_STATE: ActiveUserState = {
  activeUser: undefined,
}

// need to hold a date for the future to refresh the token
// when the timer ends it should automatically refresh the token
// after refresh the token it should set the new token and the new date

export const ActiveUserContext = createContext(INITIAL_STATE)

export const ActiveUserContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [activeUser, setActiveUser] = useState<ActiveUser | undefined>(
    undefined
  )
  const [dateToRefreshToken, setDateToRefreshToken] = useState<
    Date | undefined
  >(undefined)

  const getAndSetActiveUser = async () => {
    const { data } = await clientFetcher('/active-user')
  }

  return (
    <ActiveUserContext.Provider value={{ activeUser: undefined }}>
      {children}
    </ActiveUserContext.Provider>
  )
}

export const useActiveUser = () => useContext(ActiveUserContext)
