import { Separator } from '@/components/ui/separator'
import { CompanyForm } from '../components/company-form'
import { PropsWithLang } from '@/i18n/types'
import { getDictionary } from '@/i18n/get-dictionary'

export default async function ProfileCompanyPage({ lang }: PropsWithLang) {
  const {
    profile: { company },
  } = await getDictionary(lang)
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{company.title}</h3>
        <p className="text-sm text-muted-foreground">{company.description}</p>
      </div>
      <Separator />
      <CompanyForm />
    </div>
  )
}
