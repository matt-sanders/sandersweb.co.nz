import { Container } from '@/components/Container/Container'
import { ProjectCard } from '@/components/ProjectCard/ProjectCard'
import { ProjectRecord } from '@/domain/projects'
import { getAllProjects } from '@/lib/api'
import clsx from 'clsx'
import { GetStaticProps } from 'next'
import { useRef } from 'react'
import { PageLayout } from '@/layouts/PageLayout/PageLayout'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Logo } from '@/components/Logo/Logo'

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

function HiContainer() {
  const screenOneRef = useRef(null)
  const { scrollYProgress: screenOneScrollYProgress } = useScroll({
    target: screenOneRef,
    offset: ['start end', 'end start'],
  })
  const textTimes = [0, 0.1, 0.5]
  const textYPos = useTransform(
    screenOneScrollYProgress,
    textTimes,
    ['0%', '-50%', '50%'],
    {},
  )
  const textScale = useTransform(screenOneScrollYProgress, textTimes, [1, 1, 0])
  const waveOpacity = useTransform(
    screenOneScrollYProgress,
    [0.2, 0.5, 0.7, 1],
    [0, 1, 1, 0],
  )
  const waveRotation = useTransform(
    screenOneScrollYProgress,
    [0.2, 0.4, 0.8, 1],
    [-270, 90, -45, 90],
  )
  return (
    <div className="relative h-[300vh]">
      <div className="sticky top-0 h-screen">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <motion.div
            style={{
              y: textYPos,
              scale: textScale,
              opacity: textScale,
            }}
          >
            <Logo />
            <div className="text-heading-900 text-shadow shadow-secondary-900 mt-48px">
              Hey there!
            </div>
          </motion.div>
        </div>
        <div className="absolute right-1/2 top-1/2 -translate-y-1/2 transform">
          <motion.div
            className="text-heading-900"
            style={{
              rotate: waveRotation,
              transformOrigin: 'right bottom',
              opacity: waveOpacity,
            }}
          >
            👋
          </motion.div>
        </div>
      </div>
      <div ref={screenOneRef} className="h-screen" />
    </div>
  )
}

export default function Home({ projects }: Props) {
  return (
    <PageLayout>
      <main>
        <HiContainer />
        <div className="relative h-screen">
          <Container className="sticky top-0">
            <h1 className="text-shadow shadow-secondary-900 text-heading-900 mb-48px">
              I&apos;m Matt
            </h1>
            <p className="text-700 max-w-2xl">
              I make cool stuff and have been doing so for the last 12 years.
              From APIs and integrations to spiffy front end animations, I do it
              all. Check out some of the things I&apos;ve worked on below.
            </p>
          </Container>
        </div>
        <Container>
          <section className="my-72px" id="projects">
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
