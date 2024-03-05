import { PropsWithLang } from '@/i18n/types'
import { getSingleCategoryById } from '../data/get-single-category-with-id'
import Typography from '@/components/ui/typography'
import MdxRenderer from '@/components/common/mdx-renderer'
import Container from '@/components/common/container'
import Section from '@/components/common/section'

export default async function SingleCategoryPage({
  lang,
  id,
}: PropsWithLang & { id: string }) {
  const data = await getSingleCategoryById(id)

  if (!data) return 'no data found!'

  const { blogPostCategoryInformationTranslation } = data
  const {
    info,
    whatAre,
    useCases,
    functions,
    maintenanceandStorageConditions,
    applicationMethods,
    footerInfo,
  } = blogPostCategoryInformationTranslation

  return (
    <div>
      <Container>
        <Section>
          <Typography as="h1" className="mb-5">
            {data?.blogPostCategoryTranslation.name}
          </Typography>
          <MdxRenderer mdxText={info} />
          <MdxRenderer mdxText={whatAre} />
          <MdxRenderer mdxText={useCases} />
          <MdxRenderer mdxText={functions} />
          <MdxRenderer mdxText={maintenanceandStorageConditions} />
          <MdxRenderer mdxText={footerInfo} />
        </Section>
      </Container>
    </div>
  )
}
