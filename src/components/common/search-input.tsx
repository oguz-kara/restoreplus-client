'use client'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'

interface SearchInputProps {
  placeholder?: string
}

export default function SearchInput({
  placeholder = 'Ara',
  className,
}: SearchInputProps & PropsWithClassName) {
  const [q, setQ] = useState<string>('')
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const url = q ? `${pathname}/?q=${q}` : pathname
    router.push(url)
  }, [q])

  return (
    <Input
      className={cn('mb-3', className)}
      type="text"
      value={q}
      onChange={(e) => {
        setQ(e.target.value)
      }}
      placeholder={placeholder}
    />
  )
}
