import { LinkButton } from '@/components/LinkButton/LinkButton'
import { Shadow } from '@/components/Shadow/Shadow'
import { ProjectSummary } from '@/domain/projects'
import { routes } from '@/routes'

interface ProjectCardProps {
  project: ProjectSummary
}
export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Shadow className="w-full">
      <div className="space-y-12px px-12px pt-12px pb-18px">
        <div className="h-72px bg-[#eaeaea]"></div>
        <h3 className="font-semibold">{project.org}</h3>
        <p className="text-heading-500">{project.name}</p>
        <p>{project.summary}</p>
        <LinkButton href={routes.projects.single(project)}>
          Read more
        </LinkButton>
      </div>
    </Shadow>
  )
}
