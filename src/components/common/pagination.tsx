'use client'
import { useSearchParams } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import paginationConfig from '@/config/pagination-config.json'
import { useDictionary } from '@/context/use-dictionary-v2'

interface PaginationProps {
  url: string
  total: number
}

export default function Paginate({ url, total }: PaginationProps) {
  const { lang } = useDictionary()
  const searchParams = useSearchParams()
  let page = searchParams.get('page')
  let take = searchParams.get('take')
  page = page ? page : '1'
  take = take ? take : paginationConfig.take

  const currentPage = parseInt(page, 10)
  const itemsPerPage = parseInt(take, 10)
  const totalPages = Math.ceil(total / itemsPerPage)

  const generatePageNumbers = () => {
    const maxPagesToShow = 5
    const pageNumbers = []

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  const pages = generatePageNumbers()
  const isFirstPage = currentPage === 1
  const isLastPage = currentPage === totalPages

  if (total === 0) return <h2 className="text-2xl">Veri bulunamadı.</h2>

  return (
    <Pagination className="my-5">
      <PaginationContent>
        {isFirstPage ? null : (
          <PaginationItem>
            <PaginationPrevious
              lang={lang}
              href={`${url}?page=${currentPage - 1}&take=${itemsPerPage}`}
              disabled={isFirstPage}
            />
          </PaginationItem>
        )}

        {pages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              lang={lang}
              href={`${url}?page=${pageNumber}&take=${itemsPerPage}`}
              isActive={pageNumber === currentPage}
              disabled={pageNumber === currentPage}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {isLastPage ? null : (
          <PaginationItem>
            <PaginationNext
              lang={lang}
              href={`${url}?page=${currentPage + 1}&take=${itemsPerPage}`}
              disabled={isLastPage}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
