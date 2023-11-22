import { ProjectRecord } from '@/domain/projects'
import fs from 'fs'
import { serialize } from 'next-mdx-remote/serialize'
import { join } from 'path'

const projectsDirectory = join(process.cwd(), 'src/projects')

function getProjectSlugs() {
  return fs.readdirSync(projectsDirectory)
}

function toString(s: unknown): string | null
function toString<TDefault>(
  s: unknown,
  defaultValue: TDefault,
): string | TDefault
function toString(s: unknown, defaultValue = null) {
  return typeof s === 'string' ? s : defaultValue
}

export async function getProjectBySlug(slug: string): Promise<ProjectRecord> {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(projectsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { frontmatter, compiledSource } = await serialize(fileContents, {
    parseFrontmatter: true,
  })
  const techRaw = Array.isArray(frontmatter.tech) ? frontmatter.tech : []
  const tech = techRaw.filter(
    (item): item is string => item && typeof item === 'string',
  )

  return {
    bgColor: toString(frontmatter.bgColor),
    content: compiledSource,
    company: toString(frontmatter.company),
    icon: toString(frontmatter.icon),
    name: toString(frontmatter.title, 'Untitled'),
    slug: realSlug,
    order: Number(frontmatter.order),
    tech,
  }
}

export async function getAllProjects() {
  const slugs = getProjectSlugs()
  const projects = await Promise.all(
    slugs.map((slug) => getProjectBySlug(slug)),
  )
  return projects.sort((projectA, projectB) => projectA.order - projectB.order)
}
