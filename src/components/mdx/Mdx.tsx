import { MDXRemote } from 'next-mdx-remote'
import { Anchor } from '@/components/Mdx/Anchor'

export const mdxComponents = {
  a: Anchor,
}

interface MdxProps {
  mdxContent: string
}
export function Mdx({ mdxContent }: MdxProps) {
  return (
    <MDXRemote
      compiledSource={mdxContent}
      scope={{}}
      frontmatter={{}}
      components={mdxComponents}
    />
  )
}
