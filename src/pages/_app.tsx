import { GridLines } from '@/components/GridLines/GridLines'
import { AppProps } from 'next/app'
import { Logo } from '@/components/Logo/Logo'
import { Container } from '@/components/Container/Container'
import '@/styles/fonts.css'
import '@/styles/globals.css'

export default function App({ Component }: AppProps) {
  return (
    <div className="relative min-h-screen">
      <GridLines />
      <Container className="py-24px">
        <Logo />
      </Container>
      <div className="relative">
        <Component />
      </div>
    </div>
  )
}
