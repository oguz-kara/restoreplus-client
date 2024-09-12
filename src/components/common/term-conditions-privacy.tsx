import { getDictionary } from '@/i18n/get-dictionary'
import { PropsWithLang } from '@/i18n/types'
import Typography from '../ui/typography'
import Link from '../ui/link'

export default async function TermConditionsPrivacy({
  lang,
  className,
}: PropsWithLang & PropsWithClassName) {
  const dict = await getDictionary(lang)

  return (
    <div>
      <Typography as="p" className={className}>
        <span>
          {dict.footer.all_rights_reserver_text}
          {` `}
        </span>
        <span className="underline text-blue-500">
          <Link href="/terms-and-conditions" lang={lang}>
            {dict.footer.terms_and_conditions_text}
          </Link>
        </span>
        {` `}
        <span>{'or (not translated)'}</span>
        {` `}
        <span className="underline text-blue-500">
          <Link href="/privacy" lang={lang}>
            {dict.footer.privacy_statement_text}
          </Link>
        </span>
      </Typography>
    </div>
  )
}
