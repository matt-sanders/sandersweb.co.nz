import { Container } from '@/components/Container/Container'
import { ProjectCard } from '@/components/ProjectCard/ProjectCard'
import { ProjectRecord } from '@/domain/projects'
import { getAllProjects } from '@/lib/api'
import clsx from 'clsx'
import { GetStaticProps } from 'next'
import { useRef } from 'react'
import { PageLayout } from '@/layouts/PageLayout/PageLayout'
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'
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

function Intro() {
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

interface RevealCharProps {
  char: string
  progress: MotionValue<number>
  offset: number
}
function RevealChar({ char, progress, offset }: RevealCharProps) {
  const speed = 0.15
  const delay = 0.1
  const transformTimes = [delay + offset, delay + offset + speed]
  const yPos = useTransform(progress, transformTimes, ['100%', '0%'])
  const opacity = useTransform(progress, transformTimes, [0, 1])
  return (
    <motion.span className="inline-block" style={{ y: yPos, opacity }}>
      {char === ' ' ? <>&nbsp;</> : char}
    </motion.span>
  )
}

interface RevealTextProps {
  text: string
  progress: MotionValue<number>
}
function RevealText({ text, progress }: RevealTextProps) {
  const chars = text.split('')
  // we want all the text to be visible within 70% of the scroll progress
  const offsetMultiplier = 0.7 / chars.length
  // assign the character offset to each one, to be used when we map this back to words
  const charMap = chars.map((char, index) => ({
    char,
    offset: index * offsetMultiplier,
  }))
  // Each char is eventually going to be wrapped in a span with inline-block applied to it.
  // This will result in some funky word breaks.
  // To amend this, we need to wrap each set of characters in a span also.
  const words = charMap.reduce<(typeof charMap)[number][][]>(
    (accumulator, char) => {
      if (char.char === ' ') {
        return [...accumulator, [char], []]
      }
      const nextAccumulator = [...accumulator]
      const lastWord = nextAccumulator.pop()
      if (!lastWord) {
        return [[char]]
      }
      return [...nextAccumulator, [...lastWord, char]]
    },
    [],
  )
  return (
    <span>
      {words.map((word, wordIdx) => (
        <span className="inline-block" key={wordIdx}>
          {word.map((char, charIndex) => (
            <RevealChar
              key={charIndex}
              char={char.char}
              offset={char.offset}
              progress={progress}
            />
          ))}
        </span>
      ))}
    </span>
  )
}

function About() {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'start start'],
  })
  return (
    <div className="relative h-screen" ref={targetRef}>
      <Container className="pt-24px sticky top-0">
        <h1 className="text-shadow shadow-secondary-900 text-heading-900 mb-48px">
          I&apos;m Matt
        </h1>
        <p className="text-700 max-w-2xl">
          <RevealText
            text="I make cool stuff and have been doing so for the last 12 years. From APIs and integrations to spiffy front end animations, I do it all. Check out some of the things I've worked on below."
            progress={scrollYProgress}
          />
        </p>
      </Container>
    </div>
  )
}

export default function Home({ projects }: Props) {
  return (
    <PageLayout>
      <main>
        <Intro />
        <About />
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
