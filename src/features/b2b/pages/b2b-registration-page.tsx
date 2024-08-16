import Container from '@/components/common/container'
import Typography from '@/components/ui/typography'
import B2BRegistrationStepper from '../components/b2b-registration-stepper'
import Logo from '@/components/common/logo'
import { getDictionary } from '@/i18n/get-dictionary'
import { Locale } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'
import { ApplicantRegistrationResponseData } from '../types'

export default async function B2bRegistrationPage({
  lang,
  token,
}: {
  lang: Locale
  token?: string
}) {
  const { b2bCompleteRegistrationPage } = await getDictionary(lang)
  const userInfo = (await sdk.b2b.getAcceptedRegisterRequestByToken(
    token
  )) as ApplicantRegistrationResponseData | null

  return (
    <div className="mx-5">
      <Container className="py-5">
        <div className="flex items-center justify-center py-5">
          <Logo color="black" width={120} height={120} />
        </div>
        <Typography className="text-3xl font-semibold mb-5" as="h1">
          {b2bCompleteRegistrationPage.pageTitle}
        </Typography>
        <B2BRegistrationStepper lang={lang} registrationInfo={userInfo} />
      </Container>
    </div>
  )
}
