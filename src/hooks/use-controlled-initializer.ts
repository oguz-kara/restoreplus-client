import React, { SetStateAction } from 'react'

export default function useControlledInitializer<T = any>(initialValue: T) {
  const [initialValueSetted, setInitialValueSetted] =
    React.useState<boolean>(false)
  const [value, setValue] = React.useState<T>(initialValue)

  React.useEffect(() => {
    if (!initialValueSetted && initialValue) {
      setValue(initialValue)
      setInitialValueSetted(true)
    }
  }, [initialValue, initialValueSetted])

  return [value, setValue] as [T, React.Dispatch<SetStateAction<T>>]
}
