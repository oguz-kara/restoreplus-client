'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Typography from '@/components/ui/typography'
import { Bolt, Castle, Loader, Search, SwatchBook, Undo } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useManageSearchParams } from '@/hooks/use-manage-search-params'
import { cn } from '@/lib/utils'
import { Folder } from 'lucide-react'
import { useMutation } from '@/hooks/use-mutation'
import { useDictionary } from '@/context/use-dictionary-v2'

interface ProductFinderFiltersProps {
  categoryData: ProductCategory[]
  sectorData: Sector[]
  facetData: Facet[]
}

interface CategoryStateType {
  id: number
  selectedCategoryId: string | undefined
  categoryList: ProductCategory[]
}

export default function ProductFinderFiltersV2({
  categoryData,
  sectorData,
  facetData,
}: ProductFinderFiltersProps) {
  const { mutateAsync: mutateAsyncCategory, isPending: categoryIsPending } =
    useMutation<ProductCategory[] | undefined | null>()
  const { mutateAsync: mutateAsyncSector, isPending: sectorIsPending } =
    useMutation<ApplicationScope[] | undefined | null>()
  const { setSearchParam, searchParams, deleteSearchParam } =
    useManageSearchParams()
  const [q, setQ] = useState<string>(searchParams.get('term') || '')
  const { dictionary: dict, lang } = useDictionary()

  const [listCategoryData, setListCategoryData] = useState<CategoryStateType[]>(
    [
      {
        id: 1,
        categoryList: categoryData,
        selectedCategoryId: '',
      },
    ]
  )

  const [selectedSector, setSelectedSector] = useState<{
    sectorId: string | undefined
    applicationScopeId: string | undefined
    applicationScopes: ApplicationScope[] | null
  }>({ sectorId: '', applicationScopes: null, applicationScopeId: '' })

  const [selectedFacetValues, setSelectedFacetValues] = useState<
    { facetId: number; id: string }[]
  >([])

  const handleCategoryChange = async (val: string, i: number) => {
    setSearchParam({ name: 'categoryId', value: val.toString() })
    const changedCategoryDataIndex = listCategoryData.findIndex(
      (item) => item.id === i + 1
    )

    const changedCategoryData = listCategoryData[changedCategoryDataIndex]

    const data = await mutateAsyncCategory({
      path: `/product/categories/?id=${val}&lang=${lang}`,
      method: 'POST',
      body: { id: Number(val) },
    })

    if (data && data?.length > 0) {
      setListCategoryData((prev) => [
        ...prev
          .slice(0, changedCategoryDataIndex + 1)
          .map((item) =>
            item.id === i + 1
              ? { ...item, selectedCategoryId: val }
              : { ...item }
          ),
        {
          id: changedCategoryData.id + 1,
          selectedCategoryId: undefined,
          categoryList: data as ProductCategory[],
          changed: false,
        },
      ])
    } else {
      setListCategoryData((prev) =>
        prev
          .slice(0, changedCategoryDataIndex + 1)
          .map((item) =>
            item.id === i + 1
              ? { ...item, selectedCategoryId: val }
              : { ...item }
          )
      )
    }
  }

  const handleApplicationScopeChange = async (val: string) => {
    setSearchParam({ name: 'applicationScopeId', value: val.toString() })

    setSelectedSector((prev) => ({
      ...prev,
      applicationScopeId: val,
    }))
  }

  const handleSectorChange = async (val: string) => {
    setSearchParam({ name: 'sectorId', value: val.toString() })
    const applicationScopes = await mutateAsyncSector({
      path: `/application-scopes?lang=${lang}`,
      body: { sectorId: Number(val) },
    })

    setSelectedSector((prev) => ({
      ...prev,
      sectorId: val,
      applicationScopes: applicationScopes ? applicationScopes : null,
    }))
  }

  const resetData = () => {
    setSelectedFacetValues([])
    setListCategoryData([
      {
        id: 1,
        categoryList: categoryData,
        selectedCategoryId: '',
      },
    ])
    setSelectedSector({
      ...{
        sectorId: '',
        applicationScopeId: '',
        applicationScopes: null,
      },
    })
    setQ('')
    deleteSearchParam({
      name: [
        'facetValues',
        'categoryId',
        'sectorId',
        'applicationScopeId',
        'term',
      ],
    })
  }

  const handleFacetValueChange = (val: string, facetId: number) => {
    setSelectedFacetValues((prev) => {
      const hasValue = prev.find((v) => v.facetId === facetId)

      if (hasValue)
        return prev.map((v) =>
          v.facetId === facetId ? { facetId, id: val.toString() } : v
        )
      else return [...prev, { facetId, id: val.toString() }]
    })
  }

  useEffect(() => {
    setSearchParam({ name: 'term', value: q })
  }, [q])

  useEffect(() => {
    console.log({ selectedFacetValues })
  }, [selectedFacetValues])

  useEffect(() => {
    if (selectedFacetValues && selectedFacetValues.length > 0) {
      setSearchParam({
        name: 'facetValues',
        value: selectedFacetValues.map((item) => item.id).join('-'),
      })
    }
  }, [selectedFacetValues])

  return (
    <div className="px-5 py-10 border border-gray-200 flex-1">
      <div className="mb-5 flex border border-gray-200 rounded-md">
        <div className="w-full flex items-center justify-between h-[50px]">
          <div className="pl-1">
            <Input
              className="block !w-full border-none focus-visible:ring-0 rounded-none bg-transparent focus-visible:outline-0 focus-visible:border-0 placeholder:text-lg"
              type="text"
              placeholder={dict.common.keyword_text}
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="h-full">
            <Button className="h-full">
              <Search />
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-between mb-5">
          <Typography
            className="capitalize text-2xl font-semibold text-gray-700 uppercase"
            as="h5"
          >
            {dict.common.filter_text}
          </Typography>
          <Button
            variant="ghost"
            className="text-black gap-1 p-0 hover:bg-transparent"
            onClick={() => resetData()}
          >
            <span>
              <Undo />
            </span>
            <span className="text-gray-700 text-lg font-[600] font-barlowCondensed uppercase">
              {dict.product_finder.reset_text}
            </span>
          </Button>
        </div>
        <div className="mb-10">
          <div>
            <Typography
              as="h6"
              className="font-semibold text-sm mb-1 uppercase"
            >
              {dict.common.category_text}
            </Typography>
            {listCategoryData?.map((item: any, i: number) => (
              <div key={i}>
                <Select
                  onValueChange={async (val) =>
                    await handleCategoryChange(val, i)
                  }
                  value={item.selectedCategoryId}
                  defaultValue={item.selectedCategoryId}
                >
                  <SelectTrigger
                    className={cn(
                      'w-full gap-3 rounded-none py-7',
                      i === 0 ? 'rounded-t-lg' : '',
                      i === listCategoryData.length - 1 && i !== 0
                        ? 'rounded-b-lg'
                        : 'border-b-0'
                    )}
                  >
                    <div className="flex items-center gap-1">
                      {categoryIsPending ? (
                        <Loader
                          className="animate-spin"
                          color="rgba(218,218,218,1)"
                        />
                      ) : i === 0 ? (
                        <Folder color="rgba(218,218,218,1)" />
                      ) : (
                        <SwatchBook color="rgba(218,218,218,1)" />
                      )}
                      <SelectValue
                        placeholder={
                          <Typography
                            as="h5"
                            className="px-5 text-xl text-gray-400 uppercase font-semibold"
                          >
                            {i === 0
                              ? dict.product_finder.all_categories_text
                              : dict.product_finder.sub_categories_text}
                          </Typography>
                        }
                      />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {item?.categoryList?.map((item: any, i: number) => (
                        <SelectItem key={i} value={item.id}>
                          <Typography
                            as="h6"
                            className="px-5 text-xl text-gray-400 uppercase font-semibold"
                          >
                            {item?.translation?.name}
                          </Typography>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
          {listCategoryData.length === 1 && (
            <div>
              <Select>
                <SelectTrigger
                  className={cn(
                    'w-full gap-3 rounded-none py-7 rounded-b-lg bg-gray-100'
                  )}
                  disabled={true}
                >
                  <div className="flex items-center gap-1">
                    <SwatchBook color="rgba(200,200,200,1)" />
                    <SelectValue
                      placeholder={
                        <Typography
                          as="h5"
                          className="px-5 text-xl text-gray-400 uppercase font-semibold"
                        >
                          {dict.product_finder.sub_categories_text}
                        </Typography>
                      }
                    />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup></SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <div className="mb-10">
          <Typography as="h5" className="font-semibold text-sm mb-1 uppercase">
            {dict.common.sectors_text}
          </Typography>
          <div>
            <div>
              <Select
                onValueChange={handleSectorChange}
                value={selectedSector.sectorId}
              >
                <SelectTrigger
                  className={cn(
                    'w-full gap-3 rounded-none py-7 rounded-t-lg border-b-0'
                  )}
                >
                  <div className="flex items-center gap-1">
                    {sectorIsPending ? (
                      <Loader
                        color="rgba(218,218,218,1)"
                        className="animate-spin"
                      />
                    ) : (
                      <Castle color="rgba(218,218,218,1)" />
                    )}
                    <SelectValue
                      placeholder={
                        <Typography
                          as="h5"
                          className="px-5 text-xl text-gray-400 uppercase font-semibold"
                        >
                          {dict.product_finder.all_sectors_text}
                        </Typography>
                      }
                    />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sectorData?.map((item: any, i: number) => (
                      <SelectItem key={i} value={item.id}>
                        <Typography
                          as="h6"
                          className="px-5 text-xl text-gray-400 uppercase font-semibold"
                        >
                          {item?.translation?.name}
                        </Typography>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select
                onValueChange={handleApplicationScopeChange}
                value={selectedSector.applicationScopeId}
              >
                <SelectTrigger
                  className={cn('w-full gap-3 rounded-none py-7 rounded-b-lg')}
                  disabled={
                    selectedSector.applicationScopes &&
                    selectedSector.applicationScopes.length > 0 &&
                    selectedSector.sectorId
                      ? false
                      : true
                  }
                >
                  <div className="flex items-center gap-1">
                    <Bolt color="rgba(200,200,200,1)" />
                    <SelectValue
                      placeholder={
                        <Typography
                          as="h5"
                          className="px-5 text-xl text-gray-400 uppercase font-semibold"
                        >
                          {dict.common.application_scopes_text}
                        </Typography>
                      }
                    />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {selectedSector?.applicationScopes?.map(
                      (item: any, i: number) => (
                        <SelectItem key={i} value={item.id}>
                          <Typography
                            as="h6"
                            className="px-5 text-xl text-gray-400 uppercase font-semibold"
                          >
                            {item?.translation?.name}
                          </Typography>
                        </SelectItem>
                      )
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="bg-gray-200 h-[1px] my-5 border-solid"></div>
        {facetData.map((item, i) => (
          <div key={i} className="pb-5">
            <Typography className="font-semibold text-sm capitalize mb-1">
              {item.translation.name}
            </Typography>
            <div>
              <Select
                onValueChange={(val) => handleFacetValueChange(val, item.id)}
                value={
                  selectedFacetValues.find(({ facetId }) => facetId === item.id)
                    ?.id
                }
              >
                <SelectTrigger className={cn('w-full gap-3 py-7 rounded-lg')}>
                  <div className="flex items-center gap-1">
                    {sectorIsPending ? (
                      <Loader
                        color="rgba(218,218,218,1)"
                        className="animate-spin"
                      />
                    ) : null}
                    <SelectValue
                      placeholder={
                        <Typography className="text-[16px] text-gray-400 capitalize">
                          {dict.common.any_text}
                        </Typography>
                      }
                    />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {item.values?.map((facetValue, i) => (
                      <SelectItem key={i} value={`${facetValue.id}`}>
                        <Typography className="text-[16px] text-gray-600 py-2 px-5 capitalize">
                          {facetValue?.translation?.name}
                        </Typography>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
