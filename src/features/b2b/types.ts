export interface Address {
  title: string
  authorizedPerson: string
  addressDescription: string
  country: string
  city: string
  district: string
  zipCode: string
  state: string
}

export interface ApplicantRegistrationResponseData {
  applicantFields: {
    city: string
    companyName: string
    country: string
    countryCodeForPhoneNumber: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    postalCode: string
    locale: string
    note: string | null
  }
  user: {
    name: string
    email: string
  } | null
  company: {
    name: string
    description: string
    website?: string
    phoneNumber: string
    fixedLine?: string
    taxNumber: string
  } | null
  shippingAddress: Address | null
  billingAddress: Address | null
}

export interface Company {
  name: string
  phoneNumber: string
  description?: string
  website?: string
  fixedLine?: string
  taxNumber?: string
  companyExists?: boolean
}

export interface NormalizedApplicantData {
  user: {
    email: string
    name: string
    userExists: boolean
  }
  company: Company
  shippingAddress: Address & { shippingAddressExists: boolean }
  billingAddress: Address & { billingAddressExists: boolean }
}

export interface NormalizedUserInputData {
  email: string
  name: string
  userExists: boolean
}
