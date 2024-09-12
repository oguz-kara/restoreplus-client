'use client'
import { Filter } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
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
import { useDictionary } from '@/context/use-dictionary-v2'

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
  const searchParams = useSearchParams()
  const { dictionary: dict } = useDictionary()
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
  const [q, setQ] = useState<string>(searchParams.get('term') || '')
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

  const handleResetSearchParams = () => {
    router.replace(pathname, undefined)
    if (categorySlug) setCategorySlug(undefined)
    if (subCategorySlug) setSubCategorySlug(undefined)
    if (sectorSlug) setSectorSlug(undefined)
    if (subSectorSlug) setSubSectorSlug(undefined)
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSelectFilterChange('term', q)
      localStorage.removeItem('product-finter-search-timeout')
    }, 1000)

    return () => clearTimeout(timeout)
  }, [q])

  useEffect(() => {
    const categorySearch = searchParams.get('categorySlug')
    const subCategorySearch = searchParams.get('subCategorySlug')
    if (categorySearch) setCategorySlug(categorySearch)
    if (subCategorySearch) setSubCategorySlug(subCategorySearch)
  }, [searchParams])

  return (
    <div className="px-5 py-10 border border-gray-100">
      <div className="mb-5 flex border border-gray-200 rounded-md">
        <div className="w-full flex items-center justify-between">
          <div>
            <Input
              className="block !w-full border-none outline-none focus:ring-primary focus-visible:ring-primary"
              type="text"
              placeholder={dict.common.keyword_text}
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
      <div className="lg:hidden">
        <Accordion type="multiple" className="lg:hidden">
          <AccordionItem value="filters">
            <AccordionTrigger>
              <div className="flex gap-1 items-center">
                <Typography className="text-sm font-semibold">
                  {dict.common.filter_text}
                </Typography>
                <Filter size="20px" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center justify-between mb-5">
                <Typography as="h5">{dict.common.filter_text}</Typography>
                <Button
                  variant="ghost"
                  className="text-black gap-1 p-0"
                  onClick={() => handleResetSearchParams()}
                >
                  <span>
                    <ArrowUpCircle />
                  </span>
                  <span>{dict.product_finder.reset_text}</span>
                </Button>
              </div>
              <div className="mb-5">
                <Typography className="font-semibold text-sm mb-1">
                  {dict.common.category_text}
                </Typography>
                <div>
                  <Select
                    onValueChange={(val) =>
                      handleSelectFilterChange(
                        'categorySlug',
                        val,
                        setCategorySlug
                      )
                    }
                    value={categorySlug}
                  >
                    <SelectTrigger className="w-full justify-start gap-3 rounded-none">
                      <List />
                      <SelectValue
                        placeholder={dict.product_finder.all_categories_text}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{dict.common.categories_text}</SelectLabel>
                        {categoryData?.map((item: any, i: number) => (
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
                      disabled={
                        !Boolean(subCategoryData && subCategoryData.length > 0)
                      }
                      className="w-full justify-start gap-3 rounded-none border-t-0 bg-gray-200"
                    >
                      <ListTree />
                      <SelectValue
                        placeholder={
                          dict.product_finder.all_sub_categories_text
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>
                          {dict.product_finder.sub_categories_text}
                        </SelectLabel>
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
                <Typography className="font-semibold text-sm mb-1">
                  {dict.common.sectors_text}
                </Typography>
                <div>
                  <Select
                    onValueChange={(val) =>
                      handleSelectFilterChange('sectorSlug', val, setSectorSlug)
                    }
                    value={sectorSlug}
                  >
                    <SelectTrigger className="w-full justify-start gap-3 rounded-none">
                      <Factory />
                      <SelectValue
                        placeholder={dict.product_finder.all_sectors_text}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{dict.common.sectors_text}</SelectLabel>
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
                      handleSelectFilterChange(
                        'subSectorSlug',
                        val,
                        setSubSectorSlug
                      )
                    }
                    value={subSectorSlug}
                  >
                    <SelectTrigger
                      disabled={
                        !Boolean(subSectorData && subSectorData.length > 0)
                      }
                      className="w-full justify-start gap-3 rounded-none border-t-0 bg-gray-200"
                    >
                      <Drill />
                      <SelectValue
                        placeholder={dict.product_finder.all_sub_sectors_text}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
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
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="hidden lg:block">
        <div className="flex items-center justify-between mb-5">
          <Typography as="h5">{dict.common.filter_text}</Typography>
          <Button
            variant="ghost"
            className="text-black gap-1 p-0"
            onClick={() => handleResetSearchParams()}
          >
            <span>
              <ArrowUpCircle />
            </span>
            <span>{dict.product_finder.reset_text}</span>
          </Button>
        </div>
        <div className="mb-5">
          <Typography className="font-semibold text-sm mb-1">
            {dict.common.category_text}
          </Typography>
          <div>
            <Select
              onValueChange={(val) =>
                handleSelectFilterChange('categorySlug', val, setCategorySlug)
              }
              value={categorySlug}
            >
              <SelectTrigger className="w-full justify-start gap-3 rounded-none">
                <List />
                <SelectValue
                  placeholder={dict.product_finder.all_categories_text}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{dict.common.categories_text}</SelectLabel>
                  {categoryData?.map((item: any, i: number) => (
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
                disabled={
                  !Boolean(subCategoryData && subCategoryData.length > 0)
                }
                className="w-full justify-start gap-3 rounded-none border-t-0 bg-gray-200"
              >
                <ListTree />
                <SelectValue
                  placeholder={dict.product_finder.all_sub_categories_text}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    {dict.product_finder.sub_categories_text}
                  </SelectLabel>
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
          <Typography className="font-semibold text-sm mb-1">
            {dict.common.sectors_text}
          </Typography>
          <div>
            <Select
              onValueChange={(val) =>
                handleSelectFilterChange('sectorSlug', val, setSectorSlug)
              }
              value={sectorSlug}
            >
              <SelectTrigger className="w-full justify-start gap-3 rounded-none">
                <Factory />
                <SelectValue
                  placeholder={dict.product_finder.all_sectors_text}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{dict.common.sectors_text}</SelectLabel>
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
                <SelectValue
                  placeholder={dict.product_finder.all_sub_sectors_text}
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
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
    </div>
  )
}
