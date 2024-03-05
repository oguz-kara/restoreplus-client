import serverConfig from '@/config/server-config.json'
import Typography from '@/components/ui/typography'
import { getSectorById } from '@/features/sectors/data/get-sector-by-id'
import Image from '@/components/ui/image'
import Logo from '@/components/common/logo'
import Container from '@/components/common/container'
import Section from '@/components/common/section'
import MdxRenderer from '@/components/common/mdx-renderer'

export default async function Page({
  params: { slug, id },
}: {
  params: { slug: string; id: string }
}) {
  const result = await getSectorById(id)
  if (!result) return 'no sector data found!'

  return (
    <div>
      <HeroSection data={result} />
      <Container>
        <Section>
          <MdxRenderer mdxText={result.translation.content} />
        </Section>
      </Container>
    </div>
  )
}

function HeroSection({ data }: { data: SectorWithTranslation }) {
  return (
    <div
      className="flex items-center justify-center relative lg:h-[500px] bg-no-repeat bg-cover text-white text-center"
      style={{
        backgroundImage: `url(${serverConfig.remoteUrl}/${data.featuredImage?.path})`,
      }}
    >
      <Container>
        <Section>
          <div className="flex items-center justify-center flex-col">
            <div className="bg-[#00000090] absolute top-0 left-0 right-0 bottom-0"></div>
            <div className="relative flex flex-col gap-5 items-center pb-5">
              <div>
                <Logo width={100} height={100} />
              </div>
              <Typography
                as="h1"
                className="lg:text-3xl font-bold text-primary uppercase"
              >
                {data.translation.name}
              </Typography>
            </div>
            <Typography
              as="h3"
              className="lg:text-xlg font-bold relative text-primary pb-5"
            >
              {data.translation.title}
            </Typography>
            <Typography className="relative font-semibold" as="p">
              {data.translation.description}
            </Typography>
          </div>
        </Section>
      </Container>
    </div>
  )
}
