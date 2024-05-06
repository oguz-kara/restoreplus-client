import { getSeoPageByPathnameAndLocale } from '@/features/seo-pages/api/get-seo-page-by-pathname-and-locale'
import ProfilePage from '@/features/user/pages/profile-page'
import { Metadata } from 'next'

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const lang = params.lang

  const seoData = await getSeoPageByPathnameAndLocale('/profile', lang)

  return seoData
}

export default function Page() {
  return (
    <div>
      <ProfilePage />
    </div>
  )
}
