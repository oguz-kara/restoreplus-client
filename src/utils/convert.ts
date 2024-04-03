export const convertToSearch = (searchBy: string[], term: string) => {
  const result: any = {}
  searchBy.forEach((item) => {
    result[item] = term
  })
  return { search: result }
}
