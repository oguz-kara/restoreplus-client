import Container from '@/components/common/container'
import { Separator } from '@/components/ui/separator'
import UserProfileSideNavigation from '@/features/user/components/user-profile-side-navigation'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import {
  BaggageClaim,
  Building2,
  NotebookTabs,
  ShoppingBag,
  User,
} from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
}

interface SettingsLayoutProps {
  children: React.ReactNode
}

const icons = [
  <User key={1} />,
  <Building2 key={2} />,
  <NotebookTabs key={3} />,
  <ShoppingBag key={4} />,
  <BaggageClaim key={5} />,
]

export default async function UserProfileLayout({
  children,
  params: { lang },
}: SettingsLayoutProps & ParamsWithLang) {
  const {
    profile: { sideNavigationItems, header },
  } = await getDictionary(lang)

  const sideItems = sideNavigationItems.map((item, i) => ({
    ...item,
    icon: icons[i],
  }))

  return (
    <Container>
      <div className="space-y-6 p-10 pb-16">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 ">
          <aside className="-mx-4 lg:w-1/5">
            <UserProfileSideNavigation items={sideItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </Container>
  )
}
