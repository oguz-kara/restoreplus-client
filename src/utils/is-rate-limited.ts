export const checkIsRateLimited = (data: any) => {
  if (typeof data === 'object' && Array.isArray(data))
    return data.find((item) => item.message === 'rate_limited')
  else if (typeof data === 'object' && Object.keys(data).length > 0)
    return data.message === 'rate_limited'
  else return false
}
