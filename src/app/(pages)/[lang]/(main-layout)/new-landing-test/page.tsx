import HeroSection from '@/components/pages/index/hero-section'
import WhereToUseSection from '@/components/pages/index/where-to-use-section'
import { ParamsWithLang } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'

export default async function page({ params: { lang } }: ParamsWithLang) {
  const { data } = await sdk.applicationScopes.getAllByQuery(
    { take: '5' },
    { lang }
  )

  return (
    <div>
      <HeroSection lang={lang} />
      <WhereToUseSection lang={lang} applicationScopes={data} />
    </div>
  )
}
