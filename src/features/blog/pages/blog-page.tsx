import { PropsWithLang } from '@/i18n/types'
import MainBlogList from '../components/main-blog-list'
import Typography from '@/components/ui/typography'
import Container from '@/components/common/container'
import Section from '@/components/common/section'
import { getDictionary } from '@/i18n/get-dictionary'
import Paginate from '@/components/common/pagination'
import InfoCard from '@/components/common/info-card'
import { sdk } from '@/restoreplus-sdk'

export default async function BlogPage({ lang }: PropsWithLang) {
  const { data, pagination } = await sdk.blogPosts.getAllByQuery({}, { lang })
  const dict = await getDictionary(lang)

  return (
    <div>
      <div className="border-b border-gray-200 py-10">
        <Container>
          <Section>
            <Typography className="p-0 m-0" as="h1">
              {dict.blog.title}
            </Typography>
          </Section>
        </Container>
      </div>
      <Container>
        <Section>
          <div className="flex gap-20">
            <MainBlogList lang={lang} data={data} />
            <InfoCard
              data={{
                title: dict.blog.found_by_users_title,
                buttonText: dict.blog.get_listed_button_text,
                text: dict.blog.found_by_users_description,
              }}
              lang={lang}
            />
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
