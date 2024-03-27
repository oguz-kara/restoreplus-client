import React from 'react'
import Image from '../ui/image'

interface LogoProps {
  width?: number
  height?: number
  color?: 'white' | 'black'
}

export default function Logo({
  className,
  width = 200,
  height = 200,
  color = 'white',
}: PropsWithClassName & LogoProps) {
  if (color === 'black')
    return (
      <div>
        <Image
          src="/images/restoreplus-logo-black.png"
          alt="restoreplus logo"
          width={width}
          height={height}
          className={className}
        />
      </div>
    )

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
