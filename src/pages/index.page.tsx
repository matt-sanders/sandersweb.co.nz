import { ProjectRecord } from '@/domain/projects'
import { getAllProjects } from '@/lib/api'
import { GetStaticProps } from 'next'
import { PageLayout } from '@/layouts/PageLayout/PageLayout'
import { About } from '@/pages/index/About'
import { Intro } from '@/pages/index/Intro'
import { Projects } from '@/pages/index/Projects'

interface Props {
  projects: ProjectRecord[]
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projects = await getAllProjects()

  return {
    props: {
      projects,
    },
  }
}

export default function Home({ projects }: Props) {
  return (
    <PageLayout>
      <main>
        <Intro />
        <About />
        <Projects projects={projects} />
      </main>
    </PageLayout>
  )
}
