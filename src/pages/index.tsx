'use client'
import { Container } from '@/components/Container/Container'
import { ProjectCard } from '@/components/ProjectCard/ProjectCard'
import { ProjectRecord } from '@/domain/projects'
import { getAllProjects } from '@/lib/api'
import clsx from 'clsx'
import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { PageLayout } from '@/layouts/PageLayout/PageLayout'

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
  const [ready, setReady] = useState(false)
  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <PageLayout>
      <main>
        <Container>
          <h1 className="text-heading-900 mt-48px md:mt-72px mb-72px md:mb-124px">
            <span className="block">
              <RevealText text="Freelance" reveal={ready} idx={1} />{' '}
            </span>
            <span className="block">
              <RevealText text="full" reveal={ready} idx={2} />{' '}
              <RevealText text="stack" reveal={ready} idx={3} />{' '}
            </span>
            <span className="block">
              <RevealText text="developer." reveal={ready} idx={4} />
            </span>
          </h1>
          <p className="text-700 max-w-2xl">
            Hi, I&apos;m Matt. I make cool stuff and have been doing so for the
            last 12 years. From APIs and integrations to spiffy front end
            animations, I do it all. Check out some of the things I&apos;ve
            worked on below.
          </p>
          <section className="my-72px">
            <h2 className="text-heading-700 mb-24px md:mb-48px">Projects</h2>
            <ul className="gap-24px grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {projects.map((project) => (
                <li key={project.slug}>
                  <ProjectCard project={project} className="h-full" />
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </main>
    </PageLayout>
  )
}

interface RevealTextProps {
  text: string
  reveal: boolean
  idx: number
}
function RevealText({ text, reveal, idx }: RevealTextProps) {
  const offset = 100
  const delayBase = 300
  const delayMs = delayBase + offset * idx
  return (
    <span className="inline-block overflow-hidden">
      <span
        className={clsx('inline-block transform transition', {
          'translate-y-full': !reveal,
        })}
        style={{
          transitionDelay: `${delayMs}ms`,
        }}
      >
        <span
          aria-hidden
          className={clsx(
            'text-secondary-900 ease-bounce absolute left-0 top-0 transform transition delay-1000',
            {
              'translate-y-shadow-offset -translate-x-shadow-offset': reveal,
            },
          )}
        >
          {text}
        </span>
        <span className="relative">{text}</span>
      </span>
    </span>
  )
}
