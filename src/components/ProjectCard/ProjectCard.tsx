import { LinkButton } from '@/components/LinkButton/LinkButton'
import { ProjectIcons } from '@/components/ProjectIcons/ProjectIcons'
import { Shadow } from '@/components/Shadow/Shadow'
import { ProjectRecord } from '@/domain/projects'
import { routes } from '@/routes'
import clsx from 'clsx'

interface ProjectCardProps {
  project: ProjectRecord
}
export function ProjectCard({ project }: ProjectCardProps) {
  const Icon =
    (project.icon && ProjectIcons[project.icon]) || ProjectIcons.Default
  return (
    <Shadow className="w-full">
      <div className="space-y-12px px-12px pt-12px pb-18px">
        <div
          className={clsx(
            'p-24px flex items-center justify-center rounded',
            project.bgColor || 'bg-dark-900/10',
          )}
        >
          <Icon className="w-72px" />
        </div>
        <h3 className="text-heading-500">{project.name}</h3>
        <p className="font-semibold">{project.company}</p>
        <p>{project.summary}</p>
        <LinkButton href={routes.projects.single(project)}>
          Read more
        </LinkButton>
      </div>
    </Shadow>
  )
}
