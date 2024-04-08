'use client'
// @ts-ignore
import useKeypress from 'react-use-keypress'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useDictionary } from '@/context/use-dictionary'
import { Input } from '../ui/input'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Search } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

export default function AdvancedSearchBox() {
  const router = useRouter()
  const [q, setQ] = useState<string>('')
  const [selectedType, setSelectedType] = useState<string>('name')
  const {
    dictionary: {
      common: { search },
      search: { searchByType, placeholders },
    },
    lang,
  } = useDictionary()
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] =
    useState<number>(0)
  const [currentPlaceholder, setCurrentPlaceholder] = useState<string>('')

  const writePlaceholder = () => {
    placeholders[currentPlaceholderIndex].split('').forEach((char, i) => {
      setTimeout(() => {
        setCurrentPlaceholder((prevPlaceholder) => prevPlaceholder.concat(char))
      }, i * 100)
    })
  }

  const handleSearch = (query: string) => {
    router.push(`/${lang}/product?q=${query}&type=${selectedType}`)
  }

  useKeypress('Enter', () => handleSearch(q))

  useEffect(() => {
    let intervalId: any = undefined
    const localIntervalId = localStorage.getItem('intervalId')
    if (!q && !localIntervalId) {
      intervalId = setInterval(() => {
        setCurrentPlaceholder('')
        setCurrentPlaceholderIndex(
          (prevIndex) => (prevIndex + 1) % placeholders.length
        )
      }, 5000)

      localStorage.setItem('intervalId', intervalId)

      return () => {
        localStorage.removeItem('intervalId')
        return clearInterval(intervalId)
      }
    } else {
      localStorage.removeItem('intervalId')
      clearInterval(intervalId)
    }
  }, [q])

  useEffect(() => {
    writePlaceholder()
  }, [currentPlaceholderIndex])

  return (
    <div className="flex justify-between items-center border border-black p-1 pl-5 gap-3 bg-white w-full rounded-full">
      <div className="flex gap-3">
        <div>
          <Select
            defaultValue="name"
            value={selectedType}
            onValueChange={(value) => setSelectedType(value)}
          >
            <SelectTrigger className="h-[25px] p-0 text-black capitalize rounded-none border-none  focus:ring-0 focus-visible:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="capitalize">
              <SelectGroup>
                <SelectItem value="name" defaultChecked>
                  {searchByType.name}
                </SelectItem>
                <SelectItem value="sectors">{searchByType.sector}</SelectItem>
                <SelectItem value="categories">
                  {searchByType.category}
                </SelectItem>
                <SelectItem value="keyword">
                  {searchByType.equivalent}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Input
            className="p-0 rounded-none border-none text-black focus:ring-0 focus-visible:ring-0 h-[25px]"
            onChange={(e) => setQ(e.target.value)}
            value={q}
            style={{
              transition: 'placeholder 0.5s ease-in-out',
            }}
            type="text"
            placeholder={currentPlaceholder}
          />
        </div>
      </div>
      <div>
        <Button
          type="button"
          onClick={() => handleSearch(q)}
          className="rounded-full gap-2 p-0 h-[30px] px-4"
        >
          <Search size="15px" />
          {search}
        </Button>
      </div>
    </div>
  )
}
