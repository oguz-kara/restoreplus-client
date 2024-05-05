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
import { useDictionary } from '@/context/use-dictionary'

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
  const {
    dictionary: { productFinder, common },
  } = useDictionary()
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
    <div
      className="p-5"
      style={{
        boxShadow:
          'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px',
      }}
    >
      <div className="mb-5 flex border border-gray-200 rounded-md">
        <div className="w-full flex items-center justify-between">
          <div>
            <Input
              className="block !w-full border-none outline-none focus:ring-primary focus-visible:ring-primary"
              type="text"
              placeholder={common.keyword}
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
                  {common.filter}
                </Typography>
                <Filter size="20px" />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex items-center justify-between mb-5">
                <Typography as="h5">{common.filter}</Typography>
                <Button
                  variant="ghost"
                  className="text-black gap-1 p-0"
                  onClick={() => handleResetSearchParams()}
                >
                  <span>
                    <ArrowUpCircle />
                  </span>
                  <span>{productFinder.reset}</span>
                </Button>
              </div>
              <div className="mb-5">
                <Typography className="font-semibold text-sm mb-1">
                  {productFinder.category}
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
                      <SelectValue placeholder={productFinder.allCategories} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{productFinder.categories}</SelectLabel>
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
                      disabled={
                        !Boolean(subCategoryData && subCategoryData.length > 0)
                      }
                      className="w-full justify-start gap-3 rounded-none border-t-0 bg-gray-200"
                    >
                      <ListTree />
                      <SelectValue
                        placeholder={productFinder.allSubCategories}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{productFinder.subCategories}</SelectLabel>
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
                  {productFinder.sectors}
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
                      <SelectValue placeholder={productFinder.allSectors} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{productFinder.sectors}</SelectLabel>
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
                      <SelectValue placeholder={productFinder.allSubSectors} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>{productFinder.subSectors}</SelectLabel>
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
          <Typography as="h5">{common.filter}</Typography>
          <Button
            variant="ghost"
            className="text-black gap-1 p-0"
            onClick={() => handleResetSearchParams()}
          >
            <span>
              <ArrowUpCircle />
            </span>
            <span>{productFinder.reset}</span>
          </Button>
        </div>
        <div className="mb-5">
          <Typography className="font-semibold text-sm mb-1">
            {productFinder.category}
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
                <SelectValue placeholder={productFinder.allCategories} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{productFinder.categories}</SelectLabel>
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
                disabled={
                  !Boolean(subCategoryData && subCategoryData.length > 0)
                }
                className="w-full justify-start gap-3 rounded-none border-t-0 bg-gray-200"
              >
                <ListTree />
                <SelectValue placeholder={productFinder.allSubCategories} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{productFinder.subCategories}</SelectLabel>
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
            {productFinder.sectors}
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
                <SelectValue placeholder={productFinder.allSectors} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{productFinder.sectors}</SelectLabel>
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
                <SelectValue placeholder={productFinder.allSubSectors} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{productFinder.subSectors}</SelectLabel>
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
