'use client'
import clsx from 'clsx'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface ShadowProps {
  children: React.ReactNode
  className?: string
  popDelayMs?: number
}
export function Shadow({ children, className, popDelayMs }: ShadowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref)
  return (
    <div className={clsx('relative inline-block', className)} ref={ref}>
      <div
        className={clsx(
          'bg-secondary-900 ease-bounce absolute left-0 top-0 h-full w-full transform rounded border-2 transition duration-300',
          {
            '-translate-x-shadow-offset translate-y-shadow-offset': isInView,
          },
        )}
        style={{
          transitionDelay: popDelayMs ? `${popDelayMs}ms` : undefined,
        }}
      />
      <div className="border-dark-900 bg-light-900 relative rounded border-2">
        {children}
      </div>
    </div>
  )
}
