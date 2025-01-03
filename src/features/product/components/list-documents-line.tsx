'use client'
import Typography from '@/components/ui/typography'
import { remoteUrl } from '@/config/get-env-fields'
import { useAuthenticatedUser } from '@/context/auth/auth-context'
import { Locale } from '@/i18n/types'
import { Download, Lock } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function ListDocumentsLine({
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
        const res = await fetch(`${remoteUrl}/uploads/files/${fileName}`)
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
    <div>
      <div className="flex flex-col md:flex-row md:flex-wrap gap-5 lg:w-full">
        {documents.map((document, i) => (
          <div
            onClick={async () => await handleDownload(document?.file.name)}
            className="cursor-pointer flex items-start justify-start gap-2 bg-gray-100 p-3"
            key={i}
          >
            <div className="flex items-center justify-center">
              {user ? <Download /> : <Lock />}
            </div>
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
