import { PropsWithLang } from '@/i18n/types'
import MainBlogList from '../components/main-blog-list'
import { getBlogPostData } from '../data/get-blog-post-data'
import Typography from '@/components/ui/typography'
import Container from '@/components/common/container'
import Section from '@/components/common/section'
import { getDictionary } from '@/i18n/get-dictionary'
import Paginate from '@/components/common/pagination'
import InfoCard from '@/components/common/info-card'

export default async function BlogPage({ lang }: PropsWithLang) {
  const { data, pagination } = await getBlogPostData()
  const {
    blog: { page },
  } = await getDictionary(lang)

  return (
    <div>
      <div className="border-b border-gray-200 py-10">
        <Container>
          <Section>
            <Typography className="p-0 m-0" as="h1">
              The Restoreplus Blog
            </Typography>
          </Section>
        </Container>
      </div>
      <Container>
        <Section>
          <div className="flex gap-20">
            <MainBlogList lang={lang} data={data} />
            <InfoCard data={page.rightCard} />
          </div>
          <div>
            <Paginate
              total={pagination.total ? pagination.total : 0}
              url="/blog"
            />
          </div>
        </Section>
      </Container>
    </div>
  )
}
