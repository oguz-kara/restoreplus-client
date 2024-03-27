'use client'

import { Separator } from '@/components/ui/separator'
import { ProfileForm } from '../components/profile-form'
import { useDictionary } from '@/context/use-dictionary'

export default function ProfilePage() {
  const {
    dictionary: {
      profile: { account },
    },
  } = useDictionary()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{account.title}</h3>
        <p className="text-sm text-muted-foreground">{account.description}</p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}
