'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Typography from '@/components/ui/typography'
import {
  ArrowUpCircle,
  Drill,
  Factory,
  List,
  ListTree,
  Search,
} from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { getSearchParam } from '@/utils/get-search-param'
import { useEffect, useState } from 'react'

interface ProductFinderFiltersProps {
  categoryData: TranslatedProductCategory[]
  subCategoryData: TranslatedProductCategory[]
  sectorData: TranslatedSector[]
  subSectorData: TranslatedSector[]
}

export default function ProductFinderFilters({
  categoryData,
  sectorData,
  subCategoryData,
  subSectorData,
}: ProductFinderFiltersProps) {
  const [categorySlug, setCategorySlug] = useState<string | undefined>(
    undefined
  )
  const [subCategorySlug, setSubCategorySlug] = useState<string | undefined>(
    undefined
  )
  const [sectorSlug, setSectorSlug] = useState<string | undefined>(undefined)
  const [subSectorSlug, setSubSectorSlug] = useState<string | undefined>(
    undefined
  )
  const [q, setQ] = useState<string>('')
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const handleSelectFilterChange = (
    name: string,
    value: string,
    setFunction?: any
  ) => {
    setFunction && setFunction(value)
    const query = getSearchParam({
      name,
      value,
      searchParams,
    })

    router.push(`${pathname}${query}`)
  }

  useEffect(() => {
    handleSelectFilterChange('term', q)
  }, [q])

  useEffect(() => {
    const categorySearch = searchParams.get('categorySlug')
    const subCategorySearch = searchParams.get('subCategorySlug')
    console.log({ categorySearch, subCategorySearch })
    if (categorySearch) setCategorySlug(categorySearch)
    if (subCategorySearch) setSubCategorySlug(subCategorySearch)
  }, [searchParams])

  return (
    <div
      className="p-5"
      style={{
        boxShadow:
          'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
      }}
    >
      <div className="mb-5 inline-block border border-gray-200 rounded-md">
        <div className="flex items-center">
          <div>
            <Input
              className="border-none outline-none focus:ring-primary focus-visible:ring-primary"
              type="text"
              placeholder="Keyword..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div>
            <Button>
              <Search />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mb-5">
        <Typography as="h5">Filter</Typography>
        <Button variant="ghost" className="text-black gap-1 p-0">
          <span>
            <ArrowUpCircle />
          </span>
          <span>Reset</span>
        </Button>
      </div>
      <div className="mb-5">
        <Typography className="font-semibold text-sm mb-1">Category</Typography>
        <div>
          <Select
            onValueChange={(val) =>
              handleSelectFilterChange('categorySlug', val, setCategorySlug)
            }
            value={categorySlug}
          >
            <SelectTrigger className="w-full justify-start gap-3 rounded-none">
              <List />
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categoryData.map((item: any, i: number) => (
                  <SelectItem
                    key={i}
                    value={`${item.translation.slug},${item.id}`}
                  >
                    {item.translation.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(val) =>
              handleSelectFilterChange(
                'subCategorySlug',
                val,
                setSubCategorySlug
              )
            }
            value={subCategorySlug}
          >
            <SelectTrigger
              disabled={!Boolean(subCategoryData && subCategoryData.length > 0)}
              className="w-full justify-start gap-3 rounded-none border-t-0 bg-gray-200"
            >
              <ListTree />
              <SelectValue placeholder="All sub categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sub categories</SelectLabel>
                {subCategoryData?.map((item: any, i: number) =>
                  item.translation.slug ? (
                    <SelectItem
                      key={i}
                      value={`${item.translation.slug},${item.id}`}
                    >
                      {item.translation.name}
                    </SelectItem>
                  ) : null
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Typography className="font-semibold text-sm mb-1">Sectors</Typography>
        <div>
          <Select
            onValueChange={(val) =>
              handleSelectFilterChange('sectorSlug', val, setSectorSlug)
            }
            value={sectorSlug}
          >
            <SelectTrigger className="w-full justify-start gap-3 rounded-none">
              <Factory />
              <SelectValue placeholder="All sectors" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sectors</SelectLabel>
                {sectorData?.map((item: any, i: number) => (
                  <SelectItem
                    key={i}
                    value={`${item.translation.slug},${item.id}`}
                  >
                    {item?.translation.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            onValueChange={(val) =>
              handleSelectFilterChange('subSectorSlug', val, setSubSectorSlug)
            }
            value={subSectorSlug}
          >
            <SelectTrigger
              disabled={!Boolean(subSectorData && subSectorData.length > 0)}
              className="w-full justify-start gap-3 rounded-none border-t-0 bg-gray-200"
            >
              <Drill />
              <SelectValue placeholder="All sub sectors" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sub sectors</SelectLabel>
                {subSectorData?.map((item: any, i: number) => (
                  <SelectItem
                    key={i}
                    value={`${item.translation.slug},${item.id}`}
                  >
                    {item.translation.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
