import React from 'react'
import Typography from '../ui/typography'

export default function SecondaryMessage({
  title,
  description,
  footerComp,
}: {
  title: string
  description: string
  footerComp?: any
}) {
  return (
    <div className="min-h-40 p-5 border bg-secondary rounded-md">
      <Typography as="h4" className="text-xl mb-2">
        {title}
      </Typography>
      <Typography>{description}</Typography>
      {footerComp}
    </div>
  )
}
