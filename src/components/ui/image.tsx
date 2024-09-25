import { remoteUrl } from '@/config/get-env-fields'
import serverConfig from '@/config/server-config.json'
import NextImage from 'next/image'
import { ImageProps } from 'next/image'

export default function Image({ ...props }: ImageProps) {
  return <NextImage blurDataURL="/images/product-placeholder.png" {...props} />
}

export function ServerImage({ ...props }: ImageProps) {
  return (
    <NextImage
      blurDataURL="/images/product-placeholder.png"
      {...props}
      src={`${remoteUrl}${props.src}`}
    />
  )
}
