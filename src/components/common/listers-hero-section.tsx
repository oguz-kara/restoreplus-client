import { ServerImage } from '../ui/image'
import Typography from '../ui/typography'
import Container from './container'
import Section from './section'

export function ListersHeroSection({
  data,
}: {
  data: ProductCategory | ApplicationScope | Sector
}) {
  return (
    <div className="flex items-center justify-center relative lg:h-[500px] bg-no-repeat bg-cover text-white text-center py-10 overflow-hidden">
      <ServerImage
        className="block absolute top-0 bottom-0 left-0 right-0 object-cover h-full w-full"
        src={data?.featuredImage?.path || '/'}
        width={500}
        height={500}
        alt="product category image"
        priority={true}
      />
      <Container>
        <Section>
          <div className="flex items-center justify-center flex-col">
            <div className="bg-[rgba(0,0,0,0.7)] absolute top-0 left-0 right-0 bottom-0"></div>
            <div className="relative flex flex-col gap-5 items-center pb-5">
              <Typography
                as="h1"
                className="lg:text-5xl md:text-3xl font-bold text-white capitalize"
              >
                {data.translation.name}
              </Typography>
            </div>
            <Typography
              className="lg:text-xl md:text-lg relative font-normal text-sm lg:max-w-[764px]"
              as="p"
            >
              {data.translation.metaDescription}
            </Typography>
          </div>
        </Section>
      </Container>
    </div>
  )
}
