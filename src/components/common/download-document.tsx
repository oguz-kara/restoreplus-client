'use client'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { PropsWithLang } from '@/i18n/types'
import { PropsWithChildren, useState } from 'react'
import ShouldLoginModal from './should-login-modal'
import { useActiveOrder } from '@/features/active-order/context/use-active-order'
import { remoteUrl } from '@/config/get-env-fields'

export default function DownloadDocument({
  children,
  filename,
}: PropsWithChildren & { filename: string } & PropsWithLang) {
  const { user, loading } = useAuthenticatedUser()
  const [isOpen, setOpen] = useState<boolean>(false)
  const {} = useActiveOrder()

  const handleDownload = async (fileName: string) => {
    try {
      if (!loading && user) {
        const res = await fetch(`${remoteUrl}/api/download/${fileName}`) // Adjust the URL as per your server route
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
