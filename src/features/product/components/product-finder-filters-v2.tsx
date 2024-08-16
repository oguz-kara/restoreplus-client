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
import { useDictionary } from '@/context/use-dictionary'
import { useManageSearchParams } from '@/hooks/use-manage-search-params'
import { cn } from '@/lib/utils'
import { Folder } from 'lucide-react'
import { useMutation } from '@/hooks/use-mutation'

interface ProductFinderFiltersProps {
  categoryData: ProductCategory[]
  sectorData: Sector[]
}

interface CategoryStateType {
  id: number
  selectedCategoryId: string | undefined
  categoryList: ProductCategory[]
}

export default function ProductFinderFiltersV2({
  categoryData,
  sectorData,
}: ProductFinderFiltersProps) {
  const { mutateAsync: mutateAsyncCategory, isPending: categoryIsPending } =
    useMutation<ProductCategory[] | undefined | null>()
  const { mutateAsync: mutateAsyncSector, isPending: sectorIsPending } =
    useMutation<ApplicationScope[] | undefined | null>()
  const { setSearchParam, searchParams, deleteSearchParam } =
    useManageSearchParams()
  const [q, setQ] = useState<string>(searchParams.get('term') || '')
  const {
    lang,
    dictionary: { productFinder, common },
  } = useDictionary()

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
      name: ['categoryId', 'sectorId', 'applicationScopeId', 'term'],
    })
  }

  useEffect(() => {
    setSearchParam({ name: 'term', value: q })
  }, [q])

  return (
    <div className="px-5 py-10 border border-gray-200 flex-1">
      <div className="mb-5 flex border border-gray-200 rounded-md">
        <div className="w-full flex items-center justify-between h-[50px]">
          <div className="pl-1">
            <Input
              className="block !w-full border-none focus-visible:ring-0 rounded-none bg-transparent focus-visible:outline-0 focus-visible:border-0 placeholder:text-lg"
              type="text"
              placeholder={common.keyword}
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
            className="capitalize text-2xl font-semibold text-gray-700"
            as="h5"
          >
            {common.filter}
          </Typography>
          <Button
            variant="ghost"
            className="text-black gap-1 p-0"
            onClick={() => resetData()}
          >
            <span>
              <Undo />
            </span>
            <span className="text-gray-700 capitalize text-lg font-[600]">
              {productFinder.reset}
            </span>
          </Button>
        </div>
        <div className="mb-10">
          <div>
            <Typography className="font-semibold text-sm mb-1">
              {productFinder.category}
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
                          <Typography className="px-5 text-[16px] text-gray-400 capitalize">
                            {i === 0
                              ? productFinder.allCategories
                              : productFinder.subCategories}
                          </Typography>
                        }
                      />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {item?.categoryList?.map((item: any, i: number) => (
                        <SelectItem key={i} value={item.id}>
                          <Typography className="text-[16px] text-gray-600 py-2 px-5 capitalize">
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
                        <Typography className="px-5 text-[16px] text-gray-600 capitalize">
                          {productFinder.subCategories}
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
        <div>
          <Typography className="font-semibold text-sm mb-1">
            {productFinder.sectors}
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
                        <Typography className="px-5 text-[16px] text-gray-400 capitalize">
                          {productFinder.allSectors}
                        </Typography>
                      }
                    />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sectorData?.map((item: any, i: number) => (
                      <SelectItem key={i} value={item.id}>
                        <Typography className="text-[16px] text-gray-600 py-2 px-5 capitalize">
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
                        <Typography className="px-5 text-[16px] text-gray-600 capitalize">
                          {productFinder.applicationScopes}
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
                          <Typography className="text-[16px] text-gray-600 py-2 px-5 capitalize">
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
      </div>
    </div>
  )
}
