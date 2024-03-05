import React from 'react'
import Image from '../ui/image'


interface LogoProps {
  width?: number
  height?: number
}

export default function Logo({ className, width = 200, height = 200 }: PropsWithClassName & LogoProps) {
  return (
    <div>
      <Image
        src="/images/restoreplus-logo.png"
        alt="restoreplus logo"
        width={width}
        height={height}
        className={className}
      />
    </div>
  )
}
