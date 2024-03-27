import Container from '@/components/common/container'
import { Separator } from '@/components/ui/separator'
import UserProfileSideNavigation from '@/features/user/components/user-profile-side-navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
}

const sidebarNavItems = [
  {
    title: 'Profile',
    href: '/profile',
  },
  {
    title: 'Company',
    href: '/profile/company',
  },
  {
    title: 'Addresses',
    href: '/profile/addresses',
  },
  {
    title: 'Offers',
    href: '/profile/offers',
  }
]

interface SettingsLayoutProps {
  children: React.ReactNode
}

export default function UserProfileLayout({ children }: SettingsLayoutProps) {
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
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <UserProfileSideNavigation items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </Container>
  )
}
