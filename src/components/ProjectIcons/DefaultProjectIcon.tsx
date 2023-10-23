import { ProjectIconProps } from '@/components/ProjectIcons/types'
import clsx from 'clsx'

export function DefaultProjectIcon({ className }: ProjectIconProps) {
  return (
    <div className={clsx('bg-dark-900/20 aspect-square rounded', className)} />
  )
}
