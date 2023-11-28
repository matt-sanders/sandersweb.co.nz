import { Mdx } from '@/components/Mdx/Mdx'
import { render, screen } from '@testing-library/react'
import { serialize } from 'next-mdx-remote/serialize'
import { expect, test, describe } from 'vitest'
import { genTestString } from 'tests/utils/genTestString'
import { genTestID } from 'tests/utils/genTestID'

test('renders markdown', async () => {
  const content = genTestString()
  const mdxContent = await serialize(content)
  render(<Mdx mdxContent={mdxContent.compiledSource} />)
  expect(screen.getByText(content)).toBeInTheDocument()
})

describe('components', () => {
  describe('Anchor', () => {
    const linkContent = genTestString()
    test('no href', async () => {
      const content = `[${linkContent}]()`
      const mdxContent = await serialize(content)
      render(<Mdx mdxContent={mdxContent.compiledSource} />)
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
      expect(screen.getByText(linkContent)).toBeInTheDocument()
    })

    test('external url', async () => {
      const href = `https://test.com/${genTestID()}`
      const content = `[${linkContent}](${href})`
      const mdxContent = await serialize(content)
      render(<Mdx mdxContent={mdxContent.compiledSource} />)
      const anchor = screen.getByRole('link', { name: linkContent })
      expect(anchor).toBeInTheDocument()
      expect(anchor).toHaveAttribute('href', href)
      expect(anchor).toHaveAttribute('target', '_blank')
      expect(anchor).toHaveAttribute('rel', 'noopener noreferrer')
    })

    test('internal url', async () => {
      const href = `/${genTestID()}`
      const content = `[${linkContent}](${href})`
      const mdxContent = await serialize(content)
      render(<Mdx mdxContent={mdxContent.compiledSource} />)
      const anchor = screen.getByRole('link', { name: linkContent })
      expect(anchor).toBeInTheDocument()
      expect(anchor).toHaveAttribute('href', href)
      expect(anchor).not.toHaveAttribute('target', '_blank')
      expect(anchor).not.toHaveAttribute('rel', 'noopener noreferrer')
    })
  })
})
