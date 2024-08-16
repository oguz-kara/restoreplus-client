'use client'
import { Button } from '@/components/ui/button'
import { Step, Stepper, useStepper } from '@/components/ui/stepper'
import { useDictionary } from '@/context/use-dictionary'
import B2BRegisterUserForm from './b2b-register-user-form'
import { Locale } from '@/i18n/types'
import B2BRegisterUserCompanyForm from './b2b-register-user-company-form'
import B2BRegisterUserAddressForm from './b2b-register-user-address-form'
import {
  Address,
  ApplicantRegistrationResponseData,
  NormalizedApplicantData,
} from '../types'
import { normalizeApplicantRegistrationResponseData } from '../helpers'
import { useEffect, useState } from 'react'
import { useMutation } from '@/hooks/use-mutation'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import b2bRegisterUserCompanySchema from '../schema/b2b-register-user-company.schema'
import { useSearchParams } from 'next/navigation'
import b2bRegisterUserAddressSchema, {
  B2BRegisterUserAddressDataType,
} from '../schema/b2b-register-address.shema'
import Typography from '@/components/ui/typography'
import Link from '@/components/ui/link'

interface UserFields {
  email: string
  name: string
  password: string
  confirmPassword: string
}

interface CompanyFields {
  name: string
  description?: string
  phoneNumber: string
  fixedLine?: string
  taxNumber?: string
}

export default function B2BRegistrationStepper({
  lang,
  registrationInfo,
}: {
  lang: Locale
  registrationInfo: ApplicantRegistrationResponseData | null
}) {
  const searchParams = useSearchParams()
  const [userFields, setUserFields] = useState<UserFields | null>(null)
  const [userCompanyFields, setUserCompanyFields] =
    useState<CompanyFields | null>(null)
  const [userAddressFields, setUserAddressFields] = useState<{
    shippingAddress?: B2BRegisterUserAddressDataType
    billingAddress?: B2BRegisterUserAddressDataType
    isSame: boolean
  } | null>(null)
  const { mutateAsync: mutate, isPending: isRegisterUserPending } = useMutation<
    { name: string; email: string } | { message: string }
  >()
  const isPending = isRegisterUserPending

  const [error, setError] = useState<{
    title: string
    description: string
  } | null>(null)

  const normalizedUserInputData =
    normalizeApplicantRegistrationResponseData(registrationInfo)
  const { user } = normalizedUserInputData

  const {
    dictionary: { b2bCompleteRegistrationPage },
  } = useDictionary()

  const steps = [
    { label: b2bCompleteRegistrationPage.step1.title, id: '1' },
    { label: b2bCompleteRegistrationPage.step2.title, id: '2' },
    { label: b2bCompleteRegistrationPage.step3.title, id: '3' },
  ]

  const handleUserRegistrationFormSubmit = async ({
    email,
    name,
    password,
    confirmPassword,
  }: {
    email: string
    name: string
    password: string
    confirmPassword: string
  }) => {
    if (password.length < 6) {
      setError({
        title: 'Error',
        description: 'password must be at least 6 characters',
      })
      return undefined
    }
    if (password !== confirmPassword) {
      setError({
        title: 'Error',
        description: 'passwords not matched',
      })
      return undefined
    } else setError(null)

    const result = await mutate({
      path: '/b2b/register-user',
      body: { email, name, password },
      method: 'POST',
    })

    if (Object.prototype.hasOwnProperty.call(result, 'message')) {
      setError({
        title: (result as any).message,
        description: (result as any).message,
      })

      return null
    }

    return result
  }

  const handleUserCompanyFormSubmit = async (data: CompanyFields | null) => {
    try {
      error && setError(null)
      b2bRegisterUserCompanySchema.parse(data)
      const token = searchParams.get('token')

      const result = await mutate({
        path: '/b2b/register-user/company',
        body: { ...data, token },
        method: 'POST',
      })

      if (Object.prototype.hasOwnProperty.call(result, 'message')) {
        setError({
          title: (result as any).message,
          description: (result as any).message,
        })

        return null
      }

      return result
    } catch (error: any) {
      console.error('Validation failed:', error.errors)
      const message =
        error.errors.reduce((acc: string, curr: any) => {
          return `${acc} ${curr.path.length > 0 ? curr.path[0] : ''}`
        }, '') +
        ' ' +
        'fields must be filled!'

      setError({ title: 'Error', description: message })

      return null
    }
  }

  const handleUserAddressFormSubmit = async (
    data: {
      billingAddress?: B2BRegisterUserAddressDataType
      shippingAddress?: B2BRegisterUserAddressDataType
      isSame: boolean
    } | null
  ) => {
    try {
      if (!data) {
        setError({ title: 'Error', description: 'Please enter an address' })
        return
      }
      const { billingAddress, shippingAddress, isSame } = data
      error && setError(null)
      b2bRegisterUserAddressSchema.parse(shippingAddress)

      if (!isSame) b2bRegisterUserAddressSchema.parse(billingAddress)

      const token = searchParams.get('token')

      const result = await mutate({
        path: '/b2b/register-user/address',
        body: { ...data, token },
        method: 'POST',
      })

      if (Object.prototype.hasOwnProperty.call(result, 'message')) {
        setError({
          title: (result as any).message,
          description: (result as any).message,
        })

        return null
      }

      return result
    } catch (error: any) {
      console.error('Validation failed:', error.errors)
      const message =
        error.errors.reduce((acc: string, curr: any) => {
          return `${acc} ${curr.path.length > 0 ? curr.path[0] : ''}`
        }, '') +
        ' ' +
        'fields must be filled!'

      setError({ title: 'Error', description: message })

      return null
    }
  }

  useEffect(() => {
    console.log({ userCompanyFields })
  }, [userCompanyFields])

  return (
    <div>
      <div className="flex w-full flex-col gap-4">
        {error && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>{error.title}</AlertTitle>
            <AlertDescription>{error.description}</AlertDescription>
          </Alert>
        )}
        <Stepper
          initialStep={0}
          steps={steps}
          state={
            error ? 'error' : isRegisterUserPending ? 'loading' : undefined
          }
        >
          <Step key={1} label={b2bCompleteRegistrationPage.step1.title}>
            <div className="flex items-center justify-center my-4 border bg-secondary rounded-md p-5">
              <B2BRegisterUserForm
                userData={user}
                lang={lang}
                onChange={(values) => setUserFields(values)}
                value={userFields}
              />
            </div>
          </Step>
          <Step key={2} label={b2bCompleteRegistrationPage.step2.title}>
            <div className="flex items-center justify-center my-4 border bg-secondary rounded-md p-5">
              <B2BRegisterUserCompanyForm
                onChange={(values) => setUserCompanyFields(values)}
                value={userCompanyFields}
                lang={lang}
              />
            </div>
          </Step>
          <Step key={3} label={b2bCompleteRegistrationPage.step3.title}>
            <div className="flex items-center justify-center my-4 border bg-secondary rounded-md p-5">
              <B2BRegisterUserAddressForm
                lang={lang}
                onChange={(values) => setUserAddressFields(values)}
                value={userAddressFields}
              />
            </div>
          </Step>

          <Footer
            userInputData={normalizedUserInputData as any}
            postUser={() => handleUserRegistrationFormSubmit(userFields!)}
            postCompany={() => handleUserCompanyFormSubmit(userCompanyFields)}
            postAddress={() => handleUserAddressFormSubmit(userAddressFields)}
            isPending={isPending}
            error={error}
            lang={lang}
          />
        </Stepper>
      </div>
    </div>
  )
}

const Footer = ({
  postUser,
  postCompany,
  postAddress,
  error,
  isPending,
  userInputData,
  lang,
}: {
  postUser: any
  postCompany?: any
  postAddress?: any
  error: { title: string; description: string } | null
  isPending: boolean
  userInputData: NormalizedApplicantData
  lang: string
}) => {
  const {
    dictionary: {
      b2bCompleteRegistrationPage: { b2bRegistrationCompleted },
    },
  } = useDictionary()
  const {
    nextStep,
    prevStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
    currentStep,
    setStep,
  } = useStepper()

  const handleNextButton = async () => {
    if (currentStep.id === '1') {
      const result = await postUser()

      if (result) return nextStep()
    } else if (currentStep.id === '2') {
      const result = await postCompany()

      if (result) return nextStep()
    } else if (currentStep.id === '3') {
      const result = await postAddress()

      if (result) return nextStep()
    }
  }

  useEffect(() => {
    if (userInputData) {
      const { user, company, billingAddress, shippingAddress } = userInputData
      if (user.userExists) setStep(1)
      if (company.companyExists) setStep(2)
      if (
        billingAddress.billingAddressExists &&
        shippingAddress.shippingAddressExists
      )
        setStep(3)
    }
  }, [])

  return (
    <>
      {hasCompletedAllSteps && (
        <div className="h-40 p-5 border bg-secondary rounded-md">
          <Typography as="h4" className="text-xl mb-2">
            {b2bRegistrationCompleted.title}
          </Typography>
          <Typography>{b2bRegistrationCompleted.description}</Typography>
          <Typography>
            {b2bRegistrationCompleted.gotoText} {` `}
            <Link
              href="/"
              className="text-blue-500 hover:underline"
              lang={lang as Locale}
            >
              {b2bRegistrationCompleted.homepageText}
            </Link>
          </Typography>
        </div>
      )}
      <div className="w-full flex justify-end gap-2">
        {hasCompletedAllSteps ? null : (
          <>
            <Button
              disabled={isDisabledStep}
              onClick={prevStep}
              size="sm"
              variant="secondary"
            >
              Prev
            </Button>
            <Button
              loading={isPending}
              size="sm"
              onClick={() => handleNextButton()}
            >
              {isLastStep ? 'Finish' : isOptionalStep ? 'Skip' : 'Next'}
            </Button>
          </>
        )}
      </div>
    </>
  )
}
