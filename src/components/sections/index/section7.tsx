'use client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Link from '@/components/ui/link'
import Typography from '@/components/ui/typography'
import { Locale, PropsWithLang } from '@/i18n/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Section from '@/components/common/section'
import Container from '@/components/common/container'
import { useDictionary } from '@/context/use-dictionary'

export default function Section7({
  lang,
  categoryData,
}: PropsWithLang & { categoryData: CategoryData | null }) {
  const isMobile = window ? window.innerWidth <= 645 : false

  const {
    dictionary: {
      index: {
        section7: { title },
      },
    },
  } = useDictionary()

  if (!categoryData) return 'No category data found!'

  const { data } = categoryData

  return (
    <div className="bg-white">
      <Section className="px-0">
        <Container>
          <Typography as="h2" className="py-5 text-center">
            {title}
          </Typography>
        </Container>
        {isMobile ? (
          <CategoriesMobile data={data} lang={lang} />
        ) : (
          <CategoriesDesktop data={data} lang={lang} />
        )}
      </Section>
    </div>
  )
}

function CategoriesMobile({
  data,
  lang,
}: {
  data: BlogPostCategoryWithOneTranslation[]
  lang: Locale
}) {
  return (
    <Accordion type="multiple">
      {data.map((category, i) => (
        <AccordionItem
          value={category.blogPostCategoryTranslation.name}
          key={i}
          className="px-5 py-2 border-gray-600 "
        >
          <AccordionTrigger>
            <Typography as="h5">
              {category.blogPostCategoryTranslation.name}
            </Typography>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="px-5">
              {category.subCategories.map((subCategory, i) => (
                <li key={i} className="py-2">
                  <Accordion type="multiple">
                    <AccordionItem
                      value={subCategory.blogPostCategoryTranslation.name}
                      className="border-gray-600"
                    >
                      <AccordionTrigger>
                        <Link
                          href={subCategory.blogPostCategoryTranslation.name}
                          lang={lang}
                        >
                          <Typography className="text-lg">
                            {subCategory.blogPostCategoryTranslation.name}
                          </Typography>
                        </Link>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="px-5">
                          {subCategory.subCategories.map(
                            (subSubCategory, i) => (
                              <li key={i} className="mb-2">
                                <Link
                                  href={`/categories/${subSubCategory.blogPostCategoryTranslation.slug}`}
                                  lang={lang}
                                >
                                  <Typography className="text-lg">
                                    {
                                      subSubCategory.blogPostCategoryTranslation
                                        .name
                                    }
                                  </Typography>
                                </Link>
                              </li>
                            )
                          )}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

function CategoriesDesktop({
  data,
  lang,
}: {
  data: BlogPostCategoryWithOneTranslation[]
  lang: Locale
}) {
  return (
    <Tabs defaultValue="yağlayıcılar" className="px-5">
      <div className="bg-gray-200 mb-10 pt-10 rounded-0">
        <Container>
          <TabsList className="m-0 mx-0 w-full bg-transparent">
            {data.map((category, i) => (
              <TabsTrigger
                value={category.blogPostCategoryTranslation.name}
                key={i}
                className="text-lg rounded-none"
              >
                {category.blogPostCategoryTranslation.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Container>
      </div>
      {data.map((topCategory, i) => (
        <TabsContent
          value={topCategory.blogPostCategoryTranslation.name}
          key={i}
          className="w-full"
        >
          <Container>
            <div className="grid grid-cols-4 gap-5">
              {topCategory.subCategories.map((subCategory, i) => (
                <div key={i}>
                  <Link
                    href={`/categories/${subCategory.id}/${subCategory.blogPostCategoryTranslation.slug}`}
                    lang={lang}
                  >
                    <Typography
                      as="h5"
                      className="mb-3 border-b border-dashed border-gray-300 inline-block"
                    >
                      {subCategory.blogPostCategoryTranslation.name}
                    </Typography>
                  </Link>
                  <ul>
                    {subCategory.subCategories.map((subSubCategory, i) => (
                      <li key={i}>
                        <Link
                          href={`/categories/${subSubCategory.id}/${subSubCategory.blogPostCategoryTranslation.slug}`}
                          lang={lang}
                          className="text-gray-600"
                        >
                          {subSubCategory.blogPostCategoryTranslation.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </TabsContent>
      ))}
    </Tabs>
  )
}
