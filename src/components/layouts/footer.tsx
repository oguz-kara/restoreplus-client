import { PropsWithLang } from '@/i18n/types'
import Typography from '../ui/typography'
import Link from '../ui/link'
import Container from '../common/container'
import { getDictionaryV2 } from '@/i18n/get-dictionary'
import TermsConditionsPrivacyText from '../common/term-conditions-privacy'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import RegisterEmail from '../common/register-email'

const socials = [
  {
    href: '/',
    icon: <Instagram />,
  },
  {
    href: '/',
    icon: <Twitter />,
  },
  {
    href: '/',
    icon: <Youtube />,
  },
  {
    href: '/',
    icon: <Facebook />,
  },
  {
    href: '/',
    icon: <Linkedin />,
  },
]

export default async function Footer({ lang }: PropsWithLang) {
  const dict = await getDictionaryV2(lang)

  return (
    <footer className="px-5 bg-foreground text-white bg-gradient-to-r from-[#1e1e27] to-[#313140]">
      <Container>
        <div className="grid lg:grid-cols-2">
          <div className="py-10">
            <div>
              <Link lang={lang} href={`/contact`}>
                <Typography as="h6" className="text-xl pb-5 uppercase">
                  {dict.common.contact_us_text}
                </Typography>
              </Link>
              <ul className="mb-5">
                <li className="pb-3">
                  <Typography as="p" className="text-sm text-gray-500">
                    {dict.footer.fixed_line_text}
                  </Typography>
                </li>
                <li className="pb-3">
                  <Typography as="p" className="text-sm text-gray-500">
                    {dict.footer.mobile_phone_text}
                  </Typography>
                </li>
                <li className="pb-3">
                  <Typography as="p" className="text-sm text-gray-500">
                    {dict.footer.email_address_text}
                  </Typography>
                </li>
                <li className="pb-3">
                  <Typography as="p" className="text-sm text-gray-500">
                    {dict.footer.address_text}
                  </Typography>
                </li>
              </ul>
            </div>
            <div>
              <Link lang={lang} href={`/`}>
                <Typography as="h6" className="text-xl pb-5 uppercase">
                  {dict.footer.follow_us_text}
                </Typography>
              </Link>
              <ul className="flex gap-5 mb-5">
                {socials.map((item, i) => (
                  <li key={i} className="pb-3">
                    <Link lang={lang} href={`/${item.href}`}>
                      {item.icon}
                    </Link>
                  </li>
                ))}
              </ul>
              <TermsConditionsPrivacyText lang={lang} />
            </div>
          </div>
          <div className="hidden lg:block py-10">
            <Typography as="h6" className="text-xl pb-5 uppercase">
              {dict.footer.get_the_latest_information_text}
            </Typography>
            <RegisterEmail />
          </div>
        </div>
      </Container>
    </footer>
  )
}
