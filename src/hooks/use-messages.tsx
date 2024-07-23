import { useToast } from '@/components/ui/use-toast'
import { Check } from 'lucide-react'
import React from 'react'

export default function useMessages() {
  const { toast } = useToast()

  const showErrorMessage = (message?: string) => {
    toast({
      variant: 'destructive',
      title: 'İşlem başarısız!',
      description: message,
    })
  }

  const removedSuccessfully = (message?: string) => {
    toast({
      description: (
        <div className="flex items-center gap-1">
          <span>
            <Check size="20px" color="green" />
          </span>
          <br />
          <span>Kayıt başarıyla silindi.</span>
          {message && <div>{message}</div>}
        </div>
      ),
    })
  }

  const updatedSuccessfully = (message?: string) => {
    toast({
      description: (
        <div className="flex items-center gap-1">
          <span>
            <Check size="20px" color="green" />
          </span>
          <br />
          <span>Kayıt başarıyla güncellendi.</span>
          {message && <div>{message}</div>}
        </div>
      ),
    })
  }

  const createdSuccessfully = (message?: string) => {
    toast({
      description: (
        <div className="flex items-center gap-1">
          <span>
            <Check size="20px" color="green" />
          </span>
          <br />
          <span>Kayıt başarıyla oluşturuldu.</span>
          {message && <div>{message}</div>}
        </div>
      ),
    })
  }

  const showSuccessMessage = (message?: string) => {
    toast({
      variant: 'default',
      description: (
        <div className="flex items-center gap-1">
          <span>
            <Check size="20px" color="green" />
          </span>
          <br />
          <span>İşlem başarılı!</span>
          {message && <div>{message}</div>}
        </div>
      ),
    })
  }

  return {
    showErrorMessage,
    showSuccessMessage,
    createdSuccessfully,
    updatedSuccessfully,
    removedSuccessfully,
  }
}
