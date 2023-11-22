import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { Logo } from '@/components/Logo/Logo'

export function Intro() {
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
