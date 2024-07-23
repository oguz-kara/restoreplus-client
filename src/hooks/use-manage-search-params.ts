'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

export const useManageSearchParams = () => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const setSearchParam = ({ name, value }: { name: string; value: string }) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    if (Array.isArray(name) && Array.isArray(value)) {
      name.forEach((name, i) => {
        if (!value[i]) current.delete(name)
        else current.set(name, value[i])
      })

      const search = current.toString()

      const searchparam = search ? `?${search}` : ''

      router.push(pathname + searchparam)
    } else if (typeof name === 'string' && typeof value === 'string') {
      if (!value || value === '') current.delete(name)
      else current.set(name, value)

      const search = current.toString()

      const searchparam = search ? `?${search}` : ''

      router.push(pathname + searchparam)
    }
  }

  const deleteSearchParam = ({ name }: { name: string | string[] }) => {
    if (Array.isArray(name)) {
      // @ts-ignore
      const current = new URLSearchParams(Array.from(searchParams.entries()))

      name.forEach((name) => {
        current.delete(name)
      })

      const search = current.toString()

      const searchparam = search ? `?${search}` : ''

      router.push(pathname + searchparam)

      return
    }

    // @ts-ignore
    const current = new URLSearchParams(Array.from(searchParams.entries()))

    current.delete(name)

    const search = current.toString()

    const searchparam = search ? `?${search}` : ''

    router.push(pathname + searchparam)
  }

  return { setSearchParam, deleteSearchParam, searchParams }
}
