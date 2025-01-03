import { PropsWithLang } from '@/i18n/types'
import Typography from '@/components/ui/typography'
import Container from '@/components/common/container'
import Section from '@/components/common/section'
import { sdk } from '@/restoreplus-sdk'

export default async function SingleCategoryPage({
  lang,
  id,
}: PropsWithLang & { id: string }) {
  const data = await sdk.blogPostCategories.getById(Number(id), { lang })

  if (!data) return 'no data found!'

  return (
    <div>
      <Container>
        <Section>
          <Typography as="h1" className="mb-5">
            {data?.translation.name}
          </Typography>
        </Section>
      </Container>
    </div>
  )
}
