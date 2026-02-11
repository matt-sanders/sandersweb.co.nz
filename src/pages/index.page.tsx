import { ProjectRecord } from '@/domain/projects'
import { getAllProjects } from '@/lib/api'
import { GetStaticProps } from 'next'
import { PageLayout } from '@/layouts/PageLayout/PageLayout'
import { About } from '@/pages/index/About'
import { Intro } from '@/pages/index/Intro'
import { Projects } from '@/pages/index/Projects'

const YEAR_STARTED = 2012

interface Props {
  projects: ProjectRecord[]
  yearsActive: number
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const projects = await getAllProjects()

  const currentYear = new Date().getFullYear()

  return {
    props: {
      projects,
      yearsActive: Math.floor(currentYear - YEAR_STARTED),
    },
  }
}

export default function Home({ projects, yearsActive }: Props) {
  return (
    <PageLayout>
      <main>
        <Intro />
        <About yearsActive={yearsActive} />
        <Projects projects={projects} />
      </main>
    </PageLayout>
  )
}
