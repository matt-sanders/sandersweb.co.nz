import { DefaultProjectIcon } from '@/components/ProjectIcons/DefaultProjectIcon'
import { NotaProjectIcon } from '@/components/ProjectIcons/NotaProjectIcon'
import { ProjectIconProps } from '@/components/ProjectIcons/types'

export const ProjectIcons: Record<
  string,
  (props: ProjectIconProps) => JSX.Element
> = {
  Default: DefaultProjectIcon,
  Nota: NotaProjectIcon,
}
