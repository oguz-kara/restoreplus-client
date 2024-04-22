import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import Typography from '../ui/typography'
import Link from '../ui/link'

export default async function TermConditionsPrivacy({
  lang,
  className,
}: PropsWithLang & PropsWithClassName) {
  const {
    common,
    layout: {
      footer: { copyright },
    },
  } = await getDictionary(lang)

  return (
    <div>
      <Typography as="p" className={className}>
        <span>
          {copyright.reconciliations.text}
          {` `}
        </span>
        <span className="underline text-blue-500">
          <Link href="/terms-and-conditions" lang={lang}>
            {copyright.reconciliations.termsAndConditions}
          </Link>
        </span>
        {` `}
        <span>{common.or}</span>
        {` `}
        <span className="underline text-blue-500">
          <Link href="/privacy" lang={lang}>
            {copyright.reconciliations.privacy}
          </Link>
        </span>
      </Typography>
    </div>
  )
}
