import { mutationFunction } from '@/lib/mutation-function'
import {
  UseMutationResult,
  useMutation as reactMutation,
} from '@tanstack/react-query'

export const useMutation = <T>() => {
  const mutationResult = reactMutation({
    mutationFn: mutationFunction,
  })

  return mutationResult as UseMutationResult<T>
}
