export const getSearchParam = ({
  name,
  value,
  searchParams,
}: {
  name: string
  value: string
  searchParams: any
}) => {
  // @ts-ignore
  const current = new URLSearchParams(Array.from(searchParams.entries()))

  if (!value) current.delete(name)
  else current.set(name, value)

  const search = current.toString()

  return search ? `?${search}` : ''
}
