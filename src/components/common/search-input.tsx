'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Input } from '../ui/input'

interface SearchInputProps {
  placeholder?: string
}

export default function SearchInput({ placeholder = 'Ara' }: SearchInputProps) {
  const [q, setQ] = useState<string>('')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const url = q ? `${pathname}/?q=${q}` : pathname
    router.push(url)
  }, [q, pathname, router])

  return (
    <Input
      className="mb-3"
      type="text"
      value={q}
      onChange={(e) => {
        setQ(e.target.value)
      }}
      placeholder={placeholder}
    />
  )
}
