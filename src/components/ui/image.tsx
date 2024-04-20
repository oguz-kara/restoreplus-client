import serverConfig from '@/config/server-config.json'
import NextImage from 'next/image'
import { ImageProps } from 'next/image'

export default function Image({ ...props }: ImageProps) {
  return <NextImage {...props} />
}

export function ServerImage({ ...props }: ImageProps) {
  return <NextImage {...props} src={`${serverConfig.remoteUrl}${props.src}`} />
}
