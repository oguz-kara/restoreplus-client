import { PropsWithLang } from '@/i18n/types'
import Typography from '../ui/typography'
import Link from '../ui/link'
import Container from '../common/container'
import { getDictionary } from '@/i18n/get-dictionary'
import TermsConditionsPrivacyText from '../common/term-conditions-privacy'

export default async function Footer({
  lang,
  categoryData,
}: PropsWithLang & { categoryData: CategoryData | null }) {
  if (!categoryData) return 'No category data found!'
  const {
    layout: { footer },
  } = await getDictionary(lang)

  const { data } = categoryData

  return (
    <footer className="px-5 py-10 bg-foreground text-white">
      <Container>
        <div className="grid lg:grid-cols-6">
          {data.map((category, i) => (
            <div key={i}>
              <Link
                lang={lang}
                href={`/${category.blogPostCategoryTranslation.name}`}
              >
                <Typography as="h6" className="pb-5 text-lg">
                  {category.blogPostCategoryTranslation.name}
                </Typography>
              </Link>
              <ul className="mb-5">
                {category.subCategories.slice(0, 10).map((item, i) => (
                  <li key={i} className="pb-1">
                    <Link
                      lang={lang}
                      href={`/${item.blogPostCategoryTranslation.name}`}
                    >
                      <Typography as="p" className="text-md">
                        {item.blogPostCategoryTranslation.name}
                      </Typography>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <Link lang={lang} href={`/`}>
              <Typography as="h6" className="pb-5 text-lg">
                {footer.title}
              </Typography>
            </Link>
            <ul className="mb-5">
              {footer.links.map((item, i) => (
                <li key={i} className="pb-1">
                  <Link lang={lang} href={`/${item.title}`}>
                    <Typography as="p" className="text-md">
                      {item.title}
                    </Typography>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <TermsConditionsPrivacyText lang={lang} />
      </Container>
    </footer>
  )
}
