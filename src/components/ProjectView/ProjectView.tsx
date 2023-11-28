import { Container } from '@/components/Container/Container'
import { Mdx } from '@/components/Mdx/Mdx'
import { ProjectIcons } from '@/components/ProjectIcons/ProjectIcons'
import { Shadow } from '@/components/Shadow/Shadow'
import { ProjectRecord } from '@/domain/projects'

interface ProjectViewProps {
  project: ProjectRecord
}
export function ProjectView({ project }: ProjectViewProps) {
  const Icon =
    (project.icon && ProjectIcons[project.icon]) || ProjectIcons.Default
  return (
    <div className="relative" id={`project-${project.slug}`}>
      <Container>
        <Shadow className="sticky top-0 z-10 w-full" popDelayMs={1000}>
          <div className="p-24px gap-24px flex items-start">
            <Icon className="w-72px shrink-0" />

            <h3 className="min-w-[40%]">
              {project.company && (
                <span className="mb-8px text-700 block border-b-2">
                  {project.company}
                </span>
              )}
              <span className="text-heading-500 block break-words">
                {project.name}
              </span>
            </h3>
          </div>
        </Shadow>
        {project.tech && (
          <ul className="gap-12px mt-48px mb-24px flex flex-wrap">
            {project.tech.map((techItem, idx) => (
              <li key={techItem}>
                <Shadow popDelayMs={1000 + idx * 80}>
                  <div className="px-6px">{techItem}</div>
                </Shadow>
              </li>
            ))}
          </ul>
        )}
        <div className="prose">
          <Mdx mdxContent={project.mdxContent} />
        </div>
      </Container>
    </div>
  )
}
