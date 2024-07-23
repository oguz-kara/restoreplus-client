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
  const renderButHide = 'w-0 h-0 overflow-hidden'

  return (
    <>
      <div className={color === 'white' ? renderButHide : ''}>
        <Image
          src="/images/restoreplus-logo-black.png"
          alt="restoreplus logo"
          width={width}
          height={height}
          className={className}
          priority
        />
      </div>
      <div className={color === 'black' ? renderButHide : ''}>
        <Image
          src="/images/restoreplus-logo.png"
          alt="restoreplus logo"
          width={width}
          height={height}
          className={className}
          priority
        />
      </div>
    </>
  )
}
