'use client'
import React from 'react'
import { Input } from '../ui/input'
import { cn } from '@/lib/utils'
import { Button } from '../ui/button'
import { useDictionary } from '@/context/use-dictionary'
import { useLoading } from '@/hooks/use-loading'
import { useToast } from '../ui/use-toast'
import { clientFetcher } from '@/lib/client-fetcher'

export default function RegisterEmail() {
  const [email, setEmail] = React.useState<string>('')
  const { loading, startLoading, stopLoading } = useLoading()
  const { toast } = useToast()

  const {
    dictionary: {
      common: { registerEmail },
      registerEmailMessages,
    },
  } = useDictionary()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      startLoading()
      const data = await clientFetcher('/email-request', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log(data)

      if (data.success) {
        toast({
          title: registerEmailMessages.successfully,
        })

        return
      }

      toast({
        variant: 'destructive',
        title: data?.message?.includes('Unique')
          ? registerEmailMessages.uniqueError
          : registerEmailMessages.errorMessage,
      })

      return
    } catch (err: any) {
      console.log(err)
    } finally {
      stopLoading()
    }
  }

  return (
    <div>
      <Input
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        type="email"
        className={cn(
          'bg-transparent py-3 rounded-sm border border-gray-400 text-black mb-2 bg-white'
        )}
        placeholder={registerEmailMessages.placeholder}
      />
      <Button
        loading={loading}
        className="font-semibold"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,217,0,1) 0%, rgba(255,221,33,1) 35%, rgba(255,225,51,1) 100%)',
        }}
        onClick={handleSubmit}
      >
        {registerEmail}
      </Button>
    </div>
  )
}
