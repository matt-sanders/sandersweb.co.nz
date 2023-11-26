import { Shadow } from '@/components/Shadow/Shadow'
import { render, screen } from '@testing-library/react'
import { genTestString } from 'tests/utils/genTestString'

it('Renders', () => {
  const text = genTestString()
  render(
    <Shadow>
      <p>{text}</p>
    </Shadow>,
  )
  expect(screen.getByText(text)).toBeInTheDocument()
})
