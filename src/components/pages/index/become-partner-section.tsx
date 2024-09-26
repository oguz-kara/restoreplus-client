import Container from '@/components/common/container'
import { Button } from '@/components/ui/button'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { SupportedLocale } from '@/i18n'
import { getDictionary } from '@/i18n/get-dictionary'

export default async function BecomePartnerSection({
  lang,
}: {
  lang: SupportedLocale
}) {
  const dict = await getDictionary(lang)

  return (
    <section>
      <div className="relative h-[500px]">
        <div className="bg-white h-[100px]"></div>
        <div className="bg-gradient-to-r from-[#1e1e27] to-[#313140] h-full"></div>
        <div className="absolute left-2 right-2 top-0 bottom-0 ">
          <Container>
            <div
              className="w-full h-[60vh]"
              style={{
                background:
                  'url(/images/become-partner-image.jpg) no-repeat center center/cover',
                backgroundSize: 'cover',
              }}
            >
              <div
                className="relative h-full top-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(250, 183, 0, 1) 0%, rgba(250, 183, 0, 0.3) 50%, rgba(31, 31, 31, 0.6) 100%)',
                }}
              >
                <div className="py-10 px-5 lg:py-20">
                  <div className="mb-10">
                    <Typography
                      className="text-primary text-4xl lg:text-[5rem] lg:leading-[85px] font-semibold font-barlowCondensed uppercase"
                      as="h2"
                    >
                      {dict.index.section_partner_title_1} <br />{' '}
                      <span className="text-white">
                        {dict.index.section_partner_title_2}
                      </span>
                    </Typography>
                  </div>
                  <Link href="/product/finder" lang={lang}>
                    <Button
                      variant="bright-accent"
                      className="rounded-none lg:px-10 lg:py-7"
                      size="lg"
                    >
                      {dict.index.section_partner_button_text}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </section>
  )
}
