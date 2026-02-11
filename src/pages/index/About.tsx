import { Container } from '@/components/Container/Container'
import { useRef } from 'react'
import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'

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

interface AboutProps {
  yearsActive: number
}

export function About({ yearsActive }: AboutProps) {
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'start start'],
  })
  return (
    <div className="relative h-screen" ref={targetRef}>
      <Container className="sticky top-0 py-24px">
        <h1 className="mb-48px text-heading-900 shadow-secondary-900 text-shadow">
          I&apos;m Matt
        </h1>
        <p className="max-w-2xl text-700">
          <RevealText
            text={`I make cool stuff and have been doing so for the last ${yearsActive} years. From APIs and integrations to spiffy front end animations, I do it all. Check out some of the things I've worked on below.`}
            progress={scrollYProgress}
          />
        </p>
      </Container>
    </div>
  )
}
