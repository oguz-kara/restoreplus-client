'use client'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { PropsWithLang } from '@/i18n/types'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useState } from 'react'
import ShouldLoginModal from './should-login-modal'
import { useDisclosure } from '@/hooks/use-disclosure'

export default function DownloadDocument({
  children,
  filename,
  lang,
}: PropsWithChildren & { filename: string } & PropsWithLang) {
  const { user, loading } = useAuthenticatedUser()
  const [isOpen, setOpen] = useState<boolean>(false)
  const router = useRouter()

  const handleDownload = async (fileName: string) => {
    try {
      if (!loading && user) {
        const res = await fetch(
          `http://localhost:5000/api/download/${fileName}`
        ) // Adjust the URL as per your server route
        if (!res.ok) {
          throw new Error('Failed to download file')
        }
        const blob = await res.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      } else {
        setOpen(true)
      }
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  return (
    <>
      <ShouldLoginModal open={isOpen} onOpenChange={(val) => setOpen(val)} />
      <div onClick={() => handleDownload(filename)}>{children}</div>
    </>
  )
}
