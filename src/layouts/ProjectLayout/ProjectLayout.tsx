import { Container } from '@/components/Container/Container'
import { ProjectIcons } from '@/components/ProjectIcons/ProjectIcons'
import { Shadow } from '@/components/Shadow/Shadow'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

interface ProjectLayoutProps {
  title: string
  bgColor?: string
  children: React.ReactNode
  icon?: string
  tech?: string[]
  company?: string
}
export function ProjectLayout({
  title,
  bgColor,
  children,
  icon,
  tech,
  company,
}: ProjectLayoutProps) {
  const [pageReady, setPageReady] = useState(false)
  useEffect(() => {
    setPageReady(true)
  }, [])

  const Icon = (icon && ProjectIcons[icon]) || ProjectIcons.Default
  return (
    <main>
      <Container>
        <Shadow className="my-48px w-full">
          <div
            className={clsx(
              'p-24px gap-24px md:gap-48px grid grid-cols-12 overflow-hidden',
              //'overflow-hidden transition-all delay-500 duration-500 ease-in',
              {
                // 'max-h-0 opacity-0': !pageReady,
                // 'max-h-[1000px] opacity-100': pageReady,
              },
            )}
          >
            <div
              className={clsx(
                'px-24px py-48px col-span-12 flex min-h-[100px] items-center justify-center rounded md:col-span-4',
                bgColor || 'bg-dark-900/10',
              )}
            >
              <Icon className="w-72px" />
            </div>

            <div className="col-span-12 md:col-span-8">
              <h1 className="text-heading-700">{title}</h1>
              {!!company && (
                <p className="text-heading-500 mt-16px">{company}</p>
              )}
              {tech && (
                <ul className="gap-12px mt-16px flex flex-wrap">
                  {tech.map((techItem) => (
                    <li key={techItem}>
                      <Shadow>
                        <div className="px-6px">{techItem}</div>
                      </Shadow>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Shadow>
        <div className="prose">{children}</div>
      </Container>
    </main>
  )
}
