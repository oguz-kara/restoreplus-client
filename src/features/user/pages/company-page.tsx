import { Separator } from '@/components/ui/separator'
import { CompanyForm } from '../components/company-form'
import { PropsWithLang } from '@/i18n/types'
import { getServerSideActiveUser } from '@/utils/get-server-side-active-user'
import { CompanyFormData } from '../schema/company.schema'
import { getDictionary } from '@/i18n/get-dictionary'

export default async function ProfileCompanyPage({ lang }: PropsWithLang) {
  const dict = await getDictionary(lang)
  const user = await getServerSideActiveUser()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{dict.profile.company_text}</h3>
        <p className="text-sm text-muted-foreground">
          {dict.profile.company_description}
        </p>
      </div>
      <Separator />
      <CompanyForm
        initialUserCompanyInfo={user?.company as CompanyFormData | null}
      />
    </div>
  )
}
