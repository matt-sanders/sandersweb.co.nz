import { ProjectRecord } from '@/domain/projects'
import { getAllProjects, getProjectBySlug } from '@/lib/api'
import { GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'

interface Props {
  layout: string
  project: ProjectRecord
}

export const getStaticPaths = async () => {
  const projects = await getAllProjects()
  return Promise.resolve({
    fallback: false,
    paths: projects.map((project) => ({
      params: {
        projectSlug: project.slug,
      },
    })),
  })
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = Array.isArray(params?.projectSlug)
    ? params?.projectSlug[0]
    : params?.projectSlug
  if (!slug)
    return {
      notFound: true,
    }

  const project = await getProjectBySlug(slug)
  return {
    props: {
      layout: 'ProjectLayout',
      project,
    },
  }
}

export default function ProjectPage({ project }: Props) {
  return (
    <MDXRemote compiledSource={project.content} scope={{}} frontmatter={{}} />
  )
}
