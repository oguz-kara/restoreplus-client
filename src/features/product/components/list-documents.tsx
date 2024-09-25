'use client'
import Typography from '@/components/ui/typography'
import { remoteUrl } from '@/config/get-env-fields'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { Locale } from '@/i18n/types'
import { Download, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function ListDocuments({
  documents,
  lang,
}: {
  documents: Document[]
  lang: Locale
}) {
  const { user, loading } = useAuthenticatedUser()
  const router = useRouter()

  const handleDownload = async (fileName: string) => {
    try {
      if (!loading && user) {
        const res = await fetch(`${remoteUrl}/${fileName}`) 
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
        router.push(`/${lang}/login`)
      }
    } catch (error) {
      console.error('Error downloading file:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="flex items-center bg-gray-100 p-10">
      <div className="flex gap-5 flex-wrap lg:w-full">
        {documents.map((document, i) => (
          <div
            onClick={async () => await handleDownload(document?.file.name)}
            className="cursor-pointer flex-1 flex items-start justify-start gap-2 bg-primary p-3"
            key={i}
          >
            <div>{user ? <Download /> : <Lock />}</div>
            <div>
              {user ? (
                <Typography
                  as="p"
                  key={document.id}
                  className="font-bold"
                  style={{ fontWeight: 'bold' }}
                >
                  İndir
                </Typography>
              ) : (
                <Typography
                  as="p"
                  key={document.id}
                  className="font-bold"
                  style={{ fontWeight: 'bold' }}
                >
                  İndirme için giriş yap
                </Typography>
              )}
              <Typography
                as="p"
                key={document.id}
                className="font-bold opacity-50"
                style={{ fontWeight: 'bold' }}
              >
                {document.translation.name}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
