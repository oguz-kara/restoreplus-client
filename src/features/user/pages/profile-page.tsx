import { Separator } from '@/components/ui/separator'
import { ProfileForm } from '../components/profile-form'
import { getServerSideActiveUser } from '@/utils/get-server-side-active-user'
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale } from '@/i18n/types'

export default async function ProfilePage({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang)

  const user = await getServerSideActiveUser()

  const profileData = {
    name: user?.name,
    email: user?.email,
    password: '',
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{dict.profile.account_text}</h3>
        <p className="text-sm text-muted-foreground">
          {dict.profile.account_description}
        </p>
      </div>
      <Separator />
      <ProfileForm initialProfileFormData={profileData} />
    </div>
  )
}
