import {
  ApplicantRegistrationResponseData,
  NormalizedApplicantData,
} from './types'

export const normalizeApplicantRegistrationResponseData = (
  data: ApplicantRegistrationResponseData | null
) => {
  if (!data)
    return {
      user: null,
      company: null,
      shippingAddress: null,
      billingAddress: null,
    }

  const { applicantFields, billingAddress, company, shippingAddress, user } =
    data

  const {
    city,
    companyName,
    country,
    countryCodeForPhoneNumber,
    email,
    firstName,
    lastName,
    locale,
    note,
    phoneNumber,
    postalCode,
  } = applicantFields

  const normalizedUser = user
    ? {
        name: user.name,
        email: user.email,
        userExists: true,
      }
    : {
        name: `${firstName} ${lastName}`,
        email,
        userExists: false,
      }

  const normalizedCompany = company
    ? { ...company, companyExists: true }
    : {
        name: companyName,
        phoneNumber: `${countryCodeForPhoneNumber}${phoneNumber}`,
        companyExists: false,
      }

  const normalizedShippingAddress = shippingAddress
    ? { ...shippingAddress, shippingAddressExists: true }
    : {
        city,
        country,
        zipCode: postalCode,
      }

  const normalizedBillingAddress = billingAddress
    ? { ...billingAddress, billingAddressExists: true }
    : {
        city,
        country,
        zipCode: postalCode,
      }

  return {
    user: normalizedUser,
    company: normalizedCompany,
    shippingAddress: normalizedShippingAddress,
    billingAddress: normalizedBillingAddress,
  } as NormalizedApplicantData
}
