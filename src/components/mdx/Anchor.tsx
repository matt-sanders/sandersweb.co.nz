import Link from 'next/link'

interface AnchorProps {
  children?: React.ReactNode
  href?: string
}
export function Anchor({ children, href }: AnchorProps) {
  if (!href) return children
  if (!href.startsWith('/')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }
  return <Link href={href}>{children}</Link>
}
