import { ProjectRecord } from '@/domain/projects'
import { genTestID } from 'tests/utils/genTestID'
import { genTestString } from 'tests/utils/genTestString'
import { serialize } from 'next-mdx-remote/serialize'

interface TestProjectRecord extends ProjectRecord {
  markdown: string
}

export const genTestProjectRecord = async (
  overrides: Partial<TestProjectRecord> = {},
): Promise<TestProjectRecord> => {
  const markdown = genTestString()
  const { compiledSource } = await serialize(markdown, {
    parseFrontmatter: true,
  })
  return {
    bgColor: 'bg-dark-900',
    mdxContent: compiledSource,
    company: genTestString(),
    icon: null,
    name: genTestString(),
    slug: genTestID(),
    tech: [genTestString(), genTestString()],
    order: 1,
    markdown,
    ...overrides,
  }
}
