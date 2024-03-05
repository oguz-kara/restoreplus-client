import React from 'react'
import Logo from './logo'
import Typography from '../ui/typography'
import { Button } from '../ui/button'

interface InfoCardProps {
  data: {
    title: string
    text: string
    buttonText: string
  }
}

export default function InfoCard({ data }: InfoCardProps) {
  return (
    <div className="border-b border-dashed border-gray-400 lg:border-none h-full w-full lg:w-64 lg:h-[400px] flex-1 bg-foreground text-white p-5 lg:rounded-sm">
      <Logo className="mb-5" width={100} height={100} />
      <Typography as="h3" className="mb-5">
        {data.title}
      </Typography>
      <Typography as="p" className="mb-5">
        {data.text}
      </Typography>
      <Button className="w-full lg:w-auto">{data.buttonText}</Button>
    </div>
  )
}
