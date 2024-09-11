import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import Container from '@/components/common/container'
import { PropsWithLang } from '@/i18n/types'
import { sdk } from '@/restoreplus-sdk'
import { consoleLog } from '@/utils/log-to-console'
import { blogPostCategoryQuery } from '../query'

export default async function ListCategories({ lang }: PropsWithLang) {
  const result = await sdk.blogPostCategories.getAllByQuery(
    blogPostCategoryQuery,
    { lang }
  )

  consoleLog({ result })

  if (!result) return 'no category found!'

  const { data } = result

  return (
    <div className="max-w-[1024px] mx-auto px-10 pb-20">
      {data.map((topCategory: BlogPostCategory, i: number) => (
        <div key={i}>
          <div>
            <Typography
              className="uppercase my-10 border-b border-gray-200"
              as="h3"
            >
              {topCategory.translation.name}
            </Typography>
            <Container>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {topCategory.subCategories.map((subCategory, i) => (
                  <div key={i} className="flex items-start flex-col">
                    <Link
                      href={`/categories/${subCategory.id}/${subCategory.translation.slug}`}
                      lang={lang}
                    >
                      <Typography
                        as="h5"
                        className="mb-3 border-b border-dashed border-gray-300 inline-block"
                      >
                        {subCategory.translation.name}
                      </Typography>
                    </Link>
                    <ul>
                      {subCategory.subCategories.map((subSubCategory, i) => (
                        <li key={i}>
                          <Link
                            href={`/categories/${subSubCategory.id}/${subSubCategory.translation.slug}`}
                            lang={lang}
                            className="text-gray-600"
                          >
                            {subSubCategory.translation.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Container>
          </div>
        </div>
      ))}
    </div>
  )
}
