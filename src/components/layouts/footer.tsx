import { PropsWithLang } from '@/i18n/types'
import Typography from '../ui/typography'
import Link from '../ui/link'
import Container from '../common/container'
import { getDictionary } from '@/i18n/get-dictionary'
import TermsConditionsPrivacyText from '../common/term-conditions-privacy'
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'
import ContactForm from '@/features/contact/components/contact-form'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

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
  const {
    common,
    layout: { footer },
  } = await getDictionary(lang)

  return (
    <footer className="px-5 bg-foreground text-white bg-gradient-to-r from-[#1e1e27] to-[#313140]">
      <Container>
        <div className="grid lg:grid-cols-2">
          <div className="py-10">
            <div>
              <Link lang={lang} href={`/contact`}>
                <Typography as="h6" className="text-xl pb-5 uppercase">
                  {footer.title}
                </Typography>
              </Link>
              <ul className="mb-5">
                {footer.links.map((item, i) => (
                  <li key={i} className="pb-3">
                    <Typography as="p" className="text-sm text-gray-500">
                      {item.title}
                    </Typography>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Link lang={lang} href={`/`}>
                <Typography as="h6" className="text-xl pb-5 uppercase">
                  {footer.followUsTitle}
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
              {common.getTheLatestInfo}
            </Typography>
            <div>
              <Input
                type="email"
                className={cn(
                  'bg-transparent py-3 rounded-sm border border-gray-400 text-black mb-2 bg-white'
                )}
                placeholder="Enter your email address"
              />
              <Button
                className="font-semibold"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(255,217,0,1) 0%, rgba(255,221,33,1) 35%, rgba(255,225,51,1) 100%)',
                }}
              >
                Register for industiry news
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
