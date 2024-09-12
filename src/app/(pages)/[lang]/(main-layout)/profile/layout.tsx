import Container from '@/components/common/container'
import { Button } from '@/components/ui/button'
import Link from '@/components/ui/link'
import { Separator } from '@/components/ui/separator'
import UserProfileSideNavigation from '@/features/user/components/user-profile-side-navigation'
import { getDictionary } from '@/i18n/get-dictionary'
import { ParamsWithLang } from '@/i18n/types'
import { getServerSideActiveUser } from '@/utils/get-server-side-active-user'
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

const links = [
  {
    href: '/profile',
  },
  {
    href: '/profile/company',
  },
  {
    href: '/profile/addresses',
  },
  {
    href: '/create-order',
    forB2B: true,
  },
  {
    href: '/profile/orders',
    forB2B: true,
  },
]

export default async function UserProfileLayout({
  children,
  params: { lang },
}: SettingsLayoutProps & ParamsWithLang) {
  const user = await getServerSideActiveUser()
  const dict = await getDictionary(lang)

  const sideNavigationItems = [
    dict.common.profile_text,
    dict.profile.company_text,
    dict.common.addresses_text,
    dict.checkout.create_order_button_text,
    dict.common.orders_text,
  ]

  const sideItems = sideNavigationItems
    .map((item, i) => ({
      title: item,
      ...links[i],
      icon: icons[i],
    }))
    .filter((item, i) =>
      links[i].forB2B ? (user?.company?.b2bCustomer ? true : false) : true
    )

  return (
    <Container>
      <div className="space-y-6 p-10 pb-16">
        <div className="flex justify-between">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">
              {dict.common.welcome_text}, {user?.name}
            </h2>
            <p className="text-muted-foreground">
              {dict.profile.manage_your_account_description}
            </p>
          </div>
          {!user?.company?.b2bCustomer && (
            <div>
              <Link href="/partner-register" lang={lang}>
                <Button>{dict.common.partner_with_us_text}</Button>
              </Link>
            </div>
          )}
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0 ">
          <aside className="-mx-4 lg:w-1/5">
            <UserProfileSideNavigation lang={lang} items={sideItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </Container>
  )
}
