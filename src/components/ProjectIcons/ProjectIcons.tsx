import { DefaultProjectIcon } from '@/components/ProjectIcons/DefaultProjectIcon'
import { GustProjectIcon } from '@/components/ProjectIcons/GustProjectIcon'
import { NotaProjectIcon } from '@/components/ProjectIcons/NotaProjectIcon'
import { TheDoeProjectIcon } from '@/components/ProjectIcons/TheDoeProjectIcon'
import { ProjectIconProps } from '@/components/ProjectIcons/types'

export const ProjectIcons: Record<
  string,
  (props: ProjectIconProps) => JSX.Element
> = {
  Default: DefaultProjectIcon,
  Gust: GustProjectIcon,
  Nota: NotaProjectIcon,
  TheDoe: TheDoeProjectIcon,
}
