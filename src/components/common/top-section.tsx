import { PropsWithChildren } from 'react'
import Section from './section'

export default function TopSection({ children }: PropsWithChildren) {
  return <Section className="pt-[100px]">{children}</Section>
}
