export function formatPrice(price: number, currencyCode: string) {
  if (isNaN(price)) {
    return 'Invalid price'
  }

  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
    minimumFractionDigits: 2,
  })

  return formatter.format(price)
}
