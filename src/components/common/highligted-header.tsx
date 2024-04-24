import React, { PropsWithChildren } from 'react'
import Typography from '../ui/typography'

export default function HighligtedHeader({ children }: PropsWithChildren) {
  return (
    <div className="p-3 bg-primary rounded-sm mb-3">
      <Typography as="h6" className="font-semibold">
        {children}
      </Typography>
    </div>
  )
}
