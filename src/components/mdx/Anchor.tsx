import Link from 'next/link'

interface AnchorProps {
  children?: React.ReactNode
  href?: string
}
export function Anchor({ children, href }: AnchorProps) {
  if (!href) return children
  return <Link href={href}>{children}</Link>
}
