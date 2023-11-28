import { MDXRemote } from 'next-mdx-remote'
import { Anchor } from '@/components/Markdown/Anchor'

export const mdxComponents = {
  a: Anchor,
}

interface MarkdownProps {
  mdxContent: string
}
export function Markdown({ mdxContent }: MarkdownProps) {
  return (
    <MDXRemote
      compiledSource={mdxContent}
      scope={{}}
      frontmatter={{}}
      components={mdxComponents}
    />
  )
}
