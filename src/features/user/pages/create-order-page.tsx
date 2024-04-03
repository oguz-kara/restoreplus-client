import { Separator } from '@/components/ui/separator'
import { PropsWithLang } from '@/i18n/types'
import { getDictionary } from '@/i18n/get-dictionary'
import ListCalculatedProducts from '@/features/product/components/list-calculated-products'
import Typography from '@/components/ui/typography'
import { searchData } from '@/utils/fetch-data'

export default async function CreateOrderPage({
  lang,
  page,
  take,
  q,
}: PropsWithLang & PropsWithPagination & PropsWithPagination & { q?: string }) {
  const {
    profile: { company },
  } = await getDictionary(lang)
  const { data } = await searchData({
    name: 'active-user/calculated-products',
    page: page as string,
    take: take as string,
    query: q,
  })

  if (!data)
    return (
      <Typography as="h5" className="font-normal">
        Create Order
      </Typography>
    )

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">{company.title}</h3>
        <p className="text-sm text-muted-foreground">{company.description}</p>
      </div>
      <Separator />
      <ListCalculatedProducts products={data} lang={lang} />
    </div>
  )
}
