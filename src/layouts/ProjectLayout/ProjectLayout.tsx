import { Container } from '@/components/Container/Container'
import { ProjectIcons } from '@/components/ProjectIcons/ProjectIcons'
import { Shadow } from '@/components/Shadow/Shadow'
import { ProjectRecord } from '@/domain/projects'
import clsx from 'clsx'
import Head from 'next/head'
import { useEffect, useState } from 'react'

interface ProjectLayoutProps {
  children: React.ReactNode
  project: ProjectRecord
}
export function ProjectLayout({ children, project }: ProjectLayoutProps) {
  const [pageReady, setPageReady] = useState(false)
  useEffect(() => {
    setPageReady(true)
  }, [])

  const { name, tech, company, icon, bgColor } = project

  const Icon = (icon && ProjectIcons[icon]) || ProjectIcons.Default
  return (
    <main>
      <Head>
        <title>{name}</title>
        {project.summary && <meta name="desc" content={project.summary} />}
      </Head>
      <Container>
        <Shadow
          className={clsx(
            'my-48px w-full',
            'transition-all duration-500 ease-out',
            {
              '-translate-y-1/4 opacity-0': !pageReady,
              ' opacity-100': pageReady,
            },
          )}
          popDelayMs={1000}
        >
          <div
            className={clsx('p-24px gap-24px md:gap-48px grid grid-cols-12')}
          >
            <div
              className={clsx(
                'px-24px py-48px col-span-12 flex min-h-[100px] items-center justify-center rounded md:col-span-4',
                bgColor || 'bg-dark-900/10',
                'transition-all delay-[400ms] duration-500 ease-out',
                {
                  'translate-x-1/4 opacity-0': !pageReady,
                  ' opacity-100': pageReady,
                },
              )}
            >
              <Icon className="w-72px" />
            </div>

            <div className="col-span-12 md:col-span-8">
              <div className="text-heading-700 pb-16px mb-16px md:pb-24px overflow-hidden border-b-2">
                <h1
                  className={clsx(
                    'text-heading-700 break-words',
                    'transition-all delay-[600ms] duration-500 ease-out',
                    {
                      'translate-y-1/4 opacity-0': !pageReady,
                      ' opacity-100': pageReady,
                    },
                  )}
                >
                  {name}
                </h1>
              </div>
              {!!company && (
                <div
                  className={clsx(
                    'transition delay-500 duration-500 ease-out',
                    {
                      'opacity-0': !pageReady,
                      ' opacity-100': pageReady,
                    },
                  )}
                >
                  <p
                    className={clsx(
                      'text-heading-500',
                      'transition-all delay-[800ms] duration-500 ease-out',
                      {
                        '-translate-y-1/4 opacity-0': !pageReady,
                        ' opacity-100': pageReady,
                      },
                    )}
                  >
                    {company}
                  </p>
                </div>
              )}
              {tech && (
                <ul
                  className={clsx(
                    'gap-12px mt-16px flex flex-wrap',
                    'transition delay-[800ms] duration-500 ease-out',
                    {
                      'opacity-0': !pageReady,
                      'opacity-100': pageReady,
                    },
                  )}
                >
                  {tech.map((techItem, idx) => (
                    <li key={techItem}>
                      <Shadow popDelayMs={1000 + idx * 80}>
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
