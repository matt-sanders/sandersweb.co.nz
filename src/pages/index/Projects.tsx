import { Container } from '@/components/Container/Container'
import { ProjectRecord } from '@/domain/projects'
import { useRef, useState } from 'react'
import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
  useMotionValueEvent,
} from 'framer-motion'
import { ProjectView } from '@/components/ProjectView/ProjectView'

interface ExplodeStringProps {
  text: string
  progress: MotionValue<number>
  moveUp?: boolean
  maxYPos: number
}
function ExplodeString({
  text,
  progress,
  moveUp,
  maxYPos,
}: ExplodeStringProps) {
  const upOrDown = moveUp ? -1 : 1
  const yPos = useTransform(
    progress,
    [0, 0.1, 1],
    ['0%', `${maxYPos * upOrDown}%`, `${50 * upOrDown}%`],
  )
  const opacity = useTransform(progress, [0.1, 0.8], [1, 0])
  return (
    <motion.span style={{ y: yPos, opacity }} className="inline-block">
      {text}
    </motion.span>
  )
}

interface ProjectsProps {
  projects: ProjectRecord[]
}
export function Projects({ projects }: ProjectsProps) {
  const enterRef = useRef(null)
  const explodeRef = useRef(null)
  const { scrollYProgress: enterProgress } = useScroll({
    target: enterRef,
    offset: ['start end', 'end start'],
  })
  const { scrollYProgress: explodeProgress } = useScroll({
    target: explodeRef,
    offset: ['start end', 'end start'],
  })
  const opacity = useTransform(enterProgress, [0.25, 0.5], [0, 1])
  const [showOutline, setShowOutline] = useState(false)
  useMotionValueEvent(explodeProgress, 'change', (value) =>
    setShowOutline(value > 0),
  )
  const outlineStyles = {
    color: '#fff',
    WebkitTextStroke: '0.05em #000',
  }
  return (
    <section>
      <div className="bg-secondary-900 relative">
        <Container className="sticky top-1/2">
          <motion.h2
            className="text-heading-700 text-center"
            style={{
              opacity,
              ...(showOutline ? outlineStyles : {}),
            }}
          >
            <ExplodeString
              text="P"
              progress={explodeProgress}
              moveUp
              maxYPos={15}
            />
            <ExplodeString text="r" progress={explodeProgress} maxYPos={5} />
            <ExplodeString text="o" progress={explodeProgress} maxYPos={20} />
            <ExplodeString text="j" progress={explodeProgress} maxYPos={30} />
            <ExplodeString
              text="e"
              progress={explodeProgress}
              moveUp
              maxYPos={1}
            />
            <ExplodeString text="c" progress={explodeProgress} maxYPos={15} />
            <ExplodeString
              text="t"
              progress={explodeProgress}
              moveUp
              maxYPos={8}
            />
            <ExplodeString text="s" progress={explodeProgress} maxYPos={0} />
          </motion.h2>
        </Container>
        <div ref={enterRef} className="h-screen" />
        <div ref={explodeRef} className="h-screen" />
        <div className="h-50vh" />
      </div>
      <div>
        {projects.map((project, idx) => (
          <div key={project.slug}>
            {idx > 0 && (
              <Container>
                <hr className="border-dark-900 opacity-40" />
              </Container>
            )}
            <div className="my-72px">
              <ProjectView project={project} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
