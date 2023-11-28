import { Container } from '@/components/Container/Container'
import { render, screen } from '@testing-library/react'
import { genTestString } from 'tests/utils/genTestString'
import { expect, test } from 'vitest'

test('renders children', () => {
  const text = genTestString()
  render(
    <Container>
      <p>{text}</p>
    </Container>,
  )
  expect(screen.getByText(text)).toBeInTheDocument()
})
