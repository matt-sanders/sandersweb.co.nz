import { ProjectView } from '@/components/ProjectView/ProjectView'
import { render, screen } from '@testing-library/react'
import { genTestProjectRecord } from 'tests/fixures/project'
import { test, expect } from 'vitest'

test('renders the project', async () => {
  const project = await genTestProjectRecord()
  render(<ProjectView project={project} />)

  // ensure the title is there
  expect(
    screen.getByRole('heading', {
      name: `${project.company} ${project.name}`,
      level: 3,
    }),
  )

  // ensure the tech is listed
  project.tech.forEach((tech) => {
    expect(screen.getByText(tech)).toBeInTheDocument()
  })

  // ensure the project content is displayed
  expect(screen.getByText(project.markdown)).toBeInTheDocument()
})

test('displays the project name when no company exists', async () => {
  const project = await genTestProjectRecord({
    company: '',
  })
  render(<ProjectView project={project} />)
  expect(
    screen.getByRole('heading', {
      name: `${project.name}`,
      level: 3,
    }),
  )
})
