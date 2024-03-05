import { ExclamationTriangleIcon, CheckIcon } from '@radix-ui/react-icons'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function AlertMessage({
  title,
  text,
  variant,
}: {
  title: string
  text?: string
  variant?: 'destructive' | 'success' | 'warn'
}) {
  if (variant === 'destructive')
    return (
      <Alert variant="destructive">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        {text && <AlertDescription>{text}</AlertDescription>}
      </Alert>
    )
  if (variant === 'success')
    return (
      <Alert variant="success">
        <CheckIcon className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        {text && <AlertDescription>{text}</AlertDescription>}
      </Alert>
    )

  if (variant === 'warn')
    return (
      <Alert variant="warn">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        {text && <AlertDescription>{text}</AlertDescription>}
      </Alert>
    )

  return (
    <Alert variant="default">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      {text && <AlertDescription>{text}</AlertDescription>}
    </Alert>
  )
}
