import React, { PropsWithChildren } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import Typography from '../ui/typography'

export default function ToolTipStyled({
  children,
  text,
}: PropsWithChildren & { text?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger className="block">{children}</TooltipTrigger>
      <TooltipContent>
        <Typography>{text}</Typography>
      </TooltipContent>
    </Tooltip>
  )
}
