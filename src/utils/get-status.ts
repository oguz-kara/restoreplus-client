interface StatusTranslation {
  created: string
  approved: string
  cancelled: string
  delivered: string
  declined: string
  shipped: string
  refunded: string
  unknown: string
}

export const getStatus = (status: string, translation: StatusTranslation) => {
  switch (status) {
    case 'CREATED':
      return translation.created

    case 'APPROVED':
      return translation.approved

    case 'CANCELLED':
      return translation.cancelled

    case 'DELIVERED':
      return translation.delivered

    case 'DECLINED':
      return translation.declined

    case 'SHIPPED':
      return translation.shipped

    case 'REFUNDED':
      return translation.refunded

    default:
      return translation.unknown
  }
}
