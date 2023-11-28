import { ProjectView } from '@/components/ProjectView/ProjectView'
import Home from '@/pages/index.page'
import { render, screen } from '@testing-library/react'
import { genTestProjectRecord } from 'tests/fixures/project'
import { test, expect, vi } from 'vitest'

vi.mock('@/components/ProjectView/ProjectView', () => ({
  ProjectView: vi.fn(() => null),
}))

test('renders content', async () => {
  const projects = await Promise.all([
    genTestProjectRecord(),
    genTestProjectRecord(),
  ])
  render(<Home projects={projects} />)

  expect(screen.getByText('Hey there!')).toBeInTheDocument()
  expect(
    screen.getByRole('heading', { level: 1, name: `I'm Matt` }),
  ).toBeInTheDocument()

  projects.forEach((project) => {
    expect(ProjectView).toBeCalledWith({ project }, {})
  })
})
