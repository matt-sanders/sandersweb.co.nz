import { LinkButton } from '@/components/LinkButton/LinkButton'
import { ProjectIcons } from '@/components/ProjectIcons/ProjectIcons'
import { Shadow } from '@/components/Shadow/Shadow'
import { ProjectRecord } from '@/domain/projects'
import { routes } from '@/routes'
import clsx from 'clsx'
import Link from 'next/link'

interface ProjectCardProps {
  project: ProjectRecord
  className?: string
}
export function ProjectCard({ project, className }: ProjectCardProps) {
  const Icon =
    (project.icon && ProjectIcons[project.icon]) || ProjectIcons.Default
  return (
    <Shadow className={clsx('w-full', className)}>
      <div className="px-12px pt-12px pb-18px gap-12px flex h-full flex-col">
        <div
          className={clsx(
            'p-24px flex items-center justify-center rounded',
            project.bgColor || 'bg-dark-900/10',
          )}
        >
          <Icon className="w-72px" />
        </div>
        <Link href={routes.projects.single(project)}>
          <h3 className="text-heading-500">{project.name}</h3>
        </Link>
        <p className="font-semibold">{project.company}</p>
        <p>{project.summary}</p>
        <div className="mt-auto">
          <LinkButton href={routes.projects.single(project)}>
            Read more
          </LinkButton>
        </div>
      </div>
    </Shadow>
  )
}
