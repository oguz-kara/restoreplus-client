import { Separator } from '@/components/ui/separator'
import { CompanyForm } from '../components/company-form'
import { PropsWithLang } from '@/i18n/types'
import { getDictionary } from '@/i18n/get-dictionary'
import { getServerSideActiveUser } from '@/utils/get-server-side-active-user'
import { CompanyFormData } from '../schema/company.schema'

export default async function ProfileCompanyPage({ lang }: PropsWithLang) {
  const {
    profile: { company },
  } = await getDictionary(lang)
  const user = await getServerSideActiveUser()

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{company.title}</h3>
        <p className="text-sm text-muted-foreground">{company.description}</p>
      </div>
      <Separator />
      <CompanyForm
        initialUserCompanyInfo={user?.company as CompanyFormData | null}
      />
    </div>
  )
}
